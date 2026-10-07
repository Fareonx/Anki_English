// Card fields follow Anki's internal model (see supabase/migrations/*_init.sql).

export const CardType = { New: 0, Learn: 1, Review: 2, Relearn: 3 } as const;
export type CardType = (typeof CardType)[keyof typeof CardType];

export const Queue = { Suspended: -1, New: 0, Learn: 1, Review: 2, DayLearn: 3 } as const;
export type Queue = (typeof Queue)[keyof typeof Queue];

export const Ease = { Again: 1, Hard: 2, Good: 3, Easy: 4 } as const;
export type Ease = (typeof Ease)[keyof typeof Ease];

export const RevlogType = { Learn: 0, Review: 1, Relearn: 2, Cram: 3 } as const;
export type RevlogType = (typeof RevlogType)[keyof typeof RevlogType];

export interface SchedCard {
  id: string;
  ctype: CardType;
  queue: Queue;
  /** New: position. Queue 1: epoch seconds. Queue 2/3: day number. */
  due: number;
  /** Interval in days. */
  ivl: number;
  /** Ease in permille (2500 = 250%). */
  factor: number;
  reps: number;
  lapses: number;
  /** Index of the current learning/relearning step. */
  step: number;
  leech: boolean;
}

export interface SchedConfig {
  /** Learning steps in minutes. */
  learnSteps: number[];
  /** Relearning steps in minutes. */
  relearnSteps: number[];
  graduatingIvl: number;
  easyIvl: number;
  /** Permille. */
  startingEase: number;
  easyBonus: number;
  hardFactor: number;
  ivlModifier: number;
  maxIvl: number;
  minIvl: number;
  /** Multiplier applied to the interval of a lapsed card ("New interval"). */
  lapseNewIvl: number;
  leechThreshold: number;
  newPerDay: number;
  reviewsPerDay: number;
  /** Hour of the day at which a new study day begins. */
  rolloverHour: number;
  timeZone: string;
  /** Learning cards due within this many minutes may be shown early when nothing else is left. */
  learnAheadMins: number;
}

export interface RevlogEntry {
  ease: Ease;
  /** Positive = days, negative = seconds. */
  ivl: number;
  lastIvl: number;
  factor: number;
  rtype: RevlogType;
}

export interface AnswerResult {
  card: SchedCard;
  log: RevlogEntry;
  /** True when this answer turned the card into a leech. */
  becameLeech: boolean;
}
