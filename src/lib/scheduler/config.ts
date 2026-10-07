import type { SchedConfig } from './types';

/**
 * Anki's default deck options, except the daily new-card limit:
 * 50 cards = 25 words in both directions (decided in PLAN.md, section 6.2).
 */
export const DEFAULT_CONFIG: SchedConfig = {
  learnSteps: [1, 10],
  relearnSteps: [10],
  graduatingIvl: 1,
  easyIvl: 4,
  startingEase: 2500,
  easyBonus: 1.3,
  hardFactor: 1.2,
  ivlModifier: 1,
  maxIvl: 36500,
  minIvl: 1,
  lapseNewIvl: 0,
  leechThreshold: 8,
  newPerDay: 50,
  reviewsPerDay: 200,
  rolloverHour: 4,
  timeZone: 'Asia/Baku',
  learnAheadMins: 20,
};

/** Merges stored (possibly partial or malformed) settings over the defaults. */
export function resolveConfig(stored: unknown): SchedConfig {
  const cfg: SchedConfig = { ...DEFAULT_CONFIG };
  if (!stored || typeof stored !== 'object') return cfg;
  const s = stored as Record<string, unknown>;
  for (const key of Object.keys(DEFAULT_CONFIG) as (keyof SchedConfig)[]) {
    const value = s[key];
    const def = DEFAULT_CONFIG[key];
    if (Array.isArray(def)) {
      if (Array.isArray(value) && value.every((v) => typeof v === 'number' && v > 0)) {
        (cfg[key] as number[]) = value as number[];
      }
    } else if (typeof def === 'number') {
      if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
        (cfg[key] as number) = value;
      }
    } else if (typeof def === 'string') {
      if (typeof value === 'string' && value) (cfg[key] as string) = value;
    }
  }
  return cfg;
}
