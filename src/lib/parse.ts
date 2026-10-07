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
