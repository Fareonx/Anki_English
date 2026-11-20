// The language a student learns. Most students learn English; a student whose
// profile settings say studyLang: 'it' learns Italian (voice, answer check, translation
// and the grammar lessons follow it).

export type StudyLang = 'en' | 'it';

export function studyLangOf(settings: Record<string, unknown> | undefined | null): StudyLang {
  return settings?.studyLang === 'it' ? 'it' : 'en';
}

/** BCP 47 tag for speech and sorting. */
export const SPEECH_LANG: Record<StudyLang, string> = { en: 'en-GB', it: 'it-IT' };

/** Card direction labels: the word -> translation, translation -> the word. */
export const DIRECTION_LABELS: Record<StudyLang, [string, string]> = {
  en: ['EN→RU', 'RU→EN'],
  it: ['IT→RU', 'RU→IT'],
};
