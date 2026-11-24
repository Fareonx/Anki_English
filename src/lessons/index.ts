// Grammar lessons and the verb trainer, by the language the student learns.
import type { StudyLang } from '../lib/studyLang';
import { COURSE_ES } from './es';
import { COURSE_IT } from './it';
import type { Course } from './types';

export function courseFor(lang: StudyLang): Course | null {
  return lang === 'it' ? COURSE_IT : lang === 'es' ? COURSE_ES : null;
}
