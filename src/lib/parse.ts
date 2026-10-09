import { EMPTY_FIELDS, type NoteFields } from './db';

/** Column order for pasted lists: word ; русский ; azərbaycanca ; example. */
const COLUMNS: (keyof NoteFields)[] = ['word', 'translation_ru', 'translation_az', 'example'];

/**
 * Parses a pasted word list: one word per line, columns separated by ";" or tabs
 * (so rows copied from Excel or Google Sheets work too). Empty lines and lines
 * starting with "#" are ignored. Duplicate words keep their first occurrence.
 */
export function parseWordList(text: string): NoteFields[] {
  const seen = new Set<string>();
  const out: NoteFields[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const cols = line.split(line.includes('\t') ? '\t' : ';').map((c) => c.trim());
    const note: NoteFields = { ...EMPTY_FIELDS };
    COLUMNS.forEach((key, i) => {
      if (cols[i]) note[key] = cols[i];
    });
    const key = note.word.toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(note);
  }
  return out;
}

/**
 * Splits the quick-add box into words: by new lines, commas and semicolons, and by spaces.
 * A chunk with spaces stays whole when it is a known phrase ("thank you", "give up").
 */
export async function splitQuickWords(text: string, isPhrase: (chunk: string) => Promise<boolean>): Promise<string[]> {
  const chunks = text
    .split(/[\n,;]+/)
    .map((c) => c.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const parts = await Promise.all(
    chunks.map(async (chunk) => {
      if (!chunk.includes(' ')) return [chunk];
      const phrase = await isPhrase(chunk).catch(() => false);
      return phrase ? [chunk] : chunk.split(' ');
    }),
  );
  const seen = new Set<string>();
  return parts.flat().filter((w) => {
    const key = w.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
