import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { BackIcon, PenIcon, SpeakerIcon } from '../components/Icons';
import { addSentence, saveAnswer, type CardRow, type Note } from '../lib/db';
import { deckPath, subtreeIds } from '../lib/decks';
import { StudySession, type Counts } from '../lib/scheduler/queue';
import { answerCard, formatInterval, nextIntervals } from '../lib/scheduler/sm2';
import { Ease, Queue } from '../lib/scheduler/types';
import { canSpeak, speak } from '../lib/speech';
import { summarizeToday } from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';

/** Anki stops counting answer time after 60 seconds. */
const MAX_ANSWER_MS = 60_000;

const BUTTONS = [
  { ease: Ease.Again, label: 'Снова', cls: 'again' },
  { ease: Ease.Hard, label: 'Трудно', cls: 'hard' },
  { ease: Ease.Good, label: 'Хорошо', cls: 'good' },
  { ease: Ease.Easy, label: 'Легко', cls: 'easy' },
] as const;

function SpeakButton({ text }: { text: string }) {
  if (!canSpeak()) return null;
  return (
    <button type="button" className="icon-btn speak" onClick={() => speak(text)} aria-label="Произнести">
      <SpeakerIcon />
    </button>
  );
}

function Details({ note }: { note: Note }) {
  return (
    <div className="details">
      {note.definition && (
        <p>
          <span className="label">Definition</span>
          {note.definition}
        </p>
      )}
      {note.example && (
        <p className="example">
          <span className="label">Example</span>
          {note.example}
        </p>
      )}
      {note.synonyms && (
        <p>
          <span className="label">Synonyms</span>
          {note.synonyms}
        </p>
      )}
    </div>
  );
}

function SentenceBox({ note, studentId }: { note: Note; studentId: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    setOpen(false);
    setText('');
    setState('idle');
  }, [note.id]);

  async function save() {
    if (!text.trim()) return;
    setState('saving');
    try {
      await addSentence(note.id, studentId, text);
      setState('saved');
    } catch {
      setState('error');
    }
  }

  if (!open) {
    return (
      <button type="button" className="sentence-toggle" onClick={() => setOpen(true)}>
        <PenIcon />
        <span>
          Составить предложение со словом <b>{note.word}</b>
        </span>
      </button>
    );
  }

  return (
    <div className="sentence-box">
      <label htmlFor="sentence">
        Своё предложение со словом <b>{note.word}</b>
      </label>
      <textarea
        id="sentence"
        autoFocus
        rows={2}
        value={text}
        placeholder="Необязательно, но так слово запомнится лучше"
        onChange={(e) => {
          setText(e.target.value);
          if (state !== 'saving') setState('idle');
        }}
      />
      <div className="row gap">
        <button type="button" className="btn small" disabled={!text.trim() || state === 'saving'} onClick={save}>
          Сохранить
        </button>
        {state === 'saved' && <span className="ok small">✓ Сохранено</span>}
        {state === 'error' && <span className="error small">Не удалось сохранить</span>}
      </div>
    </div>
  );
}

function CountsBar({ counts, current }: { counts: Counts; current: CardRow | null }) {
  const kind = !current
    ? null
    : current.queue === Queue.New
      ? 'new'
      : current.queue === Queue.Review
        ? 'due'
        : 'learn';
  return (
    <div className="counts-bar">
      <span className={`count new ${kind === 'new' ? 'current' : ''}`}>{counts.new}</span>
      <span className="muted">+</span>
      <span className={`count learn ${kind === 'learn' ? 'current' : ''}`}>{counts.learn}</span>
      <span className="muted">+</span>
      <span className={`count due ${kind === 'due' ? 'current' : ''}`}>{counts.review}</span>
    </div>
  );
}

