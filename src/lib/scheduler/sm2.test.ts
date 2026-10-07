import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG, resolveConfig } from './config';
import { dayNumber, dayStartMs } from './day';
import { answerCard, formatInterval, fuzzDelta, nextIntervals } from './sm2';
import { CardType, Ease, Queue, RevlogType, type SchedCard } from './types';

const cfg = DEFAULT_CONFIG; // Asia/Baku (UTC+4), day starts at 04:00
const NOW = Date.UTC(2026, 9, 7, 10, 0, 0); // 14:00 in Baku
const NOW_SEC = NOW / 1000;
const TODAY = Date.UTC(2026, 9, 7) / 86_400_000;

function card(over: Partial<SchedCard> = {}): SchedCard {
  return {
    id: 'card-1',
    ctype: CardType.New,
    queue: Queue.New,
    due: 1,
    ivl: 0,
    factor: 0,
    reps: 0,
    lapses: 0,
    step: 0,
    leech: false,
    ...over,
  };
}

const review = (over: Partial<SchedCard> = {}) =>
  card({ ctype: CardType.Review, queue: Queue.Review, ivl: 10, factor: 2500, due: TODAY, reps: 5, ...over });

describe('day boundaries', () => {
  it('uses local time with a 04:00 rollover', () => {
    expect(dayNumber(NOW, 'Asia/Baku', 4)).toBe(TODAY);
    // 03:30 in Baku still belongs to the previous study day.
    expect(dayNumber(Date.UTC(2026, 9, 7, 23, 30), 'Asia/Baku', 4)).toBe(TODAY);
    expect(dayNumber(Date.UTC(2026, 9, 8, 0, 0), 'Asia/Baku', 4)).toBe(TODAY + 1);
  });

  it('finds the instant a study day starts', () => {
    expect(dayStartMs(TODAY + 1, 'Asia/Baku', 4)).toBe(Date.UTC(2026, 9, 8, 0, 0));
    expect(dayStartMs(TODAY, 'UTC', 0)).toBe(Date.UTC(2026, 9, 7));
  });
});

describe('new and learning cards (steps 1m 10m)', () => {
  it('Again shows the card again in 1 minute', () => {
    const r = answerCard(card(), Ease.Again, NOW, cfg);
    expect(r.card).toMatchObject({ ctype: CardType.Learn, queue: Queue.Learn, step: 0, due: NOW_SEC + 60, reps: 1 });
    expect(r.log).toEqual({ ease: Ease.Again, ivl: -60, lastIvl: 0, factor: 0, rtype: RevlogType.Learn });
  });

  it('Hard on the first step uses the average of the first two steps', () => {
    const r = answerCard(card(), Ease.Hard, NOW, cfg);
    expect(r.card).toMatchObject({ queue: Queue.Learn, step: 0, due: NOW_SEC + 330 });
  });

  it('Good moves to the next step', () => {
    const r = answerCard(card(), Ease.Good, NOW, cfg);
    expect(r.card).toMatchObject({ queue: Queue.Learn, step: 1, due: NOW_SEC + 600 });
  });

  it('Good on the last step graduates with a 1 day interval', () => {
    const learning = card({ ctype: CardType.Learn, queue: Queue.Learn, step: 1, due: NOW_SEC, reps: 2 });
    const r = answerCard(learning, Ease.Good, NOW, cfg);
    expect(r.card).toMatchObject({ ctype: CardType.Review, queue: Queue.Review, ivl: 1, due: TODAY + 1, factor: 2500 });
    expect(r.log).toMatchObject({ ivl: 1, lastIvl: -600, rtype: RevlogType.Learn });
  });

  it('Hard on a later step repeats that step', () => {
    const learning = card({ ctype: CardType.Learn, queue: Queue.Learn, step: 1, due: NOW_SEC });
    expect(answerCard(learning, Ease.Hard, NOW, cfg).card).toMatchObject({ step: 1, due: NOW_SEC + 600 });
    expect(answerCard(learning, Ease.Again, NOW, cfg).card).toMatchObject({ step: 0, due: NOW_SEC + 60 });
  });

  it('Easy graduates immediately with the easy interval (4 days, fuzzed)', () => {
    const r = answerCard(card(), Ease.Easy, NOW, cfg);
    expect(r.card.queue).toBe(Queue.Review);
    expect(r.card.factor).toBe(2500);
    expect(r.card.ivl).toBeGreaterThanOrEqual(3);
    expect(r.card.ivl).toBeLessThanOrEqual(5);
    expect(r.card.due).toBe(TODAY + r.card.ivl);
  });

  it('does not mutate the input card', () => {
    const c = card();
    answerCard(c, Ease.Good, NOW, cfg);
    expect(c).toEqual(card());
  });
});

