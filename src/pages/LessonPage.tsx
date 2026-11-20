import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { LESSONS } from '../lessons/it';
import type { Drill, Lesson } from '../lessons/types';
import { saveLessonResult } from '../lib/db';
import { useI18n } from '../lib/i18n';
import { canSpeak, speak } from '../lib/speech';
import { checkTypedAnswer } from '../lib/typeAnswer';

/** "**bold**" in lesson texts. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : part,
  );
}

/** Accents and apostrophes are not required, as on the word cards. */
export function drillVerdict(drill: Drill, typed: string): { correct: boolean; inexact: boolean } {
  for (const answer of [drill.answer, ...(drill.also ?? [])]) {
    const r = checkTypedAnswer(typed, answer, true);
    if (r.correct) return { correct: true, inexact: !!r.inexact };
  }
  return { correct: false, inexact: false };
}

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function Theory({ lesson }: { lesson: Lesson }) {
  return (
    <>
      {lesson.sections.map((s, i) => (
        <section key={i} className="card pad lesson-section">
          <h3>{s.title}</h3>
          {s.text.split(/\n\s*\n/).map((p, k) => (
            <p key={k}>{rich(p)}</p>
          ))}
          {s.tables?.map((tbl, k) => (
            <div key={k} className="table-wrap">
              {tbl.title && <div className="table-title">{tbl.title}</div>}
              <table className="forms">
                <thead>
                  <tr>
                    {tbl.head.map((h, c) => (
                      <th key={c}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tbl.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (c === 0 ? <th key={c}>{cell}</th> : <td key={c}>{cell}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {s.examples && s.examples.length > 0 && (
            <ul className="plain examples">
              {s.examples.map((e, k) => (
                <li key={k}>
                  <b>{e.it}</b>
                  {canSpeak() && (
                    <button type="button" className="icon-btn tiny-speak" onClick={() => speak(e.it, 'it')} aria-label="🔊">
                      🔊
                    </button>
                  )}
                  <div className="small">{e.ru}</div>
                  <div className="small muted">{e.az}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

interface Answered {
  drill: Drill;
  correct: boolean;
}

/** Typed exercises: one item at a time, the score is saved at the end. */
function Practice({ lesson, onDone }: { lesson: Lesson; onDone: (score: number, total: number) => void }) {
  const { t } = useI18n();
  const [items, setItems] = useState<Drill[]>(lesson.drills);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [verdict, setVerdict] = useState<{ correct: boolean; inexact: boolean } | null>(null);
  const [answered, setAnswered] = useState<Answered[]>([]);
  const [full, setFull] = useState(true);
  const input = useRef<HTMLInputElement>(null);

  const drill = items[index];
  const finished = index >= items.length;

  useEffect(() => {
    if (!verdict) input.current?.focus();
  }, [index, verdict]);

  function restart(next: Drill[], isFull: boolean) {
    setItems(next);
    setIndex(0);
    setTyped('');
    setVerdict(null);
    setAnswered([]);
    setFull(isFull);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!drill) return;
    if (verdict) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setTyped('');
      setVerdict(null);
      if (nextIndex >= items.length && full) {
        onDone(answered.filter((a) => a.correct).length, items.length);
      }
      return;
    }
    const v = drillVerdict(drill, typed);
    setVerdict(v);
    setAnswered((prev) => [...prev, { drill, correct: v.correct }]);
  }

  if (finished) {
    const score = answered.filter((a) => a.correct).length;
    const mistakes = answered.filter((a) => !a.correct).map((a) => a.drill);
    return (
      <section className="card pad practice-result">
        <h3>{t('lessons.result', { n: score, total: items.length })}</h3>
        {mistakes.length > 0 && (
          <ul className="plain small">
            {mistakes.map((d, i) => (
              <li key={i}>
                {d.prompt} → <b>{d.answer}</b>
              </li>
            ))}
          </ul>
        )}
        <div className="row gap wrap">
          {mistakes.length > 0 && (
            <button className="btn primary" onClick={() => restart(mistakes, false)}>
              {t('lessons.retry_mistakes', { n: mistakes.length })}
            </button>
          )}
          <button className="btn" onClick={() => restart(shuffled(lesson.drills), true)}>
            {t('lessons.again')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card pad practice">
      <div className="row gap">
        <h3 className="grow">{t('lessons.practice')}</h3>
        <span className="muted small">
          {index + 1} / {items.length}
        </span>
      </div>
      <div className="drill-prompt">{rich(drill.prompt)}</div>
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
          aria-label={t('lessons.practice')}
        />
        <button className="btn primary" type="submit" disabled={!verdict && !typed.trim()}>
          {verdict ? t('lessons.next_item') : t('study.check')}
        </button>
      </form>
      {!verdict && (
        <button type="button" className="btn small" onClick={() => submit({ preventDefault() {} } as FormEvent)}>
          {t('study.dont_know')}
        </button>
      )}
      {verdict && (
        <div className={`typed-result ${verdict.correct ? 'ok-result' : 'wrong-result'}`}>
          <div>{verdict.correct ? t('study.correct') : t('study.wrong')}</div>
          {(!verdict.correct || verdict.inexact) && (
            <div>
              {verdict.correct ? t('study.spelling') : t('study.right_answer')} <b>{drill.answer}</b>
              {drill.also && drill.also.length > 0 && <span className="muted"> ({drill.also.join(', ')})</span>}
            </div>
          )}
          {!verdict.correct && drill.hint && <div className="small muted">{drill.hint}</div>}
        </div>
      )}
    </section>
  );
}

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const { student, profile, isAdmin } = useAuth();
  const { t } = useI18n();
  const index = LESSONS.findIndex((l) => l.id === lessonId);
  const lesson = LESSONS[index];
  const next = LESSONS[index + 1];
  const [saved, setSaved] = useState<string | null>(null);
  // An admin looking at a student's lessons does not save results for them.
  const readOnly = isAdmin && student?.id !== profile?.id;

  useEffect(() => {
    window.scrollTo(0, 0);
    setSaved(null);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="stack">
        <Link to="/lessons" className="muted">
          ← {t('lessons.title')}
        </Link>
        <p className="muted">{t('lessons.not_found')}</p>
      </div>
    );
  }

  async function done(score: number, total: number) {
    if (!student || readOnly) return;
    try {
      await saveLessonResult(student.id, lesson.id, score, total);
      setSaved(t('lessons.saved'));
    } catch (e) {
      setSaved(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="stack lesson-page">
      <Link to="/lessons" className="muted">
        ← {t('lessons.title')}
      </Link>
      <div>
        <div className="muted small">{t('lessons.unit', { n: lesson.unit })}</div>
        <h2>{lesson.title}</h2>
        <p className="muted">{lesson.goal}</p>
      </div>
      <Theory lesson={lesson} />
      <Practice key={lesson.id} lesson={lesson} onDone={(s, n) => void done(s, n)} />
      {saved && <p className="muted small">{saved}</p>}
      {next && (
        <Link to={`/lessons/${next.id}`} className="btn wide">
          {t('lessons.next_lesson', { title: next.title })}
        </Link>
      )}
    </div>
  );
}
