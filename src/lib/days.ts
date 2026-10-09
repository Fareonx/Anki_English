// "Add to the last day": new words go to the last "День NN" deck of a course; when that
// day already holds a full day's worth of words, the next days are created after it.

import type { Deck } from './db';

const DAY_RE = /^(?:День|Gün|Day)\s+(\d+)/i;

export interface LastDay {
  deck: Deck;
  number: number;
  /** Words already in that deck. */
  words: number;
  /** Width of the number in the deck name, so "День 09" is followed by "День 10". */
  digits: number;
}

/** The day deck with the highest number (among decks without sub-decks). */
export function findLastDay(decks: Deck[], wordsByDeck: Map<string, number>): LastDay | null {
  const parents = new Set(decks.map((d) => d.parent_id).filter(Boolean));
  let best: LastDay | null = null;
  for (const deck of decks) {
    if (parents.has(deck.id)) continue;
    const m = DAY_RE.exec(deck.name.trim());
    if (!m) continue;
    const number = Number(m[1]);
    if (!best || number > best.number) {
      best = { deck, number, words: wordsByDeck.get(deck.id) ?? 0, digits: m[1].length };
    }
  }
  return best;
}

export interface DayChunk {
  /** Existing deck, or null when the day has to be created. */
  deckId: string | null;
  name: string;
  /** How many of the new words go to this day. */
  count: number;
  /** Words in the day after adding. */
  total: number;
}

export function dayName(number: number, digits: number): string {
  return `День ${String(number).padStart(digits, '0')}`;
}

/** Splits `count` new words between the last day and as many new days as needed. */
export function planLastDay(last: LastDay, count: number, capacity: number): DayChunk[] {
  const cap = Math.max(1, capacity);
  const out: DayChunk[] = [];
  let left = count;
  const room = Math.max(0, cap - last.words);
  if (room > 0 && left > 0) {
    const n = Math.min(room, left);
    out.push({ deckId: last.deck.id, name: last.deck.name, count: n, total: last.words + n });
    left -= n;
  }
  for (let number = last.number + 1; left > 0; number++) {
    const n = Math.min(cap, left);
    out.push({ deckId: null, name: dayName(number, last.digits), count: n, total: n });
    left -= n;
  }
  return out;
}