describe('review cards', () => {
  it('Hard < Good < Easy with Anki multipliers and ease changes', () => {
    const hard = answerCard(review(), Ease.Hard, NOW, cfg);
    const good = answerCard(review(), Ease.Good, NOW, cfg);
    const easy = answerCard(review(), Ease.Easy, NOW, cfg);
    // 10 * 1.2 = 12 (min 11), 10 * 2.5 = 25, 10 * 2.5 * 1.3 = 32.5 — each with fuzz.
    expect(hard.card.ivl).toBeGreaterThanOrEqual(11);
    expect(hard.card.ivl).toBeLessThanOrEqual(14);
    expect(good.card.ivl).toBeGreaterThanOrEqual(22);
    expect(good.card.ivl).toBeLessThanOrEqual(28);
    expect(easy.card.ivl).toBeGreaterThan(good.card.ivl);
    expect(easy.card.ivl).toBeLessThanOrEqual(37);
    expect(hard.card.factor).toBe(2350);
    expect(good.card.factor).toBe(2500);
    expect(easy.card.factor).toBe(2650);
    expect(good.log).toEqual({ ease: Ease.Good, ivl: good.card.ivl, lastIvl: 10, factor: 2500, rtype: RevlogType.Review });
    expect(good.card.due).toBe(TODAY + good.card.ivl);
  });

  it('counts half the days late for Good', () => {
    // (10 + 4 / 2) * 2.5 = 30
    const r = answerCard(review({ due: TODAY - 4 }), Ease.Good, NOW, cfg);
    expect(r.card.ivl).toBeGreaterThanOrEqual(27);
    expect(r.card.ivl).toBeLessThanOrEqual(33);
  });

  it('never fuzzes short intervals', () => {
    const r = answerCard(review({ ivl: 1 }), Ease.Hard, NOW, cfg);
    expect(r.card.ivl).toBe(2); // 1.2 rounds to 1, but Hard must be at least ivl + 1
    expect(fuzzDelta(2)).toBe(0);
  });

  it('Again lapses into relearning for 10 minutes and resets the interval to 1 day', () => {
    const r = answerCard(review(), Ease.Again, NOW, cfg);
    expect(r.card).toMatchObject({
      ctype: CardType.Relearn,
      queue: Queue.Learn,
      due: NOW_SEC + 600,
      ivl: 1,
      lapses: 1,
      factor: 2300,
    });
    expect(r.log).toMatchObject({ ivl: -600, lastIvl: 10, rtype: RevlogType.Review });
  });

  it('relearning Good returns to review with the lapse interval, Easy adds a day', () => {
    const relearning = card({ ctype: CardType.Relearn, queue: Queue.Learn, ivl: 1, factor: 2300, lapses: 1, due: NOW_SEC });
    expect(answerCard(relearning, Ease.Good, NOW, cfg).card).toMatchObject({
      ctype: CardType.Review,
      queue: Queue.Review,
      ivl: 1,
      due: TODAY + 1,
      factor: 2300,
    });
    expect(answerCard(relearning, Ease.Easy, NOW, cfg).card.ivl).toBe(2);
    expect(answerCard(relearning, Ease.Good, NOW, cfg).log.rtype).toBe(RevlogType.Relearn);
  });

  it('ease never drops below 130%', () => {
    expect(answerCard(review({ factor: 1400 }), Ease.Again, NOW, cfg).card.factor).toBe(1300);
    expect(answerCard(review({ factor: 1300 }), Ease.Hard, NOW, cfg).card.factor).toBe(1300);
  });

  it('marks a leech at 8 lapses and again every 4 lapses after', () => {
    expect(answerCard(review({ lapses: 6 }), Ease.Again, NOW, cfg).becameLeech).toBe(false);
    expect(answerCard(review({ lapses: 7 }), Ease.Again, NOW, cfg).becameLeech).toBe(true);
    expect(answerCard(review({ lapses: 8, leech: true }), Ease.Again, NOW, cfg).becameLeech).toBe(false);
    expect(answerCard(review({ lapses: 11, leech: true }), Ease.Again, NOW, cfg).becameLeech).toBe(true);
  });

  it('respects the maximum interval', () => {
    const r = answerCard(review({ ivl: 300 }), Ease.Easy, NOW, { ...cfg, maxIvl: 365 });
    expect(r.card.ivl).toBe(365);
  });
});

describe('button labels', () => {
  it('match what answering actually does', () => {
    for (const c of [card(), review(), review({ id: 'other', ivl: 40, reps: 9 })]) {
      const labels = nextIntervals(c, NOW, cfg);
      for (const ease of [Ease.Again, Ease.Hard, Ease.Good, Ease.Easy]) {
        const next = answerCard(c, ease, NOW, cfg).card;
        const expected = next.queue === Queue.Learn ? next.due - NOW_SEC : (next.due - TODAY) * 86_400;
        expect(labels[ease]).toBe(expected);
      }
    }
  });

  it('formats intervals in Russian', () => {
    expect(formatInterval(30)).toBe('<1 мин');
    expect(formatInterval(60)).toBe('1 мин');
    expect(formatInterval(330)).toBe('6 мин');
    expect(formatInterval(600)).toBe('10 мин');
    expect(formatInterval(5400)).toBe('1,5 ч');
    expect(formatInterval(86_400)).toBe('1 д');
    expect(formatInterval(45 * 86_400)).toBe('1,5 мес');
    expect(formatInterval(730 * 86_400)).toBe('2 г');
  });
});

describe('config', () => {
  it('falls back to defaults for missing or invalid values', () => {
    const c = resolveConfig({ newPerDay: 30, learnSteps: [2, 15], reviewsPerDay: -5, timeZone: '' });
    expect(c.newPerDay).toBe(30);
    expect(c.learnSteps).toEqual([2, 15]);
    expect(c.reviewsPerDay).toBe(200);
    expect(c.timeZone).toBe('Asia/Baku');
    expect(resolveConfig(null)).toEqual(DEFAULT_CONFIG);
  });
});
