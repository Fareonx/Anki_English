// Statistics derived from the review log, the same way Anki derives them.

import type { CardRow, RevlogRow } from './db';
import { dayNumber, dayStartMs } from './scheduler/day';
import type { TodayStats } from './scheduler/queue';
import { CardType, Queue, RevlogType, type SchedConfig } from './scheduler/types';

/** Mature cards have an interval of 21 days or more, as in Anki. */
export const MATURE_IVL = 21;

const isNewCardAnswer = (r: RevlogRow) => r.rtype === RevlogType.Learn && r.last_ivl === 0;

export function todayStartIso(cfg: SchedConfig, nowMs: number): string {
  const today = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
  return new Date(dayStartMs(today, cfg.timeZone, cfg.rolloverHour)).toISOString();
}

export interface TodaySummary extends TodayStats {
  answers: number;
  correct: number;
  timeMs: number;
}

/** Summarises answers given during the current study day. */
export function summarizeToday(
  revlog: RevlogRow[],
  cardNote: Map<string, string>,
  cfg: SchedConfig,
  nowMs: number,
): TodaySummary {
  const startMs = Date.parse(todayStartIso(cfg, nowMs));
  const s: TodaySummary = {
    newDone: 0,
    reviewsDone: 0,
    touchedNotes: new Set(),
    answersTodayByCard: new Map(),
    answers: 0,
    correct: 0,
    timeMs: 0,
  };
  for (const r of revlog) {
    if (Date.parse(r.reviewed_at) < startMs) continue;
    s.answers++;
    if (r.ease > 1) s.correct++;
    s.timeMs += r.time_ms;
    if (isNewCardAnswer(r)) s.newDone++;
    if (r.rtype === RevlogType.Review) s.reviewsDone++;
    const note = cardNote.get(r.card_id);
    if (note) s.touchedNotes.add(note);
    s.answersTodayByCard!.set(r.card_id, (s.answersTodayByCard!.get(r.card_id) ?? 0) + 1);
  }
  return s;
}

export interface DayActivity {
  day: number;
  date: Date;
  newCards: number;
  reviews: number;
  answers: number;
  timeMs: number;
}

/** Activity per study day for the last `days` days, oldest first. */
export function dailyActivity(revlog: RevlogRow[], cfg: SchedConfig, nowMs: number, days: number): DayActivity[] {
  const today = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
  const out: DayActivity[] = [];
  for (let d = today - days + 1; d <= today; d++) {
    out.push({ day: d, date: new Date(d * 86_400_000), newCards: 0, reviews: 0, answers: 0, timeMs: 0 });
  }
  const first = out[0]?.day ?? today;
  for (const r of revlog) {
    const d = dayNumber(Date.parse(r.reviewed_at), cfg.timeZone, cfg.rolloverHour);
    const slot = out[d - first];
    if (!slot) continue;
    slot.answers++;
    slot.timeMs += r.time_ms;
    if (isNewCardAnswer(r)) slot.newCards++;
    if (r.rtype === RevlogType.Review) slot.reviews++;
  }
  return out;
}

/** Consecutive study days ending today (or yesterday, if today has no answers yet). */
export function streak(revlog: RevlogRow[], cfg: SchedConfig, nowMs: number): number {
  const days = new Set(revlog.map((r) => dayNumber(Date.parse(r.reviewed_at), cfg.timeZone, cfg.rolloverHour)));
  let d = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
  if (!days.has(d)) d--;
  let n = 0;
  while (days.has(d)) {
    n++;
    d--;
  }
  return n;
}

/** Share of review answers that were not "Again" (Anki's "true retention"). */
export function retention(revlog: RevlogRow[]): { rate: number | null; total: number } {
  const reviews = revlog.filter((r) => r.rtype === RevlogType.Review);
  if (reviews.length === 0) return { rate: null, total: 0 };
  return { rate: reviews.filter((r) => r.ease > 1).length / reviews.length, total: reviews.length };
}

export type Maturity = 'new' | 'learning' | 'young' | 'mature' | 'suspended';

export function maturity(c: CardRow): Maturity {
  if (c.queue === Queue.Suspended) return 'suspended';
  if (c.ctype === CardType.New) return 'new';
  if (c.ctype === CardType.Learn || c.ctype === CardType.Relearn) return 'learning';
  return c.ivl >= MATURE_IVL ? 'mature' : 'young';
}

export function countMaturity(cards: CardRow[]): Record<Maturity, number> {
  const out: Record<Maturity, number> = { new: 0, learning: 0, young: 0, mature: 0, suspended: 0 };
  for (const c of cards) out[maturity(c)]++;
  return out;
}

/** Number of review/interday cards due on each of the next `days` days (overdue counted today). */
export function forecast(cards: CardRow[], cfg: SchedConfig, nowMs: number, days: number): number[] {
  const today = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
  const out = new Array<number>(days).fill(0);
  for (const c of cards) {
    if (c.queue !== Queue.Review && c.queue !== Queue.DayLearn) continue;
    const idx = Math.max(0, c.due - today);
    if (idx < days) out[idx]++;
  }
  return out;
}

export function formatDuration(ms: number, u: { min: string; hour: string } = { min: 'мин', hour: 'ч' }): string {
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return `${mins} ${u.min}`;
  return `${Math.floor(mins / 60)} ${u.hour} ${mins % 60} ${u.min}`;
}
