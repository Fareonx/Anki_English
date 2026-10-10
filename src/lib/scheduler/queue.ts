// Builds today's study queue the way Anki's v3 scheduler does:
// due learning cards first, then reviews with new cards mixed in evenly,
// respecting daily limits and burying siblings (the other direction of a word).

import { dayNumber, dayStartMs } from './day';
import { CardType, Queue, type SchedCard, type SchedConfig } from './types';

export interface StudyCard extends SchedCard {
  note_id: string;
  deck_id: string;
  template: number;
}

export interface TodayStats {
  /** New cards first answered today. */
  newDone: number;
  /** Review cards answered today. */
  reviewsDone: number;
  /** Notes that had any card answered today (their siblings are buried). */
  touchedNotes: Set<string>;
  /** How many answers each card got today; used to tell words first studied today. */
  answersTodayByCard?: Map<string, number>;
  /**
   * Words first started today across ALL of the student's decks (see countFreshToday).
   * Without it the count only covers the cards given to the session, so opening the
   * days one by one would give a fresh daily limit in every deck.
   */
  freshWordsToday?: number;
}

/** Words first answered today: every answer they ever got was given today. */
export function countFreshToday(cards: Pick<StudyCard, 'id' | 'note_id' | 'reps'>[], stats: TodayStats): number {
  const answersToday = stats.answersTodayByCard ?? new Map<string, number>();
  const byNote = new Map<string, { reps: number; today: number }>();
  for (const c of cards) {
    if (!stats.touchedNotes.has(c.note_id)) continue;
    const s = byNote.get(c.note_id) ?? { reps: 0, today: 0 };
    s.reps += c.reps;
    s.today += answersToday.get(c.id) ?? 0;
    byNote.set(c.note_id, s);
  }
  let fresh = 0;
  for (const s of byNote.values()) if (s.today > 0 && s.reps === s.today) fresh++;
  return fresh;
}

export interface SessionOptions {
  /**
   * Introduce the RU/AZ -> EN card of a new word before the EN -> RU/AZ one, so the
   * student writes the English word from the first day (new cards carry
   * due = position * 2 + template, so this only changes the order within a word).
   */
  reverseFirst?: boolean;
}

export interface Counts {
  new: number;
  learn: number;
  review: number;
}

/** Stable pseudo-random tiebreak so equal-due reviews are shuffled but stay put during a day. */
function tiebreak(id: string, day: number): number {
  let h = day | 0;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 2654435761);
  return h >>> 0;
}

/** Spreads new cards evenly between reviews ("Mix with reviews" in Anki). */
export function mixNewWithReviews<T>(reviews: T[], news: T[]): T[] {
  if (news.length === 0) return reviews.slice();
  if (reviews.length === 0) return news.slice();
  const total = reviews.length + news.length;
  const ratio = total / news.length;
  const out: T[] = [];
  let ni = 0;
  let ri = 0;
  for (let i = 0; i < total; i++) {
    const newTurn = ni < news.length && (ri >= reviews.length || i >= Math.floor(ni * ratio + ratio / 2));
    out.push(newTurn ? news[ni++] : reviews[ri++]);
  }
  return out;
}

export class StudySession<T extends StudyCard> {
  private learning: T[];
  private main: T[];
  private readonly cutoffSec: number;
  /** New words (both sides still new) taken into today's queue. */
  readonly freshWords: number;
  /** New words already started earlier today. */
  readonly freshWordsDoneToday: number;

  constructor(
    cards: T[],
    stats: TodayStats,
    private readonly cfg: SchedConfig,
    nowMs: number,
    options: SessionOptions = {},
  ) {
    const today = dayNumber(nowMs, cfg.timeZone, cfg.rolloverHour);
    this.cutoffSec = Math.floor(dayStartMs(today + 1, cfg.timeZone, cfg.rolloverHour) / 1000);

    this.learning = cards
      .filter((c) => c.queue === Queue.Learn && c.due < this.cutoffSec)
      .sort((a, b) => a.due - b.due);

    const used = new Set(stats.touchedNotes);
    for (const c of this.learning) used.add(c.note_id);

    const reviewPool = cards
      .filter((c) => (c.queue === Queue.Review || c.queue === Queue.DayLearn) && c.due <= today)
      .sort((a, b) => a.due - b.due || tiebreak(a.id, today) - tiebreak(b.id, today));
    const reviewLimit = Math.max(0, cfg.reviewsPerDay - stats.reviewsDone);
    const reviews: T[] = [];
    for (const c of reviewPool) {
      if (reviews.length >= reviewLimit) break;
      if (used.has(c.note_id)) continue;
      reviews.push(c);
      used.add(c.note_id);
    }

    // The daily limit counts new *words*, not cards. The second side of a word that
    // was started on an earlier day is shown without using the limit.
    const byNote = new Map<string, T[]>();
    for (const c of cards) byNote.set(c.note_id, [...(byNote.get(c.note_id) ?? []), c]);

    const freshDone = stats.freshWordsToday ?? countFreshToday(cards, stats);
    this.freshWordsDoneToday = freshDone;

    const newOrder = (c: T) => (options.reverseFirst ? Math.floor(c.due / 2) * 2 + (1 - (c.due % 2)) : c.due);
    const newPool = cards.filter((c) => c.queue === Queue.New).sort((a, b) => newOrder(a) - newOrder(b));
    const freshLimit = Math.max(0, cfg.newPerDay - freshDone);
    const secondSides: T[] = [];
    const fresh: T[] = [];
    for (const c of newPool) {
      if (used.has(c.note_id)) continue;
      const started = (byNote.get(c.note_id) ?? []).some((s) => s.ctype !== CardType.New);
      if (started) {
        secondSides.push(c);
      } else {
        if (fresh.length >= freshLimit) continue;
        fresh.push(c);
      }
      used.add(c.note_id);
    }
    this.freshWords = fresh.length;

    this.main = mixNewWithReviews(reviews, [...secondSides, ...fresh]);
  }

  counts(): Counts {
    let n = 0;
    let learn = this.learning.length;
    let review = 0;
    for (const c of this.main) {
      if (c.queue === Queue.New) n++;
      else if (c.queue === Queue.DayLearn) learn++;
      else review++;
    }
    return { new: n, learn, review };
  }

  /** The card to show now, or null when nothing is due (yet). */
  next(nowMs: number): T | null {
    const nowSec = Math.floor(nowMs / 1000);
    const firstLearning = this.learning[0];
    if (firstLearning && firstLearning.due <= nowSec) return firstLearning;
    if (this.main.length > 0) return this.main[0];
    if (firstLearning && firstLearning.due <= nowSec + this.cfg.learnAheadMins * 60) return firstLearning;
    return null;
  }

  /** Epoch seconds of the next learning card due later today, if any. */
  nextLearningDue(): number | null {
    return this.learning[0]?.due ?? null;
  }

  /** Records an answered card (already rescheduled) and requeues it if it is due again today. */
  apply(updated: T): void {
    this.learning = this.learning.filter((c) => c.id !== updated.id);
    this.main = this.main.filter((c) => c.id !== updated.id);
    if (updated.queue === Queue.Learn && updated.due < this.cutoffSec) {
      this.learning.push(updated);
      this.learning.sort((a, b) => a.due - b.due);
    }
  }

  isFinished(): boolean {
    return this.main.length === 0 && this.learning.length === 0;
  }
}
