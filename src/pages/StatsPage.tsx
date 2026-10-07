import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth';
import { listSentences, type Sentence } from '../lib/db';
import { buildDeckTree, flattenTree, subtreeIds } from '../lib/decks';
import { StudySession } from '../lib/scheduler/queue';
import {
  countMaturity,
  dailyActivity,
  forecast,
  formatDuration,
  retention,
  streak,
  summarizeToday,
} from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';

const DAYS = 14;
const dayFmt = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const weekdayFmt = new Intl.DateTimeFormat('ru', { weekday: 'short', timeZone: 'UTC' });
const dateTimeFmt = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function Tile({ value, label, tone }: { value: string | number; label: string; tone?: 'warn' }) {
  return (
    <div className={`tile ${tone ?? ''}`}>
      <div className="big">{value}</div>
      <div className="muted small">{label}</div>
    </div>
  );
}

export function StatsPage() {
  const { student, config } = useAuth();
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

  if (loading) return <p className="muted">Загрузка…</p>;
  if (error) return <p className="error">{error}</p>;

  const maxBar = Math.max(1, ...s.activity.map((d) => d.newCards + d.reviews));
  const maxForecast = Math.max(1, ...s.forecast);
  const remainingTotal = s.remaining.new + s.remaining.learn + s.remaining.review;
  const shown = hoverDay === null ? null : s.activity[hoverDay];
  const pct = (r: { rate: number | null }) => (r.rate === null ? '—' : `${Math.round(r.rate * 100)}%`);

  return (
    <div className="stack">
      <h2>Статистика: {student?.name}</h2>

      <section className="tiles">
        <Tile value={s.today.newDone} label="новых карточек сегодня" />
        <Tile value={s.today.reviewsDone} label="повторений сегодня" />
        <Tile value={formatDuration(s.today.timeMs)} label="время сегодня" />
        <Tile
          value={remainingTotal}
          label={remainingTotal ? 'осталось на сегодня' : 'на сегодня всё ✓'}
          tone={remainingTotal ? 'warn' : undefined}
        />
        <Tile value={`🔥 ${s.days}`} label="дней подряд" />
        <Tile value={pct(s.retention7)} label="верных ответов (7 дн.)" />
      </section>

      <section className="card pad">
        <h3>Последние {DAYS} дней</h3>
        <div className="legend small">
          <span>
            <i className="swatch new" /> новые
          </span>
          <span>
            <i className="swatch review" /> повторения
          </span>
        </div>
        <p className="chart-readout small" aria-live="polite">
          {shown
            ? `${weekdayFmt.format(shown.date)}, ${dayFmt.format(shown.date)}: ${shown.newCards} новых, ${shown.reviews} повторений, ${formatDuration(shown.timeMs)}`
            : 'Наведи или нажми на столбик'}
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
              aria-label={`${dayFmt.format(d.date)}: ${d.newCards} новых, ${d.reviews} повторений`}
            >
              <span className="bar-stack">
                {d.reviews > 0 && <span className="seg review" style={{ height: `${(d.reviews / maxBar) * 100}%` }} />}
                {d.newCards > 0 && <span className="seg new" style={{ height: `${(d.newCards / maxBar) * 100}%` }} />}
              </span>
              <span className="bar-label">{dayFmt.format(d.date).split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <p className="muted small">Пустые дни с пунктирной рамкой означают, что в этот день занятий не было.</p>
      </section>

      <section className="card pad">
        <h3>Прогноз повторений на 7 дней</h3>
        <div className="forecast">
          {s.forecast.map((n, i) => (
            <div key={i} className="fc-row">
              <span className="fc-day small">{i === 0 ? 'сегодня' : i === 1 ? 'завтра' : `+${i} д`}</span>
              <span className="fc-track">
                <span className="fc-bar" style={{ width: `${(n / maxForecast) * 100}%` }} />
              </span>
              <span className="fc-num small">{n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card pad">
        <h3>Прогресс по категориям</h3>
        <p className="muted small">
          Всего слов: {notes.length} · карточек выучено (интервал ≥ 21 д): {s.maturity.mature} · верных ответов за 30
          дней: {pct(s.retention30)}. Колонки «Новые», «Учит», «Повтор» и «Выучено» считают карточки: у каждого
          слова их две.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Категория</th>
                <th>Слов</th>
                <th>Новые</th>
                <th>Учит</th>
                <th>Повтор</th>
                <th>Выучено</th>
                <th>Начато</th>
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
                    <span className="progress" title={`${started} из ${total} карточек`}>
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
        <h3>Трудные слова</h3>
        {hard.length === 0 ? (
          <p className="muted small">Пока нет слов, которые забываются три раза и чаще.</p>
        ) : (
          <ul className="plain">
            {hard.map((c) => {
              const n = notesById.get(c.note_id);
              return (
                <li key={c.id}>
                  {c.leech && '🩸 '}
                  <b>{n?.word}</b> — {n?.translation_ru}{' '}
                  <span className="muted small">
                    ({c.template === 0 ? 'EN→RU' : 'RU→EN'}, забываний: {c.lapses})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="card pad">
        <h3>Предложения ученика</h3>
        {sentences.length === 0 ? (
          <p className="muted small">Пока нет предложений.</p>
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
