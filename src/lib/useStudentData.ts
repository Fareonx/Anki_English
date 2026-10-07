import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { listCards, listDecks, listNotes, listRevlog, type CardRow, type Deck, type Note, type RevlogRow } from './db';
import { todayStartIso } from './stats';

export interface StudentData {
  decks: Deck[];
  cards: CardRow[];
  notes: Note[];
  revlog: RevlogRow[];
}

const EMPTY: StudentData = { decks: [], cards: [], notes: [], revlog: [] };

/**
 * Loads the selected student's decks and cards, plus optionally notes and the
 * review log for the last `revlogDays` study days (1 = today only).
 */
export function useStudentData({ notes = false, revlogDays = 1 }: { notes?: boolean; revlogDays?: number } = {}) {
  const { student, config } = useAuth();
  const [data, setData] = useState<StudentData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentId = student?.id;

  const reload = useCallback(async () => {
    if (!studentId) return;
    setError(null);
    try {
      const since = new Date(Date.parse(todayStartIso(config, Date.now())) - (revlogDays - 1) * 86_400_000);
      const [decks, cards, noteRows, revlog] = await Promise.all([
        listDecks(studentId),
        listCards(studentId),
        notes ? listNotes(studentId) : Promise.resolve([]),
        revlogDays > 0 ? listRevlog(studentId, since.toISOString()) : Promise.resolve([]),
      ]);
      setData({ decks, cards, notes: noteRows, revlog });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
    // config is derived from the student; studentId covers its identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, notes, revlogDays, config.timeZone, config.rolloverHour]);

  useEffect(() => {
    setLoading(true);
    setData(EMPTY);
    void reload();
  }, [reload]);

  return { ...data, loading, error, reload };
}
