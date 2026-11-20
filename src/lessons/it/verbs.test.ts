import { describe, expect, it } from 'vitest';
import { makeQuestions, verbVerdict } from '../../pages/VerbsPage';
import { LESSONS } from './index';
import { VERBS } from './verbs';

const PERSON_ROWS: Record<string, number> = { io: 0, tu: 1, lui: 2, 'lui / lei': 2, 'lui/lei': 2, 'lui / lei / lei': 2, noi: 3, voi: 4, loro: 5 };

describe('verb trainer data', () => {
  it('has six persons in every tense and a form for every person outside the imperative', () => {
    for (const v of VERBS) {
      for (const [tense, cells] of Object.entries(v.forms)) {
        expect(cells.length, `${v.inf} ${tense}`).toBe(6);
        if (tense !== 'imperativo') for (const c of cells) expect(c.length, `${v.inf} ${tense}`).toBeGreaterThan(0);
      }
    }
  });

  it('agrees with the conjugation tables of the lessons', () => {
    const byInf = new Map(VERBS.map((v) => [v.inf, v]));
    const mismatches: string[] = [];
    for (const lesson of LESSONS) {
      for (const section of lesson.sections) {
        for (const table of section.tables ?? []) {
          table.head.forEach((h, col) => {
            const verb = byInf.get(h.trim().toLowerCase());
            if (!verb || col === 0) return;
            for (const row of table.rows) {
              const person = PERSON_ROWS[row[0].trim().toLowerCase()];
              if (person === undefined) continue;
              const cell = row[col].trim();
              // Compound tenses the trainer does not have (trapassato, futuro and condizionale composto).
              const aux = cell.split(' ')[0];
              const PASSATO_AUX = ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno', 'sono', 'sei', 'è', 'siamo', 'siete'];
              if (cell.includes(' ') && !PASSATO_AUX.includes(aux) && !/^(mi|ti|si|ci|vi)$/.test(aux)) continue;
              const forms = Object.values(verb.forms).flatMap((cells) => cells[person]);
              // "sono andato/a", "sono andato / andata" and "prendi!" are notations of one form.
              const variants = [cell.split(' / ')[0].replace(/!$/, '').replace(/\/\w+$/, '')];
              const ok = variants.some((x) => forms.some((f) => f === x || f.startsWith(x)));
              if (!ok) mismatches.push(`${lesson.id}: ${verb.inf} ${row[0]} = ${cell}`);
            }
          });
        }
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('accepts any listed form without accents', () => {
    const essere = VERBS.find((v) => v.inf === 'essere')!;
    expect(verbVerdict({ verb: essere, tense: 'presente', person: 2 }, 'e').correct).toBe(true);
    expect(verbVerdict({ verb: essere, tense: 'passato', person: 0 }, 'sono stata').correct).toBe(true);
    expect(verbVerdict({ verb: essere, tense: 'passato', person: 0 }, 'sono').correct).toBe(false);
  });

  it('makes questions only for existing forms', () => {
    const qs = makeQuestions(VERBS, ['imperativo'], 500);
    expect(qs.length).toBeGreaterThan(50);
    for (const q of qs) expect(q.verb.forms.imperativo[q.person].length).toBeGreaterThan(0);
  });
});
