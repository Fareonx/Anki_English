import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { courseFor } from '../lessons';
import { listLessonProgress, type LessonProgress } from '../lib/db';
import { useI18n } from '../lib/i18n';

/** Grammar lessons by unit of the textbook, with the best result of each. */
export function LessonsPage() {
  const { student, studyLang } = useAuth();
  const course = courseFor(studyLang);
  const LESSONS = course?.lessons ?? [];
  const UNITS = course?.units ?? [];
  const { t } = useI18n();
  const [progress, setProgress] = useState<Map<string, LessonProgress>>(new Map());

  useEffect(() => {
    if (!student) return;
    void listLessonProgress(student.id)
      .then((rows) => setProgress(new Map(rows.map((r) => [r.lesson_id, r]))))
      .catch(() => setProgress(new Map()));
  }, [student]);

  // The first lesson without a result is the one to do next.
  const nextId = LESSONS.find((l) => !progress.has(l.id))?.id;

  return (
    <div className="stack">
      <h2>{t('lessons.title')}</h2>
      <p className="muted small">{t(studyLang === 'it' ? 'lessons.intro' : 'lessons.intro_es')}</p>
      <Link to="/lessons/verbs" className="card lesson-item verbs-entry">
        <div className="grow">
          <b>🔁 {t('verbs.title')}</b>
          <div className="muted small">{t('verbs.entry')}</div>
        </div>
      </Link>
      {UNITS.map((u) => {
        const lessons = LESSONS.filter((l) => l.unit === u.unit);
        if (lessons.length === 0) return null;
        return (
          <section key={u.unit} className="lesson-unit">
            <h3>
              <span className="muted small">{t('lessons.unit', { n: u.unit })}</span> {u.title}{' '}
              <span className="muted small">· {u.ru}</span>
            </h3>
            <div className="lesson-list">
              {lessons.map((l) => {
                const p = progress.get(l.id);
                return (
                  <Link
                    key={l.id}
                    to={`/lessons/${l.id}`}
                    className={`card lesson-item ${l.id === nextId ? 'next' : ''} ${p ? 'done' : ''}`}
                  >
                    <div className="grow">
                      <b>{l.title}</b>
                      <div className="muted small">{l.goal}</div>
                    </div>
                    {p ? (
                      <span className={`lesson-score ${p.best === p.total ? 'full' : ''}`}>
                        {t('lessons.score', { best: p.best, total: p.total })}
                      </span>
                    ) : (
                      l.id === nextId && <span className="lesson-score next">{t('lessons.next')}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
