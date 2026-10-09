import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { BackIcon, PenIcon, SpeakerIcon } from '../components/Icons';
import { addSentence, saveAnswer, type CardRow, type Note } from '../lib/db';
import { deckPath, subtreeIds } from '../lib/decks';
import { StudySession, type Counts } from '../lib/scheduler/queue';
import { answerCard, formatInterval, nextIntervals } from '../lib/scheduler/sm2';
import { CardType, Ease, Queue } from '../lib/scheduler/types';
import { canSpeak, speak } from '../lib/speech';
import { summarizeToday } from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';
import { useI18n, type Key } from '../lib/i18n';
import { checkTypedAnswer, isAcceptedAlternative, type DiffChar, type TypedResult } from '../lib/typeAnswer';
import { lookup } from '../lib/translate';

/** Anki stops counting answer time after 60 seconds. */
const MAX_ANSWER_MS = 60_000;

const BUTTONS: { ease: Ease; label: Key; cls: string }[] = [
  { ease: Ease.Again, label: 'study.again', cls: 'again' },
  { ease: Ease.Hard, label: 'study.hard', cls: 'hard' },
  { ease: Ease.Good, label: 'study.good', cls: 'good' },
  { ease: Ease.Easy, label: 'study.easy', cls: 'easy' },
];

function SpeakButton({ text }: { text: string }) {
  const { t } = useI18n();
  if (!canSpeak()) return null;
  return (
    <button type="button" className="icon-btn speak" onClick={() => speak(text)} aria-label={t('study.speak')}>
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
  const { t } = useI18n();
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
          {t('study.sentence_toggle')} <b>{note.word}</b>
        </span>
      </button>
    );
  }

  return (
    <div className="sentence-box">
      <label htmlFor="sentence">
        {t('study.sentence_label')} <b>{note.word}</b>
      </label>
      <textarea
        id="sentence"
        autoFocus
        rows={2}
        value={text}
        placeholder={t('study.sentence_placeholder')}
        onChange={(e) => {
          setText(e.target.value);
          if (state !== 'saving') setState('idle');
        }}
      />
      <div className="row gap">
        <button type="button" className="btn small" disabled={!text.trim() || state === 'saving'} onClick={save}>
          {t('save')}
        </button>
        {state === 'saved' && <span className="ok small">{t('study.saved')}</span>}
        {state === 'error' && <span className="error small">{t('study.save_error')}</span>}
      </div>
    </div>
  );
}

function Letters({ chars, kind }: { chars: DiffChar[]; kind: 'typed' | 'expected' }) {
  return (
    <span className={`letters ${kind}`}>
      {chars.map((c, i) => (
        <span key={i} className={c.ok ? undefined : 'bad'}>
          {c.ch === ' ' ? '\u00a0' : c.ch}
        </span>
      ))}
    </span>
  );
}

