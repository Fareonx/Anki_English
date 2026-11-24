// Italian grammar lessons in the order of the textbook "Nuovo Progetto italiano 1".
import type { Course, Lesson, Unit } from '../types';
import { lessons as u00 } from './u00';
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
import { VERBS } from './verbs';

export const UNITS: Unit[] = [
  { unit: 0, title: 'Benvenuti!', ru: 'Добро пожаловать' },
  { unit: 1, title: 'Un nuovo inizio', ru: 'Новое начало' },
  { unit: 2, title: 'Come passi il tempo libero?', ru: 'Свободное время' },
  { unit: 3, title: 'Scrivere e telefonare', ru: 'Письма и звонки' },
  { unit: 4, title: 'Al bar', ru: 'В баре' },
  { unit: 5, title: 'Feste e viaggi', ru: 'Праздники и поездки' },
  { unit: 6, title: 'A cena fuori', ru: 'Ужин в ресторане' },
  { unit: 7, title: 'Al cinema', ru: 'В кино' },
  { unit: 8, title: 'Fare la spesa', ru: 'Покупка продуктов' },
  { unit: 9, title: 'In giro per i negozi', ru: 'По магазинам' },
  { unit: 10, title: "Cosa c'è stasera in TV?", ru: 'Что сегодня по ТВ?' },
  { unit: 11, title: 'Un concerto', ru: 'Концерт' },
];

export const LESSONS: Lesson[] = [...u00, ...u01, ...u02, ...u03, ...u04, ...u05, ...u06, ...u07, ...u08, ...u09, ...u10, ...u11];

export const COURSE_IT: Course = {
  units: UNITS,
  lessons: LESSONS,
  verbs: VERBS,
  tenses: [
    { id: 'presente', label: 'Presente — настоящее', unit: 1 },
    { id: 'passato', label: 'Passato prossimo — прошедшее', unit: 4 },
    { id: 'futuro', label: 'Futuro — будущее', unit: 5 },
    { id: 'imperfetto', label: 'Imperfetto — прошедшее длительное', unit: 7 },
    { id: 'condizionale', label: 'Condizionale — «бы»', unit: 11 },
    { id: 'imperativo', label: 'Imperativo — повелительное', unit: 10 },
  ],
  persons: ['io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'],
  groups: [
    { id: 'are', label: '-are' },
    { id: 'ere', label: '-ere' },
    { id: 'ire', label: '-ire' },
    { id: 'isc', label: '-isc-' },
    { id: 'irregular', label: 'неправильные' },
    { id: 'modal', label: 'модальные' },
    { id: 'reflexive', label: 'возвратные' },
  ],
};
