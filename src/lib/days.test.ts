import { describe, expect, it } from 'vitest';
import type { Deck } from './db';
import { findLastDay, planLastDay } from './days';

const deck = (id: string, name: string, parent_id: string | null = 'root'): Deck => ({
  id,
  name,
  parent_id,
  student_id: 's',
  created_at: '2026-10-01T00:00:00Z',
});

describe('findLastDay', () => {
  it('finds the day deck with the highest number', () => {
    const decks = [deck('root', '1. Начало A1', null), deck('d1', 'День 01 · Приветствие'), deck('d14', 'День 14 · Школа'), deck('d9', 'День 09')];
    const last = findLastDay(decks, new Map([['d14', 18]]));
    expect(last?.deck.id).toBe('d14');
    expect(last?.number).toBe(14);
    expect(last?.words).toBe(18);
    expect(findLastDay([deck('x', 'IELTS', null)], new Map())).toBeNull();
  });
});

describe('planLastDay', () => {
  const last = { deck: deck('d14', 'День 14 · Школа'), number: 14, words: 19, digits: 2 };

  it('fills the last day, then creates the next ones', () => {
    expect(planLastDay(last, 3, 20)).toEqual([
      { deckId: 'd14', name: 'День 14 · Школа', count: 1, total: 20 },
      { deckId: null, name: 'День 15', count: 2, total: 2 },
    ]);
  });

  it('skips a full day and splits big batches by capacity', () => {
    const full = { ...last, words: 30 };
    expect(planLastDay(full, 45, 30).map((c) => [c.name, c.count])).toEqual([
      ['День 15', 30],
      ['День 16', 15],
    ]);
  });

  it('keeps the number width', () => {
    const day9 = { deck: deck('d9', 'День 09'), number: 9, words: 20, digits: 2 };
    expect(planLastDay(day9, 1, 20)[0].name).toBe('День 10');
  });
});
