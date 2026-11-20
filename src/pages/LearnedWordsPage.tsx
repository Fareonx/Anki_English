import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { learnedNotes } from '../lib/stats';
import type { StudyLang } from '../lib/studyLang';
import { useStudentData } from '../lib/useStudentData';
import { useI18n } from '../lib/i18n';

/** Italian nouns come with their article ("il libro"): sort them by the noun. */
function sortKey(word: string, lang: StudyLang): string {
  return lang === 'it' ? word.replace(/^(il|lo|la|i|gli|le)\s+|^l['’]/i, '') : word;
}

type Status = 'solid' | 'learned' | 'learning';
type Filter = 'learned' | 'learning' | 'all';

/**
 * "My words": the words the student has learned (both cards out of the learning steps,
 * as the "Изучено слов" tile counts them) and the words started but not learned yet.
 */
export function LearnedWordsPage() {
  const { cards, notes, loading, error } = useStudentData({ notes: true, revlogDays: 0 });
  const { t, locale } = useI18n();
  const { studyLang } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('learned');

  const words = useMemo(() => {
    const learned = learnedNotes(cards);
    const started = new Set(cards.filter((c) => c.ctype !== 0).map((c) => c.note_id));
    return notes
      .filter((n) => started.has(n.id))
      .map((n) => {
        const l = learned.get(n.id);
        const status: Status = l ? (l.solid ? 'solid' : 'learned') : 'learning';
        return { note: n, status };
      })
      .sort((a, b) =>
        sortKey(a.note.word, studyLang).localeCompare(sortKey(b.note.word, studyLang), studyLang, {
          sensitivity: 'base',
        }),
      );
  }, [cards, notes, studyLang]);

  if (loading) return <p className="muted">{t('loading')}</p>;
  if (error) return <p className="error">{error}</p>;

  const learnedCount = words.filter((w) => w.status !== 'learning').length;
  const learningCount = words.length - learnedCount;
  const q = query.trim().toLowerCase();
  const visible = words.filter(
    ({ note: n, status }) =>
      (filter === 'all' || (filter === 'learning') === (status === 'learning')) &&
      (!q || [n.word, n.translation_ru, n.translation_az].some((f) => f.toLowerCase().includes(q))),
  );
  const FILTERS: [Filter, string][] = [
    ['learned', `${t('learned.learned')} · ${learnedCount.toLocaleString(locale)}`],
    ['learning', `${t('learned.learning')} · ${learningCount.toLocaleString(locale)}`],
    ['all', `${t('learned.all')} · ${words.length.toLocaleString(locale)}`],
  ];

  return (
    <div className="stack">
      <div className="row gap wrap">
        <Link to="/stats" className="muted">
          ← {t('nav.stats')}
        </Link>
        <h2 className="grow">{t('learned.my_title')}</h2>
      </div>
      <p className="muted small">{t('learned.hint')}</p>

      {words.length === 0 ? (
        <p className="muted">{t('learned.empty')}</p>
      ) : (
        <>
          <div className="segmented">
            {FILTERS.map(([f, label]) => (
              <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
                {label}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder={t('browse.search', { n: visible.length })}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {visible.length === 0 && (
            <p className="muted">{filter === 'learned' ? t('learned.none_yet') : t('browse.empty')}</p>
          )}
          <div className="word-list">
            {visible.map(({ note: n, status }) => (
              <div key={n.id} className="card word-item">
                <div className="word-line">
                  <div className="grow">
                    <b>{n.word}</b> {n.ipa && <span className="muted small">{n.ipa}</span>}
                    <div className="small">
                      {n.translation_ru}
                      {n.translation_az && <span className="muted"> · {n.translation_az}</span>}
                    </div>
                  </div>
                  <span className={`status ${status === 'learning' ? 'learning' : status === 'solid' ? 'mature' : 'young'}`}>
                    {t(`learned.status_${status}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
