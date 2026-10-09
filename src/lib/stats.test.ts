import { describe, expect, it } from 'vitest';
import { countLearnedWords } from './stats';

describe('countLearnedWords', () => {
  it('counts words whose both cards left the learning steps', () => {
    const cards = [
      // learned in both directions, one side still young
      { note_id: 'a', ctype: 2 as const, ivl: 30 },
      { note_id: 'a', ctype: 2 as const, ivl: 5 },
      // solid: both sides 21+ days (one relearning after a lapse still counts as learned)
      { note_id: 'b', ctype: 2 as const, ivl: 25 },
      { note_id: 'b', ctype: 2 as const, ivl: 40 },
      // only the typing side learned
      { note_id: 'c', ctype: 2 as const, ivl: 3 },
      { note_id: 'c', ctype: 0 as const, ivl: 0 },
      // relearning after a lapse
      { note_id: 'd', ctype: 3 as const, ivl: 1 },
      { note_id: 'd', ctype: 2 as const, ivl: 9 },
      // still in learning steps
      { note_id: 'e', ctype: 1 as const, ivl: 0 },
      { note_id: 'e', ctype: 2 as const, ivl: 2 },
    ];
    expect(countLearnedWords(cards)).toEqual({ learned: 3, solid: 1 });
  });
});