/** Letter-by-letter comparison of the typed word with the correct one. */
function TypedFeedback({ result, alternative, word }: { result: TypedResult; alternative: boolean; word: string }) {
  const { t } = useI18n();
  if (result.correct) return <div className="typed-result ok-result">{t('study.correct')}</div>;
  // Another correct word (hi for hello): not a mistake, shown in blue with the main variant.
  if (alternative) {
    return (
      <div className="typed-result alt-result">
        <div className="alt-title">{t('study.alt_correct')}</div>
        <div className="alt-text">
          {t('study.alt_main')} <b className="alt-word">{word}</b>
        </div>
      </div>
    );
  }
  return (
    <div className="typed-result wrong-result">
      <div className="typed-title">{t('study.wrong')}</div>
      <div className="typed-label">{t('study.you_typed')}</div>
      {result.typed.length > 0 ? (
        <Letters chars={result.typed} kind="typed" />
      ) : (
        <span className="letters typed muted">{t('study.empty_answer')}</span>
      )}
      <div className="typed-label">{t('study.right_answer')}</div>
      <Letters chars={result.expected} kind="expected" />
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
  const { t, units } = useI18n();
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
  const [typed, setTyped] = useState('');
  const [typedResult, setTypedResult] = useState<TypedResult | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const [altAccepted, setAltAccepted] = useState(false);
  const [checking, setChecking] = useState(false);

  const notesById = useMemo(() => new Map(notes.map((n) => [n.id, n])), [notes]);
  const cfg = useMemo(() => ({ ...config, newPerDay: config.newPerDay + extraNew }), [config, extraNew]);
  const title = deckId === 'all' ? t('study.all_words') : deckPath(decks, deckId);
  // Typing the English word is on unless switched off in Settings.
  const typeAnswers = student?.settings?.typeAnswer !== false;
  const readOnly = isAdmin && student?.id !== profile?.id;

  const advance = useCallback(() => {
    const s = sessionRef.current;
    if (!s) return;
    const now = Date.now();
    const next = s.next(now);
    setCounts(s.counts());
    setCurrent(next);
    setRevealed(false);
    setTyped('');
    setTypedResult(null);
    setGaveUp(false);
    setAltAccepted(false);
    setChecking(false);
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
    const session = new StudySession(subset, summary, cfg, Date.now(), { reverseFirst: typeAnswers });
    sessionRef.current = session;

    // Words not started at all that today's limit left out.
    const startedNotes = new Set(subset.filter((c) => c.ctype !== CardType.New).map((c) => c.note_id));
    const freshNotes = new Set(
      subset.filter((c) => !startedNotes.has(c.note_id) && !summary.touchedNotes.has(c.note_id)).map((c) => c.note_id),
    );
    setMoreNew(Math.max(0, freshNotes.size - session.freshWords));
    advance();
  }, [loading, cards, decks, revlog, deckId, cfg, advance, typeAnswers]);

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
        setNotice(t('study.save_failed', { error: e instanceof Error ? e.message : String(e) }));
        setSaving(false);
        return;
      }
      setSaving(false);
      setNotice(null);
      if (result.becameLeech) {
        const word = notesById.get(current.note_id)?.word ?? '';
        setNotice(t('study.leech', { word, n: result.card.lapses }));
      }
      setAnswered((n) => n + 1);
      navigator.vibrate?.(10);
      sessionRef.current?.apply({ ...current, ...result.card });
      advance();
    },
    [current, revealed, saving, readOnly, cfg, shownAt, notesById, advance, t],
  );

  const reveal = useCallback(() => {
    if (!current) return;
    setRevealed(true);
    if (current.template === 1) {
      const note = notesById.get(current.note_id);
      if (note) speak(note.word);
    }
  }, [current, notesById]);

  const typing = !!current && current.template === 1 && typeAnswers;

  const mistyped = typedResult !== null && !typedResult.correct && !altAccepted;

  // Compare the typed word with the answer, then show the answer.
  const check = useCallback(async () => {
    if (!current || revealed || checking) return;
    const note = notesById.get(current.note_id);
    if (!note) return;
    const result = checkTypedAnswer(typed, note.word);
    // Hide the phone keyboard so the result and buttons are visible.
    (document.activeElement as HTMLElement | null)?.blur();
    if (!result.correct && typed.trim()) {
      setChecking(true);
      const ok = await isAcceptedAlternative(typed, note, lookup).catch(() => false);
      setChecking(false);
      setAltAccepted(ok);
    }
    setTypedResult(result);
    reveal();
  }, [current, revealed, checking, notesById, typed, reveal]);

  // "I don't know": show the answer; like a mistake, only "Again" is offered.
  const giveUp = useCallback(() => {
    if (!current || revealed) return;
    const note = notesById.get(current.note_id);
    if (!note) return;
    setGaveUp(true);
    setTypedResult(checkTypedAnswer('', note.word));
    (document.activeElement as HTMLElement | null)?.blur();
    reveal();
  }, [current, revealed, notesById, reveal]);

  // Anki keyboard shortcuts: Space/Enter shows the answer (then means "Good"), 1-4 answer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!revealed) {
          if (typing) void check();
          else reveal();
        } else void answer(mistyped ? Ease.Again : Ease.Good);
      } else if (revealed && mistyped) {
        if (e.key === '1') {
          e.preventDefault();
          void answer(Ease.Again);
        }
      } else if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        void answer(Number(e.key) as Ease);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, reveal, answer, typing, check, mistyped]);

  if (loading) return <p className="muted">{t('loading')}</p>;
  if (error) return <p className="error">{error}</p>;

  const note = current ? notesById.get(current.note_id) : undefined;

  return (
    <div className="study">
      <div className="study-head">
        <Link to="/" className="icon-btn back" aria-label={t('study.back')}>
          <BackIcon />
        </Link>
        <span className="study-title">{title}</span>
        <CountsBar counts={counts} current={current} />
      </div>

      {readOnly && (
        <p className="hint">{t('study.admin_readonly', { name: student?.name ?? '' })}</p>
      )}
      {notice && <p className="info">{notice}</p>}

      {current && note ? (
        <>
          <article className={`flashcard ${revealed ? "revealed" : ""}`} key={current.id}>
            {current.template === 0 ? (
              <div className="front">
                <div className="prompt muted small">{t('study.recall_translation')}</div>
                <div className="word">
                  {note.word} <SpeakButton text={note.word} />
                </div>
                {revealed && note.ipa && <div className="ipa">{note.ipa}</div>}
              </div>
            ) : (
              <div className="front">
                <div className="prompt muted small">
                  {typing ? t('study.recall_word') : t('study.recall_word_self')}
                </div>
                <div className="translation">{note.translation_ru || '—'}</div>
                {note.translation_az && <div className="translation az">{note.translation_az}</div>}
                {note.pos && <div className="pos">{note.pos}</div>}
                {typing && (
                  <form
                    className="type-answer"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void check();
                    }}
                  >
                    <input
                      value={typed}
                      onChange={(e) => setTyped(e.target.value)}
                      placeholder={t('study.type_placeholder')}
                      disabled={revealed}
                      autoFocus
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="done"
                      aria-label={t('study.recall_word')}
                    />
                  </form>
                )}
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
                    {typedResult && !gaveUp && <TypedFeedback result={typedResult} alternative={altAccepted} word={note.word} />}
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
              typing ? (
                <div className="typing-actions">
                  <button className="btn show-answer dont-know" onClick={giveUp}>
                    {t('study.dont_know')}
                  </button>
                  <button className="btn primary show-answer" disabled={checking} onClick={() => void check()}>
                    {checking ? t('study.checking') : t('study.check')}
                  </button>
                </div>
              ) : (
                <button className="btn primary wide show-answer" onClick={reveal}>
                  {t('study.show_answer')}
                </button>
              )
            ) : mistyped ? (
              <div className="mistyped-bar">
                <button
                  className="ease again wide-ease"
                  disabled={saving || readOnly}
                  onClick={() => void answer(Ease.Again)}
                >
                  <span className="ivl">{intervals ? formatInterval(intervals[Ease.Again], units) : ''}</span>
                  <span>{t('study.again')}</span>
                </button>
                <p className="muted small">{t('study.wrong_hint')}</p>
              </div>
            ) : (
              <div className="ease-buttons">
                {BUTTONS.map((b) => (
                  <button
                    key={b.ease}
                    className={`ease ${b.cls}`}
                    disabled={saving || readOnly}
                    onClick={() => void answer(b.ease)}
                  >
                    <span className="ivl">{intervals ? formatInterval(intervals[b.ease], units) : ''}</span>
                    <span>{t(b.label)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : finished ? (
        <div className="card empty">
          <h2>{t('study.done_title')}</h2>
          <p className="muted">
            {answered > 0 ? `${t('study.done_answers', { n: answered })} ` : ''}
            {t('study.done_next', { time: `${String(cfg.rolloverHour).padStart(2, '0')}:00` })}
          </p>
          {moreNew > 0 && !readOnly && (
            <button
              className="btn"
              onClick={() => {
                setExtraNew((n) => n + 5);
                void reload();
              }}
            >
              {t('study.more_new')}
            </button>
          )}
          <p>
            <Link to="/">{t('back_to_decks')}</Link>
          </p>
        </div>
      ) : (
        <div className="card empty">
          <h2>{t('study.pause_title')}</h2>
          <p className="muted">
            {waitUntil
              ? t('study.pause_in', {
                  ivl: formatInterval(Math.max(60, waitUntil - Math.floor(Date.now() / 1000)), units),
                })
              : t('study.pause_soon')}
          </p>
          <p>
            <Link to="/">{t('back_to_decks')}</Link>
          </p>
        </div>
      )}
    </div>
  );
}
