import { describe, expect, it } from 'vitest';
import { LESSONS, UNITS } from './index';

describe('Italian lessons', () => {
  it('have unique ids, follow the units in order and every unit has lessons', () => {
    const ids = LESSONS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    const units = LESSONS.map((l) => l.unit);
    expect([...units].sort((a, b) => a - b)).toEqual(units);
    for (const u of UNITS) expect(units).toContain(u.unit);
  });

  it('have sections, drills with answers and complete tables', () => {
    for (const l of LESSONS) {
      expect(l.sections.length, l.id).toBeGreaterThan(0);
      expect(l.drills.length, l.id).toBeGreaterThanOrEqual(8);
      for (const d of l.drills) {
        expect(d.prompt.trim(), l.id).not.toBe('');
        expect(d.answer.trim(), `${l.id}: ${d.prompt}`).not.toBe('');
      }
      for (const s of l.sections) {
        for (const t of s.tables ?? []) {
          for (const row of t.rows) expect(row.length, `${l.id}: ${t.title ?? ''}`).toBe(t.head.length);
        }
      }
    }
  });
});
