const DAY_MS = 86_400_000;

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    formatters.set(timeZone, f);
  }
  return f;
}

/** Wall-clock time in `timeZone`, expressed as if it were UTC milliseconds. */
function localAsUtcMs(ms: number, timeZone: string): number {
  const parts: Record<string, number> = {};
  for (const p of formatter(timeZone).formatToParts(new Date(ms))) {
    if (p.type !== 'literal') parts[p.type] = Number(p.value);
  }
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
}

/**
 * Anki-style day number: days since 1970-01-01 in local time, where a new day
 * starts at `rolloverHour` (04:00 by default) instead of midnight.
 */
export function dayNumber(ms: number, timeZone: string, rolloverHour: number): number {
  return Math.floor((localAsUtcMs(ms, timeZone) - rolloverHour * 3_600_000) / DAY_MS);
}

/** Epoch milliseconds at which the given study day starts. */
export function dayStartMs(day: number, timeZone: string, rolloverHour: number): number {
  const wallClock = day * DAY_MS + rolloverHour * 3_600_000;
  // Offset of the zone near that moment; a second pass handles DST edges.
  let guess = wallClock - (localAsUtcMs(wallClock, timeZone) - wallClock);
  guess = wallClock - (localAsUtcMs(guess, timeZone) - guess);
  return guess;
}
