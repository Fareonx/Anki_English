import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth';
import { listSentences, type Sentence } from '../lib/db';
import { buildDeckTree, flattenTree, subtreeIds } from '../lib/decks';
import { StudySession } from '../lib/scheduler/queue';
import {
  countLearnedWords,
  countMaturity,
  dailyActivity,
  forecast,
  formatDuration,
  retention,
  streak,
  summarizeToday,
} from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';
import { useI18n } from '../lib/i18n';

const DAYS = 14;

function Tile({ value, label, tone, sub }: { value: string | number; label: string; tone?: 'warn' | 'accent'; sub?: string }) {
  return (
    <div className={`tile ${tone ?? ''}`}>
      <div className="big">{value}</div>
      <div className="muted small">{label}</div>
      {sub && <div className="muted tiny">{sub}</div>}
    </div>
  );
}

export function StatsPage() {
  const { student, config } = useAuth();
  const { t, units, locale } = useI18n();
  const { dayFmt, weekdayFmt, dateTimeFmt } = useMemo(
    () => ({
      dayFmt: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }),
      weekdayFmt: new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }),
      dateTimeFmt: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
    }),
    [locale],
  );
  const { decks, cards, notes, revlog, loading, error } = useStudentData({ notes: true, revlogDays: 30 });
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  useEffect(() => {
    if (student) void listSentences(student.id, 30).then(setSentences).catch(() => setSentences([]));
  }, [student]);

  const now = Date.now();
  const s = useMemo(() => {
    const cardNote = new Map(cards.map((c) => [c.id, c.note_id]));
    const today = summarizeToday(revlog, cardNote, config, now);
    const remaining = new StudySession(cards, today, config, now).counts();
    const activity = dailyActivity(revlog, config, now, DAYS);
    const weekRevlog = revlog.filter((r) => Date.parse(r.reviewed_at) >= now - 7 * 86_400_000);
    return {
      today,
      remaining,
      activity,
      days: streak(revlog, config, now),
      retention30: retention(revlog),
      retention7: retention(weekRevlog),
      forecast: forecast(cards, config, now, 7),
      maturity: countMaturity(cards),
      words: countLearnedWords(cards),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, revlog, config]);

  const deckRows = useMemo(() => {
    return flattenTree(buildDeckTree(decks)).map((node) => {
      const ids = subtreeIds(decks, node.deck.id);
      const subset = cards.filter((c) => ids.has(c.deck_id));
      const m = countMaturity(subset);
      const words = notes.filter((n) => ids.has(n.deck_id)).length;
      const started = subset.length - m.new - m.suspended;
      return { node, words, m, total: subset.length, started };
    });
  }, [decks, cards, notes]);

  const notesById = useMemo(() => new Map(notes.map((n) => [n.id, n])), [notes]);
  const hard = useMemo(
    () =>
      cards
        .filter((c) => c.leech || c.lapses >= 3)
        .sort((a, b) => b.lapses - a.lapses)
        .slice(0, 20),
    [cards],
  );

  if (loading) return <p className="muted">{t('loading')}</p>;
  if (error) return <p className="error">{error}</p>;

  const maxBar = Math.max(1, ...s.activity.map((d) => d.newCards + d.reviews));
  const maxForecast = Math.max(1, ...s.forecast);
  const remainingTotal = s.remaining.new + s.remaining.learn + s.remaining.review;
  const shown = hoverDay === null ? null : s.activity[hoverDay];
  const pct = (r: { rate: number | null }) => (r.rate === null ? '—' : `${Math.round(r.rate * 100)}%`);

  return (
    <div className="stack">
      <h2>{t('stats.title', { name: student?.name ?? '' })}</h2>

      <section className="tiles">
        <Tile
          value={s.words.learned}
          label={t('stats.learned_words')}
          tone="accent"
          sub={t('stats.learned_solid', { solid: s.words.solid, total: notes.length })}
        />
        <Tile value={s.today.newDone} label={t('stats.new_today')} />
        <Tile value={s.today.reviewsDone} label={t('stats.reviews_today')} />
        <Tile value={formatDuration(s.today.timeMs, units)} label={t('stats.time_today')} />
        <Tile
          value={remainingTotal}
          label={remainingTotal ? t('stats.left_today') : t('stats.all_done')}
          tone={remainingTotal ? 'warn' : undefined}
        />
        <Tile value={`🔥 ${s.days}`} label={t('stats.streak')} />
        <Tile value={pct(s.retention7)} label={t('stats.correct7')} />
      </section>

      <section className="card pad">
        <h3>{t('stats.last_days', { n: DAYS })}</h3>
        <div className="legend small">
          <span>
            <i className="swatch new" /> {t('stats.legend_new')}
          </span>
          <span>
            <i className="swatch review" /> {t('stats.legend_reviews')}
          </span>
        </div>
        <p className="chart-readout small" aria-live="polite">
          {shown
            ? t('stats.readout', {
                day: `${weekdayFmt.format(shown.date)}, ${dayFmt.format(shown.date)}`,
                new: shown.newCards,
                reviews: shown.reviews,
                time: formatDuration(shown.timeMs, units),
              })
            : t('stats.readout_hint')}
        </p>
        <div className="bars" onMouseLeave={() => setHoverDay(null)}>
          {s.activity.map((d, i) => (
            <button
              key={d.day}
              type="button"
              className={`bar-col ${hoverDay === i ? 'active' : ''} ${d.answers === 0 ? 'missed' : ''}`}
              onMouseEnter={() => setHoverDay(i)}
              onFocus={() => setHoverDay(i)}
              onClick={() => setHoverDay(i)}
              aria-label={t('stats.readout', {
                day: dayFmt.format(d.date),
                new: d.newCards,
                reviews: d.reviews,
                time: formatDuration(d.timeMs, units),
              })}
            >
              <span className="bar-stack">
                {d.reviews > 0 && <span className="seg review" style={{ height: `${(d.reviews / maxBar) * 100}%` }} />}
                {d.newCards > 0 && <span className="seg new" style={{ height: `${(d.newCards / maxBar) * 100}%` }} />}
              </span>
              <span className="bar-label">{dayFmt.format(d.date).split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <p className="muted small">{t('stats.missed_hint')}</p>
      </section>

      <section className="card pad">
        <h3>{t('stats.forecast')}</h3>
        <div className="forecast">
          {s.forecast.map((n, i) => (
            <div key={i} className="fc-row">
              <span className="fc-day small">{i === 0 ? t('stats.today') : i === 1 ? t('stats.tomorrow') : t('stats.in_days', { n: i })}</span>
              <span className="fc-track">
                <span className="fc-bar" style={{ width: `${(n / maxForecast) * 100}%` }} />
              </span>
              <span className="fc-num small">{n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card pad">
        <h3>{t('stats.progress')}</h3>
        <p className="muted small">
          {t('stats.progress_note', { words: notes.length, mature: s.maturity.mature, pct: pct(s.retention30) })}
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t('category')}</th>
                <th>{t('stats.col_words')}</th>
                <th>{t('stats.col_new')}</th>
                <th>{t('stats.col_learning')}</th>
                <th>{t('stats.col_young')}</th>
                <th>{t('stats.col_mature')}</th>
                <th>{t('stats.col_started')}</th>
              </tr>
            </thead>
            <tbody>
              {deckRows.map(({ node, words, m, total, started }) => (
                <tr key={node.deck.id}>
                  <td style={{ paddingLeft: 8 + node.depth * 16 }}>{node.deck.name}</td>
                  <td>{words}</td>
                  <td>{m.new}</td>
                  <td>{m.learning}</td>
                  <td>{m.young}</td>
                  <td>{m.mature}</td>
                  <td>
                    <span className="progress" title={t('stats.started_of', { a: started, b: total })}>
                      <span style={{ width: `${total ? (started / total) * 100 : 0}%` }} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card pad">
        <h3>{t('stats.hard_words')}</h3>
        {hard.length === 0 ? (
          <p className="muted small">{t('stats.hard_empty')}</p>
        ) : (
          <ul className="plain">
            {hard.map((c) => {
              const n = notesById.get(c.note_id);
              return (
                <li key={c.id}>
                  {c.leech && '🩸 '}
                  <b>{n?.word}</b> — {n?.translation_ru}
                  {n?.translation_az ? ` · ${n.translation_az}` : ''}{' '}
                  <span className="muted small">
                    ({c.template === 0 ? 'EN→RU' : 'RU→EN'}, {t('stats.lapses', { n: c.lapses })})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="card pad">
        <h3>{t('stats.sentences')}</h3>
        {sentences.length === 0 ? (
          <p className="muted small">{t('stats.sentences_empty')}</p>
        ) : (
          <ul className="plain sentences">
            {sentences.map((x) => (
              <li key={x.id}>
                <span className="muted small">
                  {dateTimeFmt.format(new Date(x.created_at))} · <b>{notesById.get(x.note_id)?.word ?? '?'}</b>
                </span>
                <div>{x.text}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
