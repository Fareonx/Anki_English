// Fills empty fields of a word from free public services:
//  - dictionaryapi.dev: transcription, part of speech, definition, example, synonyms
//  - Google Translate (free web endpoint): Russian and Azerbaijani translations with alternatives
//  - MyMemory: fallback translations
// Results are suggestions; everything stays editable.

import type { NoteFields } from './db';

interface DictEntry {
  phonetic?: string;
  phonetics?: { text?: string }[];
  meanings?: {
    partOfSpeech?: string;
    synonyms?: string[];
    definitions?: { definition?: string; example?: string; synonyms?: string[] }[];
  }[];
}

async function lookupDictionary(word: string): Promise<Partial<NoteFields>> {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  if (!res.ok) return {};
  const entries = (await res.json()) as DictEntry[];
  const entry = entries[0];
  if (!entry) return {};
  const ipa = entry.phonetic || entry.phonetics?.find((p) => p.text)?.text || '';
  const meaning = entry.meanings?.[0];
  const definitions = entries.flatMap((e) => e.meanings ?? []).flatMap((m) => m.definitions ?? []);
  const example = definitions.find((d) => d.example)?.example ?? '';
  const synonyms = [
    ...new Set([...(meaning?.synonyms ?? []), ...(meaning?.definitions ?? []).flatMap((d) => d.synonyms ?? [])]),
  ]
    .slice(0, 5)
    .join(', ');
  return {
    ipa,
    pos: meaning?.partOfSpeech ?? '',
    definition: meaning?.definitions?.[0]?.definition ?? '',
    example,
    synonyms,
  };
}

const MAX_MEANINGS = 3;

/** Main translation plus the most common dictionary alternatives, e.g. "покидать, отказываться от, оставлять". */
async function translateGoogle(word: string, lang: 'ru' | 'az'): Promise<string> {
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&dt=bd&q=${encodeURIComponent(word)}`,
  );
  if (!res.ok) return '';
  const data = (await res.json()) as [[string, string][] | null, [string, string[]][] | null];
  const main = (data[0] ?? []).map((s) => s[0]).join('').trim();
  const meanings: string[] = [];
  const add = (m: string) => {
    const v = m.trim();
    if (v && v.toLowerCase() !== word.toLowerCase() && !meanings.some((x) => x.toLowerCase() === v.toLowerCase())) {
      meanings.push(v);
    }
  };
  add(main);
  for (const alt of data[1]?.[0]?.[1] ?? []) {
    if (meanings.length >= MAX_MEANINGS) break;
    add(alt);
  }
  return meanings.join(', ');
}

async function translateMyMemory(word: string, lang: 'ru' | 'az'): Promise<string> {
  const res = await fetch(
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

export async function translate(word: string, lang: 'ru' | 'az'): Promise<string> {
  const google = await translateGoogle(word, lang).catch(() => '');
  return google || translateMyMemory(word, lang).catch(() => '');
}

/** Returns a copy of `note` with empty fields filled in where a service had an answer. */
export async function autofill(note: NoteFields): Promise<NoteFields> {
  const word = note.word.trim();
  if (!word) return note;
  const [dict, ru, az] = await Promise.all([
    lookupDictionary(word).catch(() => ({}) as Partial<NoteFields>),
    note.translation_ru ? Promise.resolve('') : translate(word, 'ru').catch(() => ''),
    note.translation_az ? Promise.resolve('') : translate(word, 'az').catch(() => ''),
  ]);
  const out = { ...note };
  for (const [key, value] of Object.entries(dict) as [keyof NoteFields, string][]) {
    if (!out[key] && value) out[key] = value;
  }
  if (!out.translation_ru && ru) out.translation_ru = ru;
  if (!out.translation_az && az) out.translation_az = az;
  return out;
}
