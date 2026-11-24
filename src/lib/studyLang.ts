// The language a student learns. Most students learn English; a student whose profile
// settings say studyLang: 'it' or 'es' learns Italian or Spanish (voice, answer check,
// translation and the grammar lessons follow it).

export type StudyLang = 'en' | 'it' | 'es';

export function studyLangOf(settings: Record<string, unknown> | undefined | null): StudyLang {
  const lang = settings?.studyLang;
  return lang === 'it' || lang === 'es' ? lang : 'en';
}

/** BCP 47 tag for speech and sorting. */
export const SPEECH_LANG: Record<StudyLang, string> = { en: 'en-GB', it: 'it-IT', es: 'es-ES' };

/** Card direction labels: the word -> translation, translation -> the word. */
export const DIRECTION_LABELS: Record<StudyLang, [string, string]> = {
  en: ['EN→RU', 'RU→EN'],
  it: ['IT→RU', 'RU→IT'],
  es: ['ES→RU', 'RU→ES'],
};

/** App name in the header. */
export const APP_TITLE: Record<StudyLang, string> = { en: 'IELTS Words', it: 'Italiano', es: 'Español' };

/** How a typed answer is checked in this language (see checkTypedAnswer). */
export interface AnswerRules {
  /** Accents, apostrophes and punctuation are not required. */
  lenient: boolean;
  /** The article may be left out: "agua" is right for "el agua". */
  optionalArticle: boolean;
}

export function answerRules(lang: StudyLang): AnswerRules {
  return { lenient: lang !== 'en', optionalArticle: lang === 'es' };
}

/** Leading articles of nouns as the words are stored ("il libro", "el agua"). */
export const ARTICLE: Record<StudyLang, RegExp | null> = {
  en: null,
  it: /^(il|lo|la|i|gli|le)\s+|^l['’]\s*/i,
  es: /^(el|la|los|las)\s+/i,
};
