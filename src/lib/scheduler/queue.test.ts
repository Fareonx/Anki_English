import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from './config';
import { mixNewWithReviews, StudySession, type StudyCard, type TodayStats } from './queue';
import { CardType, Queue } from './types';

const NOW = Date.UTC(2026, 9, 7, 10, 0, 0); // 14:00 in Baku
const NOW_SEC = NOW / 1000;
const TODAY = Date.UTC(2026, 9, 7) / 86_400_000;
const cfg = DEFAULT_CONFIG;

const noStats = (): TodayStats => ({ newDone: 0, reviewsDone: 0, touchedNotes: new Set() });

/** Two cards per word, like the database trigger creates them. */
function newWords(count: number, startNote = 0): StudyCard[] {
  const cards: StudyCard[] = [];
  for (let n = startNote; n < startNote + count; n++) {
    for (const template of [0, 1]) {
      cards.push({
        id: `c${n}-${template}`,
        note_id: `n${n}`,
        deck_id: 'd',
        template,
        ctype: CardType.New,
        queue: Queue.New,
        due: n * 2 + template,
        ivl: 0,
        factor: 0,
        reps: 0,
        lapses: 0,
        step: 0,
        leech: false,
      });
    }
  }
  return cards;
}

function reviewCard(n: number, due = TODAY): StudyCard {
  return {
    id: `r${n}`,
    note_id: `rn${n}`,
    deck_id: 'd',
    template: 0,
    ctype: CardType.Review,
    queue: Queue.Review,
    due,
    ivl: 5,
    factor: 2500,
    reps: 4,
    lapses: 0,
    step: 0,
    leech: false,
  };
}

describe('StudySession', () => {
  it('shows only one direction of each new word per day (siblings buried)', () => {
    const s = new StudySession(newWords(30), noStats(), cfg, NOW);
    expect(s.counts()).toEqual({ new: 30, learn: 0, review: 0 });
    expect(s.next(NOW)?.template).toBe(0);
  });

  it('limits new cards per day: 50 cards = 25 words in both directions', () => {
    const s = new StudySession(newWords(60), noStats(), cfg, NOW);
    expect(s.counts().new).toBe(50);
  });

  it('subtracts new cards already studied today', () => {
    const s = new StudySession(newWords(60), { ...noStats(), newDone: 45 }, cfg, NOW);
    expect(s.counts().new).toBe(5);
  });

  it('introduces the reverse card on a later day after the forward one is learned', () => {
    const cards = newWords(1);
    cards[0] = { ...cards[0], ctype: CardType.Review, queue: Queue.Review, due: TODAY + 1, ivl: 1, factor: 2500 };
    const today = new StudySession(cards, { ...noStats(), touchedNotes: new Set(['n0']) }, cfg, NOW);
    expect(today.counts()).toEqual({ new: 0, learn: 0, review: 0 });
    const tomorrow = new StudySession(cards, noStats(), cfg, NOW + 86_400_000);
    expect(tomorrow.counts()).toEqual({ new: 0, learn: 0, review: 1 });
  });

  it('respects the review limit', () => {
    const reviews = Array.from({ length: 10 }, (_, i) => reviewCard(i));
    const s = new StudySession(reviews, { ...noStats(), reviewsDone: 195 }, cfg, NOW);
    expect(s.counts().review).toBe(5);
  });

  it('ignores reviews due in the future and suspended cards', () => {
    const cards = [reviewCard(1, TODAY + 1), { ...reviewCard(2), queue: Queue.Suspended }, reviewCard(3, TODAY - 2)];
    const s = new StudySession(cards, noStats(), cfg, NOW);
    expect(s.counts().review).toBe(1);
    expect(s.next(NOW)?.id).toBe('r3');
  });

  it('shows due learning cards first, then the main queue', () => {
    const learning: StudyCard = { ...newWords(1, 100)[0], ctype: CardType.Learn, queue: Queue.Learn, due: NOW_SEC - 10 };
    const s = new StudySession([reviewCard(1), learning], noStats(), cfg, NOW);
    expect(s.next(NOW)?.id).toBe(learning.id);
    expect(s.counts()).toEqual({ new: 0, learn: 1, review: 1 });
  });

  it('learns ahead up to 20 minutes when nothing else is left', () => {
    const soon: StudyCard = { ...newWords(1)[0], ctype: CardType.Learn, queue: Queue.Learn, due: NOW_SEC + 5 * 60 };
    expect(new StudySession([soon], noStats(), cfg, NOW).next(NOW)?.id).toBe(soon.id);

    const later = { ...soon, due: NOW_SEC + 30 * 60 };
    const s = new StudySession([later], noStats(), cfg, NOW);
    expect(s.next(NOW)).toBeNull();
    expect(s.nextLearningDue()).toBe(later.due);
    expect(s.isFinished()).toBe(false);
  });

  it('requeues a card answered Again and finishes when everything is done', () => {
    const [card] = newWords(1);
    const s = new StudySession([card], noStats(), cfg, NOW);
    s.apply({ ...card, ctype: CardType.Learn, queue: Queue.Learn, due: NOW_SEC + 60 });
    expect(s.counts()).toEqual({ new: 0, learn: 1, review: 0 });
    s.apply({ ...card, ctype: CardType.Review, queue: Queue.Review, due: TODAY + 1, ivl: 1 });
    expect(s.isFinished()).toBe(true);
  });
});

describe('mixNewWithReviews', () => {
  it('spreads new cards evenly', () => {
    expect(mixNewWithReviews(['r1', 'r2', 'r3', 'r4'], ['n1', 'n2']).join(' ')).toBe('r1 n1 r2 r3 n2 r4');
    expect(mixNewWithReviews([], ['n1'])).toEqual(['n1']);
    expect(mixNewWithReviews(['r1'], [])).toEqual(['r1']);
  });
});
