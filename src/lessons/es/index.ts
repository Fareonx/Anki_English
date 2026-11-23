// Spanish grammar lessons, A1–A2, in a logical order from zero.
import type { Course, Lesson, Unit } from '../types';
import { lessons as u01 } from './u01';
import { lessons as u02 } from './u02';
import { lessons as u03 } from './u03';
import { lessons as u04 } from './u04';
import { lessons as u05 } from './u05';
import { lessons as u06 } from './u06';
import { lessons as u07 } from './u07';
import { lessons as u08 } from './u08';
import { lessons as u09 } from './u09';
import { lessons as u10 } from './u10';
import { lessons as u11 } from './u11';
import { lessons as u12 } from './u12';
import { VERBS } from './verbs';

export const UNITS: Unit[] = [
  { unit: 1, title: 'Hola', ru: 'Первые шаги' },
  { unit: 2, title: 'Ser y estar', ru: 'Быть' },
  { unit: 3, title: 'El presente', ru: 'Настоящее время' },
  { unit: 4, title: 'Verbos irregulares', ru: 'Неправильные глаголы' },
  { unit: 5, title: 'Mi día', ru: 'Мой день' },
  { unit: 6, title: 'Gustos', ru: 'Что мне нравится' },
  { unit: 7, title: 'Planes', ru: 'Планы' },
  { unit: 8, title: 'Preposiciones', ru: 'Предлоги' },
  { unit: 9, title: 'Pronombres', ru: 'Местоимения' },
  { unit: 10, title: 'El pasado (1)', ru: 'Прошедшее время (1)' },
  { unit: 11, title: 'El pasado (2)', ru: 'Прошедшее время (2)' },
  { unit: 12, title: 'Futuro, condicional, imperativo', ru: 'Будущее, «бы», повелительное' },
];

export const LESSONS: Lesson[] = [...u01, ...u02, ...u03, ...u04, ...u05, ...u06, ...u07, ...u08, ...u09, ...u10, ...u11, ...u12];

export const COURSE_ES: Course = {
  units: UNITS,
  lessons: LESSONS,
  verbs: VERBS,
  tenses: [
    { id: 'presente', label: 'Presente — настоящее', unit: 3 },
    { id: 'perfecto', label: 'Pretérito perfecto — прошедшее (he hablado)', unit: 10 },
    { id: 'indefinido', label: 'Pretérito indefinido — прошедшее (hablé)', unit: 10 },
    { id: 'imperfecto', label: 'Imperfecto — прошедшее длительное', unit: 11 },
    { id: 'futuro', label: 'Futuro — будущее', unit: 12 },
    { id: 'condicional', label: 'Condicional — «бы»', unit: 12 },
    { id: 'imperativo', label: 'Imperativo — повелительное', unit: 12 },
  ],
  persons: ['yo', 'tú', 'él / ella / usted', 'nosotros', 'vosotros', 'ellos / ellas / ustedes'],
  groups: [
    { id: 'ar', label: '-ar' },
    { id: 'er', label: '-er' },
    { id: 'ir', label: '-ir' },
    { id: 'irregular', label: 'неправильные' },
    { id: 'stem', label: 'с чередованием (e→ie, o→ue, e→i)' },
    { id: 'reflexive', label: 'возвратные' },
  ],
};
