// Extra new words above the daily limit ("➕ Ещё 10 новых слов"). Kept per student and study
// day on the device, so a reload does not reset them and the home and study screens agree.

import { useCallback, useEffect, useState } from 'react';
import { dayNumber } from './scheduler/day';
import type { SchedConfig } from './scheduler/types';

/** Words added per press. */
export const EXTRA_STEP = 10;
/** Students may take this many extra words a day unless their settings say otherwise. */
const DEFAULT_CAP = 10;

/** How many extra words a day this student may take (the admin has no cap). */
export function extraNewCap(settings: Record<string, unknown> | undefined, isAdmin: boolean): number {
  if (isAdmin) return Infinity;
  const cap = Number(settings?.extraNewCap);
  return Number.isFinite(cap) && cap >= 0 ? cap : DEFAULT_CAP;
}

function read(key: string): number {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

export function useExtraNew(studentId: string | undefined, config: SchedConfig): [number, (n: number) => void] {
  const key = `extraNew:${studentId ?? ''}:${dayNumber(Date.now(), config.timeZone, config.rolloverHour)}`;
  const [extra, setExtra] = useState(() => read(key));
  useEffect(() => setExtra(read(key)), [key]);
  const add = useCallback(
    (n: number) =>
      setExtra((prev) => {
        const next = prev + n;
        try {
          localStorage.setItem(key, String(next));
        } catch {
          // Storage may be unavailable; the extra words then last until the page is closed.
        }
        return next;
      }),
    [key],
  );
  return [extra, add];
}
