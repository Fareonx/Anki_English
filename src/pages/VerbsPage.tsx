import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { TenseId, Verb, VerbGroup } from '../lessons/it/verbTypes';
import { TENSE_UNIT, VERBS } from '../lessons/it/verbs';
import { useI18n, type Key } from '../lib/i18n';
import { speak, useSpeech } from '../lib/speech';
import { checkTypedAnswer } from '../lib/typeAnswer';

const PERSONS = ['io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'];
const TENSES: TenseId[] = ['presente', 'passato', 'futuro', 'imperfetto', 'condizionale', 'imperativo'];
const GROUPS: (VerbGroup | 'all')[] = ['all', 'are', 'ere', 'ire', 'isc', 'irregular', 'modal', 'reflexive'];
const QUESTIONS = 20;
const TENSES_KEY = 'verbTenses';

export interface VerbQuestion {
  verb: Verb;
  tense: TenseId;
  person: number;
}

/** Accents, apostrophes and punctuation are optional; any listed form is right. */
export function verbVerdict(q: VerbQuestion, typed: string): { correct: boolean; inexact: boolean } {
  for (const form of q.verb.forms[q.tense][q.person]) {
    const r = checkTypedAnswer(typed, form, true);
    if (r.correct) return { correct: true, inexact: !!r.inexact };
  }
  return { correct: false, inexact: false };
}

