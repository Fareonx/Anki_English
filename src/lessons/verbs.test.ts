import { describe, expect, it } from 'vitest';
import { makeQuestions, verbVerdict } from '../pages/VerbsPage';
import { COURSE_ES } from './es';
import { COURSE_IT } from './it';
import type { Course } from './types';

// Person names as the lesson tables write them -> trainer person.
const PERSON_ROWS: Record<string, number> = {
  io: 0, tu: 1, lui: 2, 'lui / lei': 2, 'lui/lei': 2, noi: 3, voi: 4, loro: 5,
  yo: 0, 'tú': 1, 'él / ella / usted': 2, 'él/ella/usted': 2, nosotros: 3, vosotros: 4,
  'ellos / ellas / ustedes': 5, 'ellos/ellas/ustedes': 5,
};
// Auxiliaries of the compound past the trainer has (passato prossimo, pretérito perfecto).
const PAST_AUX = ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno', 'sono', 'sei', 'è', 'siamo', 'siete', 'he', 'has', 'hemos', 'habéis', 'han'];

describe.each([
  ['it', COURSE_IT],
  ['es', COURSE_ES],
] as [string, Course][])('verb trainer data (%s)', (_, course) => {
  it('has six persons in every tense and a form for every person outside the imperative', () => {
    for (const v of course.verbs) {
      for (const t of course.tenses) {
        const cells = v.forms[t.id];
        expect(cells?.length, `${v.inf} ${t.id}`).toBe(6);
        if (t.id !== 'imperativo') for (const c of cells) expect(c.length, `${v.inf} ${t.id}`).toBeGreaterThan(0);
      }
      expect(course.groups.map((g) => g.id)).toContain(v.group);
    }
  });

  it('agrees with the conjugation tables of the lessons', () => {
    const byInf = new Map(course.verbs.map((v) => [v.inf, v]));
    const mismatches: string[] = [];
    for (const lesson of course.lessons) {
      for (const section of lesson.sections) {
        for (const table of section.tables ?? []) {
          table.head.forEach((h, col) => {
            const verb = byInf.get(h.trim().toLowerCase());
            if (!verb || col === 0) return;
            for (const row of table.rows) {
              const person = PERSON_ROWS[row[0].trim().toLowerCase()];
              if (person === undefined) continue;
              const cell = row[col].trim();
              // Compound tenses the trainer does not have (trapassato, futuro and condizionale composto...).
              const aux = cell.split(' ')[0];
              if (cell.includes(' ') && !PAST_AUX.includes(aux) && !/^(mi|ti|si|ci|vi|me|te|se|nos|os)$/.test(aux)) continue;
              const forms = Object.values(verb.forms).flatMap((cells) => cells[person]);
              // "sono andato/a", "sono andato / andata" and "prendi!" are notations of one form.
              const x = cell.split(' / ')[0].replace(/[!¡]/g, '').replace(/\/\w+$/, '').trim();
              if (!forms.some((f) => f === x || f.startsWith(x))) mismatches.push(`${lesson.id}: ${verb.inf} ${row[0]} = ${cell}`);
            }
          });
        }
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('makes questions only for existing forms', () => {
    const qs = makeQuestions(course.verbs, ['imperativo'], 500);
    expect(qs.length).toBeGreaterThan(50);
    for (const q of qs) expect(q.verb.forms.imperativo[q.person].length).toBeGreaterThan(0);
  });
});

describe('verbVerdict', () => {
  it('accepts any listed form without accents', () => {
    const essere = COURSE_IT.verbs.find((v) => v.inf === 'essere')!;
    expect(verbVerdict({ verb: essere, tense: 'presente', person: 2 }, 'e').correct).toBe(true);
    expect(verbVerdict({ verb: essere, tense: 'passato', person: 0 }, 'sono stata').correct).toBe(true);
    expect(verbVerdict({ verb: essere, tense: 'passato', person: 0 }, 'sono').correct).toBe(false);
    const tener = COURSE_ES.verbs.find((v) => v.inf === 'tener')!;
    expect(verbVerdict({ verb: tener, tense: 'indefinido', person: 2 }, 'tuvo').correct).toBe(true);
    expect(verbVerdict({ verb: tener, tense: 'futuro', person: 0 }, 'tendre').correct).toBe(true);
  });
});
