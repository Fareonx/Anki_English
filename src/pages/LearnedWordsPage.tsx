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

/** Every word the student has learned (the "Изучено слов" tile on the stats page). */
export function LearnedWordsPage() {
  const { cards, notes, loading, error } = useStudentData({ notes: true, revlogDays: 0 });
  const { t, locale } = useI18n();
  const { studyLang } = useAuth();
  const [query, setQuery] = useState('');
  const [solidOnly, setSolidOnly] = useState(false);

  const learned = useMemo(() => {
    const byNote = learnedNotes(cards);
    return notes
      .filter((n) => byNote.has(n.id))
      .map((n) => ({ note: n, solid: byNote.get(n.id)!.solid }))
      .sort((a, b) =>
        sortKey(a.note.word, studyLang).localeCompare(sortKey(b.note.word, studyLang), studyLang, {
          sensitivity: 'base',
        }),
      );
  }, [cards, notes, studyLang]);

  if (loading) return <p className="muted">{t('loading')}</p>;
  if (error) return <p className="error">{error}</p>;

  const q = query.trim().toLowerCase();
  const visible = learned.filter(
    ({ note: n, solid }) =>
      (!solidOnly || solid) &&
      (!q || [n.word, n.translation_ru, n.translation_az].some((f) => f.toLowerCase().includes(q))),
  );
  const solidCount = learned.filter((x) => x.solid).length;

  return (
    <div className="stack">
      <div className="row gap wrap">
        <Link to="/stats" className="muted">
          ← {t('nav.stats')}
        </Link>
        <h2 className="grow">{t('learned.title', { n: learned.length.toLocaleString(locale) })}</h2>
      </div>
      <p className="muted small">{t('learned.hint')}</p>

      {learned.length === 0 ? (
        <p className="muted">{t('learned.empty')}</p>
      ) : (
        <>
          <div className="segmented">
            <button className={solidOnly ? '' : 'active'} onClick={() => setSolidOnly(false)}>
              {t('learned.all')} · {learned.length}
            </button>
            <button className={solidOnly ? 'active' : ''} onClick={() => setSolidOnly(true)}>
              {t('learned.solid')} · {solidCount}
            </button>
          </div>
          <input
            type="search"
            placeholder={t('browse.search', { n: visible.length })}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {visible.length === 0 && <p className="muted">{t('browse.empty')}</p>}
          <div className="word-list">
            {visible.map(({ note: n, solid }) => (
              <div key={n.id} className="card word-item">
                <div className="word-line">
                  <div className="grow">
                    <b>{n.word}</b> {n.ipa && <span className="muted small">{n.ipa}</span>}
                    <div className="small">
                      {n.translation_ru}
                      {n.translation_az && <span className="muted"> · {n.translation_az}</span>}
                    </div>
                  </div>
                  {solid && <span className="status mature">{t('learned.solid_badge')}</span>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
