// Data access layer. All row visibility is enforced by RLS in the database.

import type { AnswerResult } from './scheduler/types';
import { Queue, CardType } from './scheduler/types';
import type { StudyCard } from './scheduler/queue';
import { supabase } from './supabase';

export type Role = 'admin' | 'student';

export interface Profile {
  id: string;
  name: string;
  role: Role;
  settings: Record<string, unknown>;
}

export interface Deck {
  id: string;
  student_id: string;
  parent_id: string | null;
  name: string;
  created_at: string;
}

export interface NoteFields {
  word: string;
  ipa: string;
  pos: string;
  translation_ru: string;
  translation_az: string;
  definition: string;
  example: string;
  synonyms: string;
}

export interface Note extends NoteFields {
  id: string;
  deck_id: string;
  student_id: string;
  tags: string[];
  position: number;
  created_at: string;
}

export interface CardRow extends StudyCard {
  student_id: string;
}

export interface RevlogRow {
  id: number;
  card_id: string;
  reviewed_at: string;
  ease: number;
  ivl: number;
  last_ivl: number;
  factor: number;
  time_ms: number;
  rtype: number;
}

export interface Sentence {
  id: string;
  note_id: string;
  student_id: string;
  text: string;
  created_at: string;
}

export const EMPTY_FIELDS: NoteFields = {
  word: '',
  ipa: '',
  pos: '',
  translation_ru: '',
  translation_az: '',
  definition: '',
  example: '',
  synonyms: '',
};

const PAGE = 1000;

type PageResult<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

/** Supabase returns at most 1000 rows per request, so read in pages. */
async function fetchAll<T>(page: (from: number, to: number) => PageResult<T>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < PAGE) return out;
  }
}

/** Throws on error. `data` is only null on error or for an empty `maybeSingle()`. */
function check<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message);
  return res.data as T;
}

// ---------------------------------------------------------------------------
// Profiles
// ---------------------------------------------------------------------------

export async function getProfile(id: string): Promise<Profile | null> {
  const res = await supabase.from('profiles').select('id, name, role, settings').eq('id', id).maybeSingle();
  return check(res) ?? null;
}

export async function listStudents(): Promise<Profile[]> {
  return check(
    await supabase.from('profiles').select('id, name, role, settings').eq('role', 'student').order('created_at'),
  );
}

export async function updateProfile(id: string, patch: Partial<Pick<Profile, 'name' | 'settings'>>) {
  check(await supabase.from('profiles').update(patch).eq('id', id));
}

// ---------------------------------------------------------------------------
// Decks
// ---------------------------------------------------------------------------

export async function listDecks(studentId: string): Promise<Deck[]> {
  return check(
    await supabase.from('decks').select('id, student_id, parent_id, name, created_at').eq('student_id', studentId),
  );
}

export async function createDeck(studentId: string, name: string, parentId: string | null): Promise<Deck> {
  return check(
    await supabase
      .from('decks')
      .insert({ student_id: studentId, name: name.trim(), parent_id: parentId })
      .select('id, student_id, parent_id, name, created_at')
      .single(),
  );
}

export async function renameDeck(id: string, name: string) {
  check(await supabase.from('decks').update({ name: name.trim() }).eq('id', id));
}

export async function deleteDeck(id: string) {
  check(await supabase.from('decks').delete().eq('id', id));
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

const NOTE_COLUMNS =
  'id, deck_id, student_id, word, ipa, pos, translation_ru, translation_az, definition, example, synonyms, tags, position, created_at';

export async function listNotes(studentId: string): Promise<Note[]> {
  return fetchAll<Note>((from, to) =>
    supabase.from('notes').select(NOTE_COLUMNS).eq('student_id', studentId).order('position').range(from, to),
  );
}

export async function addNotes(deckId: string, notes: NoteFields[]): Promise<number> {
  const rows = notes.map((n) => ({ ...n, deck_id: deckId, word: n.word.trim() }));
  for (let i = 0; i < rows.length; i += 200) {
    check(await supabase.from('notes').insert(rows.slice(i, i + 200)));
  }
  return rows.length;
}

export async function updateNote(id: string, patch: Partial<NoteFields> & { deck_id?: string }) {
  check(await supabase.from('notes').update(patch).eq('id', id));
}

export async function deleteNote(id: string) {
  check(await supabase.from('notes').delete().eq('id', id));
}

// ---------------------------------------------------------------------------
// Cards & answers
// ---------------------------------------------------------------------------

const CARD_COLUMNS = 'id, note_id, deck_id, student_id, template, ctype, queue, due, ivl, factor, reps, lapses, step, leech';

export async function listCards(studentId: string): Promise<CardRow[]> {
  const rows = await fetchAll<CardRow>((from, to) =>
    supabase.from('cards').select(CARD_COLUMNS).eq('student_id', studentId).order('id').range(from, to),
  );
  // bigint columns may arrive as strings.
  return rows.map((c) => ({ ...c, due: Number(c.due) }));
}

export async function saveAnswer(prevId: string, result: AnswerResult, timeMs: number) {
  const c = result.card;
  check(
    await supabase.rpc('answer_card', {
      p_card_id: prevId,
      p_ctype: c.ctype,
      p_queue: c.queue,
      p_due: c.due,
      p_ivl: c.ivl,
      p_factor: c.factor,
      p_reps: c.reps,
      p_lapses: c.lapses,
      p_step: c.step,
      p_leech: c.leech,
      p_ease: result.log.ease,
      p_log_ivl: result.log.ivl,
      p_last_ivl: result.log.lastIvl,
      p_time_ms: Math.round(timeMs),
      p_rtype: result.log.rtype,
    }),
  );
}

/** Suspends cards, or restores them to the queue matching their type. */
export async function setSuspended(cards: CardRow[], suspended: boolean) {
  for (const c of cards) {
    const queue = suspended
      ? Queue.Suspended
      : c.ctype === CardType.New
        ? Queue.New
        : c.ctype === CardType.Review
          ? Queue.Review
          : Queue.Learn;
    check(await supabase.from('cards').update({ queue, leech: suspended ? c.leech : false }).eq('id', c.id));
  }
}

// ---------------------------------------------------------------------------
// Review log
// ---------------------------------------------------------------------------

export async function listRevlog(studentId: string, sinceIso: string): Promise<RevlogRow[]> {
  return fetchAll<RevlogRow>((from, to) =>
    supabase
      .from('revlog')
      .select('id, card_id, reviewed_at, ease, ivl, last_ivl, factor, time_ms, rtype')
      .eq('student_id', studentId)
      .gte('reviewed_at', sinceIso)
      .order('id')
      .range(from, to),
  );
}

// ---------------------------------------------------------------------------
// Sentences
// ---------------------------------------------------------------------------

export async function addSentence(noteId: string, studentId: string, text: string) {
  check(await supabase.from('sentences').insert({ note_id: noteId, student_id: studentId, text: text.trim() }));
}

export async function listSentences(studentId: string, limit = 50): Promise<Sentence[]> {
  return check(
    await supabase
      .from('sentences')
      .select('id, note_id, student_id, text, created_at')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(limit),
  );
}
