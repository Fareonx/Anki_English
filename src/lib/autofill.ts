// Fills empty fields of a word from free public services:
//  - dictionaryapi.dev: transcription, part of speech, definition, example, synonyms
//  - Google Translate (free web endpoint): Russian and Azerbaijani translations with alternatives
//  - MyMemory: fallback translations
// Results are suggestions; everything stays editable.

import type { NoteFields } from './db';
import { fetchWithTimeout, translate } from './translate';
import type { StudyLang } from './studyLang';

interface DictEntry {
  phonetic?: string;
  phonetics?: { text?: string }[];
  meanings?: {
    partOfSpeech?: string;
    synonyms?: string[];
    definitions?: { definition?: string; example?: string; synonyms?: string[] }[];
  }[];
}

/** Transcription, part of speech, definition, example and synonyms from dictionaryapi.dev (English only). */
export async function lookupDictionary(word: string, from: StudyLang = 'en'): Promise<Partial<NoteFields>> {
  if (from !== 'en') return {};
  const res = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
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

/** Returns a copy of `note` with empty fields filled in where a service had an answer. */
export async function autofill(note: NoteFields, from: StudyLang = 'en'): Promise<NoteFields> {
  const word = note.word.trim();
  if (!word) return note;
  const [dict, ru, az] = await Promise.all([
    lookupDictionary(word, from).catch(() => ({}) as Partial<NoteFields>),
    note.translation_ru ? Promise.resolve('') : translate(word, 'ru', from).catch(() => ''),
    note.translation_az ? Promise.resolve('') : translate(word, 'az', from).catch(() => ''),
  ]);
  const out = { ...note };
  for (const [key, value] of Object.entries(dict) as [keyof NoteFields, string][]) {
    if (!out[key] && value) out[key] = value;
  }
  if (!out.translation_ru && ru) out.translation_ru = ru;
  if (!out.translation_az && az) out.translation_az = az;
  return out;
}
