// Anki's SM-2 scheduler (the "v3" scheduler with the default, non-FSRS algorithm).

import { dayNumber } from './day';
import {
  CardType,
  Ease,
  Queue,
  RevlogType,
  type AnswerResult,
  type SchedCard,
  type SchedConfig,
} from './types';

const DAY_SECS = 86_400;
const MIN_FACTOR = 1300;

// Same fuzz ranges as Anki: intervals under 2.5 days are never fuzzed.
const FUZZ_RANGES = [
  { start: 2.5, end: 7, factor: 0.15 },
  { start: 7, end: 20, factor: 0.1 },
  { start: 20, end: Infinity, factor: 0.05 },
];

export function fuzzDelta(interval: number): number {
  if (interval < 2.5) return 0;
  return FUZZ_RANGES.reduce(
    (delta, r) => delta + r.factor * Math.max(0, Math.min(interval, r.end) - r.start),
    1,
  );
}

/**
 * Deterministic fuzz in [0, 1) seeded by card id and review count, like Anki,
 * so the interval shown on a button is exactly the interval that gets applied.
 */
export function fuzzFactor(cardId: string, reps: number): number {
  let h = 2166136261;
  const s = `${cardId}:${reps}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // One round of mulberry32.
  let t = (h + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

function constrainInterval(
  interval: number,
  minimum: number,
  cfg: SchedConfig,
  fuzz: number | null,
): number {
  const maximum = Math.max(1, cfg.maxIvl);
  const min = Math.min(Math.max(minimum, 1), maximum);
  const ivl = clamp(interval * cfg.ivlModifier, min, maximum);
  if (fuzz === null) return clamp(Math.round(ivl), min, maximum);
  const delta = fuzzDelta(ivl);
  const lower = clamp(Math.round(ivl - delta), min, maximum);
  let upper = clamp(Math.round(ivl + delta), min, maximum);
  if (upper === lower && upper > 2 && upper < maximum) upper = lower + 1;
  return Math.floor(lower + fuzz * (1 + upper - lower));
}

function isLeech(lapses: number, threshold: number): boolean {
  if (threshold <= 0 || lapses < threshold) return false;
  return (lapses - threshold) % Math.max(1, Math.ceil(threshold / 2)) === 0;
}

interface Ctx {
  cfg: SchedConfig;
  nowSec: number;
  today: number;
}

/** Puts the card on a (re)learning step `delayMins` from now. Returns the logged interval. */
function setStep(card: SchedCard, step: number, delayMins: number, relearn: boolean, ctx: Ctx): number {
  const secs = Math.max(1, Math.round(delayMins * 60));
  card.ctype = relearn ? CardType.Relearn : CardType.Learn;
  card.step = step;
  if (secs >= DAY_SECS) {
    const days = Math.round(secs / DAY_SECS);
    card.queue = Queue.DayLearn;
    card.due = ctx.today + days;
    return days;
  }
  card.queue = Queue.Learn;
  card.due = ctx.nowSec + secs;
  return -secs;
}

function setReview(card: SchedCard, ivl: number, ctx: Ctx) {
  card.ctype = CardType.Review;
  card.queue = Queue.Review;
  card.step = 0;
  card.ivl = ivl;
  card.due = ctx.today + ivl;
}

function hardDelayMins(steps: number[], step: number): number {
  if (step > 0) return steps[step];
  if (steps.length > 1) return (steps[0] + steps[1]) / 2;
  return Math.min(steps[0] * 1.5, steps[0] + 24 * 60);
}

function answerLearning(prev: SchedCard, card: SchedCard, ease: Ease, ctx: Ctx): AnswerResult {
  const { cfg } = ctx;
  const relearn = prev.ctype === CardType.Relearn;
  const steps = relearn ? cfg.relearnSteps : cfg.learnSteps;
  const step = prev.ctype === CardType.New ? 0 : clamp(prev.step, 0, Math.max(0, steps.length - 1));
  const lastIvl =
    prev.ctype === CardType.New
      ? 0
      : prev.queue === Queue.DayLearn
        ? Math.round((steps[step] ?? 0) / 1440)
        : -Math.round((steps[step] ?? 0) * 60);
  const rtype = relearn ? RevlogType.Relearn : RevlogType.Learn;

  const graduate = (easy: boolean): number => {
    let ivl: number;
    if (relearn) {
      // Back to review with the interval set when the card lapsed.
      ivl = clamp(Math.max(1, prev.ivl) + (easy ? 1 : 0), 1, cfg.maxIvl);
    } else {
      const fuzz = fuzzFactor(prev.id, prev.reps);
      const good = constrainInterval(cfg.graduatingIvl, 1, cfg, fuzz);
      ivl = easy ? constrainInterval(Math.max(cfg.easyIvl, good + 1), good + 1, cfg, fuzz) : good;
      card.factor = prev.factor || cfg.startingEase;
    }
    setReview(card, ivl, ctx);
    return ivl;
  };

  let logIvl: number;
  if (steps.length === 0) {
    logIvl = graduate(ease === Ease.Easy);
  } else if (ease === Ease.Again) {
    logIvl = setStep(card, 0, steps[0], relearn, ctx);
  } else if (ease === Ease.Hard) {
    logIvl = setStep(card, step, hardDelayMins(steps, step), relearn, ctx);
  } else if (ease === Ease.Good) {
    logIvl = step + 1 < steps.length ? setStep(card, step + 1, steps[step + 1], relearn, ctx) : graduate(false);
  } else {
    logIvl = graduate(true);
  }

  return {
    card,
    log: { ease, ivl: logIvl, lastIvl, factor: card.factor, rtype },
    becameLeech: false,
  };
}

function answerReview(prev: SchedCard, card: SchedCard, ease: Ease, ctx: Ctx): AnswerResult {
  const { cfg, today } = ctx;
  const current = Math.max(1, prev.ivl);
  const factor = prev.factor || cfg.startingEase;
  let logIvl: number;
  let becameLeech = false;

  if (ease === Ease.Again) {
    card.lapses = prev.lapses + 1;
    card.factor = Math.max(MIN_FACTOR, factor - 200);
    card.ivl = constrainInterval(current * cfg.lapseNewIvl, cfg.minIvl, cfg, null);
    if (isLeech(card.lapses, cfg.leechThreshold)) {
      card.leech = true;
      becameLeech = true;
    }
    if (cfg.relearnSteps.length > 0) {
      logIvl = setStep(card, 0, cfg.relearnSteps[0], true, ctx);
    } else {
      setReview(card, card.ivl, ctx);
      logIvl = card.ivl;
    }
  } else {
    const daysLate = Math.max(0, today - prev.due);
    const ef = factor / 1000;
    const fuzz = fuzzFactor(prev.id, prev.reps);
    const hardMin = cfg.hardFactor > 1 ? current + 1 : 0;
    const hard = constrainInterval(current * cfg.hardFactor, hardMin, cfg, fuzz);
    const goodMin = cfg.hardFactor > 1 ? hard + 1 : current + 1;
    const good = constrainInterval((current + daysLate / 2) * ef, goodMin, cfg, fuzz);

    let ivl: number;
    if (ease === Ease.Hard) {
      ivl = hard;
      card.factor = Math.max(MIN_FACTOR, factor - 150);
    } else if (ease === Ease.Good) {
      ivl = good;
      card.factor = factor;
    } else {
      ivl = constrainInterval((current + daysLate) * ef * cfg.easyBonus, good + 1, cfg, fuzz);
      card.factor = factor + 150;
    }
    setReview(card, ivl, ctx);
    logIvl = ivl;
  }

  return {
    card,
    log: { ease, ivl: logIvl, lastIvl: current, factor: card.factor, rtype: RevlogType.Review },
    becameLeech,
  };
}

/** Applies an answer to a card. Pure: the input card is not modified. */
export function answerCard(prev: SchedCard, ease: Ease, nowMs: number, cfg: SchedConfig): AnswerResult {
  const ctx: Ctx = {
    cfg,
    nowSec: Math.floor(nowMs / 1000),
    today: dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour),
  };
  const card: SchedCard = { ...prev, reps: prev.reps + 1 };
  if (prev.ctype === CardType.Review) return answerReview(prev, card, ease, ctx);
  return answerLearning(prev, card, ease, ctx);
}

/** Seconds until the card would be due again after each button; used for button labels. */
export function nextIntervals(card: SchedCard, nowMs: number, cfg: SchedConfig): Record<Ease, number> {
  const nowSec = Math.floor(nowMs / 1000);
  const today = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
  const out = {} as Record<Ease, number>;
  for (const ease of [Ease.Again, Ease.Hard, Ease.Good, Ease.Easy]) {
    const { card: next } = answerCard(card, ease, nowMs, cfg);
    out[ease] = next.queue === Queue.Learn ? next.due - nowSec : (next.due - today) * DAY_SECS;
  }
  return out;
}

/** Short Russian label for an interval, as on Anki's answer buttons. */
export function formatInterval(secs: number): string {
  const trim = (n: number) => (Math.round(n * 10) / 10).toString().replace('.', ',');
  if (secs < 60) return '<1 мин';
  if (secs < 3600) return `${Math.round(secs / 60)} мин`;
  if (secs < DAY_SECS) return `${trim(secs / 3600)} ч`;
  const days = secs / DAY_SECS;
  if (days < 30) return `${Math.round(days)} д`;
  if (days < 365) return `${trim(days / 30)} мес`;
  return `${trim(days / 365)} г`;
}