/** `count` random questions over the chosen verbs and tenses, no question twice in a row. */
export function makeQuestions(verbs: Verb[], tenses: TenseId[], count: number, random = Math.random): VerbQuestion[] {
  const pool: VerbQuestion[] = [];
  for (const verb of verbs) {
    for (const tense of tenses) {
      verb.forms[tense].forEach((cell, person) => {
        if (cell.length > 0) pool.push({ verb, tense, person });
      });
    }
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function readTenses(): TenseId[] {
  try {
    const stored = JSON.parse(localStorage.getItem(TENSES_KEY) ?? '[]') as TenseId[];
    const valid = stored.filter((t) => TENSES.includes(t));
    return valid.length ? valid : ['presente'];
  } catch {
    return ['presente'];
  }
}

function FormsTable({ verb, tense, person }: { verb: Verb; tense: TenseId; person?: number }) {
  const { t } = useI18n();
  return (
    <div className="table-wrap">
      <div className="table-title">
        {verb.inf} · {t(`verbs.tense_${tense}` as Key)}
      </div>
      <table className="forms">
        <tbody>
          {verb.forms[tense].map((cell, p) =>
            cell.length === 0 ? null : (
              <tr key={p} className={p === person ? 'highlight' : ''}>
                <th>{PERSONS[p]}</th>
                <td>{cell.join(' / ')}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

function Drill({ questions, onExit }: { questions: VerbQuestion[]; onExit: () => void }) {
  const { t } = useI18n();
  const voice = useSpeech('it');
  const [queue, setQueue] = useState(questions);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [verdict, setVerdict] = useState<{ correct: boolean; inexact: boolean } | null>(null);
  const [right, setRight] = useState(0);
  const [mistakes, setMistakes] = useState<VerbQuestion[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const q = queue[index];

  useEffect(() => {
    if (!verdict) input.current?.focus();
  }, [index, verdict]);

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!q) return;
    if (verdict) {
      setIndex((i) => i + 1);
      setTyped('');
      setVerdict(null);
      return;
    }
    const v = verbVerdict(q, typed);
    setVerdict(v);
    if (v.correct) {
      setRight((n) => n + 1);
      if (voice.enabled) speak(q.verb.forms[q.tense][q.person][0], 'it');
    } else {
      setMistakes((m) => [...m, q]);
      // A mistake comes back once at the end.
      if (queue.filter((x) => x === q).length < 2) setQueue((prev) => [...prev, q]);
    }
  }

  if (!q) {
    const unique = [...new Set(mistakes)];
    return (
      <section className="card pad practice-result">
        <h3>{t('lessons.result', { n: right, total: queue.length })}</h3>
        {unique.length > 0 && (
          <ul className="plain small">
            {unique.map((m, i) => (
              <li key={i}>
                {m.verb.inf} · {t(`verbs.tense_${m.tense}` as Key)} · {PERSONS[m.person]} →{' '}
                <b>{m.verb.forms[m.tense][m.person].join(' / ')}</b>
              </li>
            ))}
          </ul>
        )}
        <div className="row gap wrap">
          {unique.length > 0 && (
            <button className="btn primary" onClick={() => restart(unique)}>
              {t('lessons.retry_mistakes', { n: unique.length })}
            </button>
          )}
          <button className="btn" onClick={onExit}>
            {t('verbs.change')}
          </button>
        </div>
      </section>
    );
  }

  function restart(next: VerbQuestion[]) {
    setQueue(next);
    setIndex(0);
    setTyped('');
    setVerdict(null);
    setRight(0);
    setMistakes([]);
  }

  return (
    <section className="card pad practice">
      <div className="row gap">
        <h3 className="grow">{t('verbs.title')}</h3>
        <span className="muted small">
          {index + 1} / {queue.length}
        </span>
      </div>
      <div className="drill-prompt">
        {q.verb.inf} <span className="muted small">({q.verb.ru})</span>
        <div className="small">
          {t(`verbs.tense_${q.tense}` as Key)} · <b>{PERSONS[q.person]}</b>
        </div>
      </div>
      <form onSubmit={submit} className="drill-form">
        <input
          ref={input}
          className={`type-input ${verdict ? (verdict.correct ? 'ok' : 'bad') : ''}`}
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          readOnly={!!verdict}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint={verdict ? 'next' : 'done'}
          placeholder={t('study.type_placeholder')}
          aria-label={t('verbs.title')}
        />
        <button className="btn primary" type="submit" disabled={!verdict && !typed.trim()}>
          {verdict ? t('lessons.next_item') : t('study.check')}
        </button>
      </form>
      {!verdict && (
        <button type="button" className="btn small" onClick={() => submit()}>
          {t('study.dont_know')}
        </button>
      )}
      {verdict && (
        <>
          <div className={`typed-result ${verdict.correct ? 'ok-result' : 'wrong-result'}`}>
            <div>{verdict.correct ? t('study.correct') : t('study.wrong')}</div>
            {(!verdict.correct || verdict.inexact) && (
              <div>
                {verdict.correct ? t('study.spelling') : t('study.right_answer')}{' '}
                <b>{q.verb.forms[q.tense][q.person].join(' / ')}</b>
              </div>
            )}
          </div>
          <FormsTable verb={q.verb} tense={q.tense} person={q.person} />
        </>
      )}
    </section>
  );
}

/** Verb trainer: conjugate the main verbs of the textbook in the chosen tenses. */
export function VerbsPage() {
  const { t } = useI18n();
  const [tenses, setTenses] = useState<TenseId[]>(readTenses);
  const [group, setGroup] = useState<VerbGroup | 'all'>('all');
  const [questions, setQuestions] = useState<VerbQuestion[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const verbs = useMemo(() => VERBS.filter((v) => group === 'all' || v.group === group), [group]);

  function toggleTense(tense: TenseId) {
    setTenses((prev) => {
      const next = prev.includes(tense) ? prev.filter((x) => x !== tense) : [...prev, tense];
      const ordered = TENSES.filter((x) => next.includes(x));
      try {
        localStorage.setItem(TENSES_KEY, JSON.stringify(ordered));
      } catch {
        // The choice just won't be remembered.
      }
      return ordered;
    });
  }

  return (
    <div className="stack">
      <Link to="/lessons" className="muted">
        ← {t('lessons.title')}
      </Link>
      <h2>{t('verbs.title')}</h2>
      {questions ? (
        <Drill questions={questions} onExit={() => setQuestions(null)} />
      ) : (
        <>
          <p className="muted small">{t('verbs.intro')}</p>
          <section className="card pad">
            <h3>{t('verbs.tenses')}</h3>
            <div className="chips">
              {TENSES.map((tense) => (
                <button
                  key={tense}
                  type="button"
                  className={`chip ${tenses.includes(tense) ? 'active' : ''}`}
                  aria-pressed={tenses.includes(tense)}
                  onClick={() => toggleTense(tense)}
                >
                  {t(`verbs.tense_${tense}` as Key)}
                  <span className="muted tiny"> · {t('lessons.unit', { n: TENSE_UNIT[tense] })}</span>
                </button>
              ))}
            </div>
            <h3>{t('verbs.verbs')}</h3>
            <div className="chips">
              {GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`chip ${group === g ? 'active' : ''}`}
                  aria-pressed={group === g}
                  onClick={() => setGroup(g)}
                >
                  {t(`verbs.group_${g}` as Key)}
                </button>
              ))}
            </div>
            <button
              className="btn primary wide"
              disabled={tenses.length === 0}
              onClick={() => setQuestions(makeQuestions(verbs, tenses, QUESTIONS))}
            >
              {t('verbs.start', { n: QUESTIONS })}
            </button>
          </section>

          <section className="card pad">
            <h3>{t('verbs.tables', { n: verbs.length })}</h3>
            <ul className="plain verb-list">
              {verbs.map((v) => (
                <li key={v.inf}>
                  <button type="button" className="link-btn" onClick={() => setOpen(open === v.inf ? null : v.inf)}>
                    <b>{v.inf}</b> <span className="muted small">— {v.ru} · {v.az}</span>
                  </button>
                  {open === v.inf && (
                    <div className="verb-tables">
                      {TENSES.filter((x) => tenses.includes(x)).map((tense) => (
                        <FormsTable key={tense} verb={v} tense={tense} />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