export function StudyPage() {
  const { deckId = 'all' } = useParams();
  const { student, config, isAdmin, profile } = useAuth();
  const { decks, cards, notes, revlog, loading, error, reload } = useStudentData({ notes: true, revlogDays: 1 });

  const sessionRef = useRef<StudySession<CardRow> | null>(null);
  const [current, setCurrent] = useState<CardRow | null>(null);
  const [counts, setCounts] = useState<Counts>({ new: 0, learn: 0, review: 0 });
  const [revealed, setRevealed] = useState(false);
  const [shownAt, setShownAt] = useState(0);
  const [waitUntil, setWaitUntil] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [answered, setAnswered] = useState(0);
  const [extraNew, setExtraNew] = useState(0);
  const [moreNew, setMoreNew] = useState(0);

  const notesById = useMemo(() => new Map(notes.map((n) => [n.id, n])), [notes]);
  const cfg = useMemo(() => ({ ...config, newPerDay: config.newPerDay + extraNew }), [config, extraNew]);
  const title = deckId === 'all' ? 'Все слова' : deckPath(decks, deckId);
  const readOnly = isAdmin && student?.id !== profile?.id;

  const advance = useCallback(() => {
    const s = sessionRef.current;
    if (!s) return;
    const now = Date.now();
    const next = s.next(now);
    setCounts(s.counts());
    setCurrent(next);
    setRevealed(false);
    setShownAt(now);
    setFinished(s.isFinished());
    setWaitUntil(!next && !s.isFinished() ? s.nextLearningDue() : null);
    if (next && next.template === 0) {
      const note = notesById.get(next.note_id);
      if (note) speak(note.word);
    }
  }, [notesById]);

  // (Re)build today's queue whenever fresh data arrives.
  useEffect(() => {
    if (loading) return;
    const ids = deckId === 'all' ? null : subtreeIds(decks, deckId);
    const subset = ids ? cards.filter((c) => ids.has(c.deck_id)) : cards;
    const cardNote = new Map(cards.map((c) => [c.id, c.note_id]));
    const summary = summarizeToday(revlog, cardNote, cfg, Date.now());
    const session = new StudySession(subset, summary, cfg, Date.now());
    sessionRef.current = session;

    const untouchedNewNotes = new Set(
      subset.filter((c) => c.queue === Queue.New && !summary.touchedNotes.has(c.note_id)).map((c) => c.note_id),
    );
    setMoreNew(Math.max(0, untouchedNewNotes.size - session.counts().new));
    advance();
  }, [loading, cards, decks, revlog, deckId, cfg, advance]);

  // While waiting for learning cards, check every few seconds.
  useEffect(() => {
    if (waitUntil === null) return;
    const t = setInterval(() => {
      if (Date.now() / 1000 >= waitUntil - cfg.learnAheadMins * 60) advance();
    }, 5000);
    return () => clearInterval(t);
  }, [waitUntil, cfg.learnAheadMins, advance]);

  const intervals = useMemo(
    () => (current ? nextIntervals(current, Date.now(), cfg) : null),
    // Recompute when a new card is shown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, cfg, shownAt],
  );

  const answer = useCallback(
    async (ease: Ease) => {
      if (!current || !revealed || saving || readOnly) return;
      const now = Date.now();
      const result = answerCard(current, ease, now, cfg);
      setSaving(true);
      try {
        await saveAnswer(current.id, result, Math.min(now - shownAt, MAX_ANSWER_MS));
      } catch (e) {
        setNotice(`Не удалось сохранить ответ. Проверь интернет и попробуй ещё раз. (${e instanceof Error ? e.message : e})`);
        setSaving(false);
        return;
      }
      setSaving(false);
      setNotice(null);
      if (result.becameLeech) {
        const word = notesById.get(current.note_id)?.word ?? '';
        setNotice(`«${word}» — трудное слово (забываний: ${result.card.lapses}). Оно отмечено в статистике.`);
      }
      setAnswered((n) => n + 1);
      navigator.vibrate?.(10);
      sessionRef.current?.apply({ ...current, ...result.card });
      advance();
    },
    [current, revealed, saving, readOnly, cfg, shownAt, notesById, advance],
  );

  const reveal = useCallback(() => {
    if (!current) return;
    setRevealed(true);
    if (current.template === 1) {
      const note = notesById.get(current.note_id);
      if (note) speak(note.word);
    }
  }, [current, notesById]);

  // Anki keyboard shortcuts: Space/Enter shows the answer (then means "Good"), 1-4 answer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!revealed) reveal();
        else void answer(Ease.Good);
      } else if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        void answer(Number(e.key) as Ease);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, reveal, answer]);

  if (loading) return <p className="muted">Загрузка…</p>;
  if (error) return <p className="error">{error}</p>;

  const note = current ? notesById.get(current.note_id) : undefined;

  return (
    <div className="study">
      <div className="study-head">
        <Link to="/" className="icon-btn back" aria-label="К колодам">
          <BackIcon />
        </Link>
        <span className="study-title">{title}</span>
        <CountsBar counts={counts} current={current} />
      </div>

      {readOnly && (
        <p className="hint">
          Ты смотришь как админ: ответы здесь не сохраняются. Учить может только {student?.name}.
        </p>
      )}
      {notice && <p className="info">{notice}</p>}

      {current && note ? (
        <>
          <article className={`flashcard ${revealed ? "revealed" : ""}`} key={current.id}>
            {current.template === 0 ? (
              <div className="front">
                <div className="prompt muted small">Вспомни перевод</div>
                <div className="word">
                  {note.word} <SpeakButton text={note.word} />
                </div>
                {revealed && note.ipa && <div className="ipa">{note.ipa}</div>}
              </div>
            ) : (
              <div className="front">
                <div className="prompt muted small">Вспомни слово на английском</div>
                <div className="translation">{note.translation_ru || '—'}</div>
                {note.translation_az && <div className="translation az">{note.translation_az}</div>}
                {note.pos && <div className="pos">{note.pos}</div>}
              </div>
            )}

            {revealed && (
              <div className="back">
                <hr />
                {current.template === 0 ? (
                  <>
                    {note.pos && <div className="pos">{note.pos}</div>}
                    <div className="translation">{note.translation_ru || '—'}</div>
                    {note.translation_az && <div className="translation az">{note.translation_az}</div>}
                  </>
                ) : (
                  <>
                    <div className="word">
                      {note.word} <SpeakButton text={note.word} />
                    </div>
                    {note.ipa && <div className="ipa">{note.ipa}</div>}
                  </>
                )}
                <Details note={note} />
              </div>
            )}
          </article>

          {revealed && student && !readOnly && <SentenceBox note={note} studentId={student.id} />}

          <div className="answer-bar">
            {!revealed ? (
              <button className="btn primary wide show-answer" onClick={reveal}>
                Показать ответ
              </button>
            ) : (
              <div className="ease-buttons">
                {BUTTONS.map((b) => (
                  <button
                    key={b.ease}
                    className={`ease ${b.cls}`}
                    disabled={saving || readOnly}
                    onClick={() => void answer(b.ease)}
                  >
                    <span className="ivl">{intervals ? formatInterval(intervals[b.ease]) : ''}</span>
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : finished ? (
        <div className="card empty">
          <h2>🎉 На сегодня всё!</h2>
          <p className="muted">
            {answered > 0 ? `Ответов за эту сессию: ${answered}. ` : ''}
            Повторения на завтра появятся после {String(cfg.rolloverHour).padStart(2, '0')}:00.
          </p>
          {moreNew > 0 && !readOnly && (
            <button
              className="btn"
              onClick={() => {
                setExtraNew((n) => n + 10);
                void reload();
              }}
            >
              ➕ Ещё 10 новых карточек сегодня
            </button>
          )}
          <p>
            <Link to="/">← Вернуться к колодам</Link>
          </p>
        </div>
      ) : (
        <div className="card empty">
          <h2>⏳ Небольшая пауза</h2>
          <p className="muted">
            Следующие карточки на изучении появятся
            {waitUntil ? ` через ${formatInterval(Math.max(60, waitUntil - Math.floor(Date.now() / 1000)))}` : ' скоро'}.
            Страница обновится сама.
          </p>
          <p>
            <Link to="/">← Вернуться к колодам</Link>
          </p>
        </div>
      )}
    </div>
  );
}
