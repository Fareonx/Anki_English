// Free Google Translate web endpoint (the one translate.google.com uses; CORS is open).
// One request gives the translation, dictionary alternatives and spelling hints:
//  - data[0][0]  [translation, source as Google understood it]
//  - data[1]     dictionary entries by part of speech; null for words Google does not know
//  - data[7]     "did you mean" correction, e.g. mothr -> mother

export type Lang = 'ru' | 'az';

export interface Lookup {
  /** Main translation. */
  main: string;
  /** Dictionary alternatives, most common first (all parts of speech). */
  alternatives: string[];
  /** Google has a dictionary entry for the word or phrase, so it really exists. */
  known: boolean;
  /** Spelling Google suggests instead, if any. */
  suggestion: string | null;
}

const TIMEOUT_MS = 4000;
const cache = new Map<string, Promise<Lookup>>();

/** fetch() that gives up after `ms`. */
export async function fetchWithTimeout(url: string, ms = TIMEOUT_MS): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

type GtxResponse = [
  [string, string, ...unknown[]][] | null,
  [string, string[], ...unknown[]][] | null,
  ...unknown[],
];

export function parseGtx(word: string, data: GtxResponse): Lookup {
  const segments = data[0] ?? [];
  const main = segments.map((s) => s[0]).join('').trim();
  const understood = segments.map((s) => s[1]).join('').trim();
  const alternatives = [...new Set((data[1] ?? []).flatMap((entry) => entry[1] ?? []))];
  const correction = data[7] as [string, string] | undefined | null;
  let suggestion = Array.isArray(correction) && typeof correction[1] === 'string' ? correction[1] : null;
  // Google silently fixes some typos (enviroment -> environment); treat that as a suggestion too.
  if (!suggestion && understood && understood.toLowerCase() !== word.trim().toLowerCase()) suggestion = understood;
  if (suggestion && suggestion.toLowerCase() === word.trim().toLowerCase()) suggestion = null;
  return { main, alternatives, known: alternatives.length > 0, suggestion };
}

/** Translation of an English word or phrase, cached for the session. */
export function lookup(word: string, lang: Lang): Promise<Lookup> {
  const key = `${lang}:${word.trim().toLowerCase()}`;
  let hit = cache.get(key);
  if (!hit) {
    hit = fetchWithTimeout(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&dt=bd&dt=qca&q=${encodeURIComponent(word.trim())}`,
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return parseGtx(word, (await res.json()) as GtxResponse);
      })
      .catch((e: unknown) => {
        cache.delete(key);
        throw e;
      });
    cache.set(key, hit);
  }
  return hit;
}

const MAX_MEANINGS = 3;

/** "покидать, отказываться от, оставлять": the main translation plus the most common alternatives. */
export function formatMeanings(word: string, l: Lookup): string {
  const meanings: string[] = [];
  for (const m of [l.main, ...l.alternatives]) {
    if (meanings.length >= MAX_MEANINGS) break;
    const v = m.trim();
    if (v && v.toLowerCase() !== word.toLowerCase() && !meanings.some((x) => x.toLowerCase() === v.toLowerCase())) {
      meanings.push(v);
    }
  }
  return meanings.join(', ');
}

async function translateMyMemory(word: string, lang: Lang): Promise<string> {
  const res = await fetchWithTimeout(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${lang}`,
  );
  if (!res.ok) return '';
  const data = (await res.json()) as { responseStatus?: number; responseData?: { translatedText?: string } };
  const text = data.responseData?.translatedText?.trim() ?? '';
  if (data.responseStatus !== 200 || !text || text.toLowerCase() === word.toLowerCase()) return '';
  // The service reports quota problems inside the text.
  if (/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(text)) return '';
  return text;
}

/** Ready-to-save translation, with MyMemory as a fallback. */
export async function translate(word: string, lang: Lang): Promise<string> {
  const google = await lookup(word, lang)
    .then((l) => formatMeanings(word, l))
    .catch(() => '');
  return google || translateMyMemory(word, lang).catch(() => '');
}

/** Words spelled like `word` (Datamuse), for "did you mean" hints. */
export async function similarWords(word: string, max = 4): Promise<string[]> {
  const res = await fetchWithTimeout(
    `https://api.datamuse.com/words?sp=${encodeURIComponent(word.trim().toLowerCase())}&max=${max + 2}`,
  );
  if (!res.ok) return [];
  const data = (await res.json()) as { word: string }[];
  return data.map((d) => d.word).filter((w) => w.toLowerCase() !== word.trim().toLowerCase()).slice(0, max);
}
