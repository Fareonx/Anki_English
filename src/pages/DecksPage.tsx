import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { MoreIcon, PlayIcon } from '../components/Icons';
import { createDeck, deleteDeck, renameDeck } from '../lib/db';
import { buildDeckTree, flattenTree, subtreeIds, type DeckNode } from '../lib/decks';
import { StudySession, type Counts } from '../lib/scheduler/queue';
import { formatDuration, streak, summarizeToday } from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';

function CountCells({ counts }: { counts: Counts }) {
  return (
    <>
      <span className={`count new ${counts.new ? '' : 'zero'}`}>{counts.new}</span>
      <span className={`count learn ${counts.learn ? '' : 'zero'}`}>{counts.learn}</span>
      <span className={`count due ${counts.review ? '' : 'zero'}`}>{counts.review}</span>
    </>
  );
}

export function DecksPage() {
  const { student, config, isAdmin, profile } = useAuth();
  const { decks, cards, revlog, loading, error, reload } = useStudentData({ revlogDays: 60 });
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newParent, setNewParent] = useState('');
  const [menu, setMenu] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const now = Date.now();
  const tree = useMemo(() => buildDeckTree(decks), [decks]);
  const flat = useMemo(() => flattenTree(tree), [tree]);

  const { summary, countsByDeck, total } = useMemo(() => {
    const cardNote = new Map(cards.map((c) => [c.id, c.note_id]));
    const summary = summarizeToday(revlog, cardNote, config, now);
    const countsByDeck = new Map<string, Counts>();
    for (const node of flat) {
      const ids = subtreeIds(decks, node.deck.id);
      const subset = cards.filter((c) => ids.has(c.deck_id));
      countsByDeck.set(node.deck.id, new StudySession(subset, summary, config, now).counts());
    }
    const total = new StudySession(cards, summary, config, now).counts();
    return { summary, countsByDeck, total };
    // `now` is intentionally sampled per render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, revlog, decks, flat, config]);

  const days = useMemo(() => streak(revlog, config, now), [revlog, config, now]);
  const viewingOther = isAdmin && student && student.id !== profile?.id;

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setActionError(null);
    try {
      await action();
      await reload();
    } catch (e) {
      const text = e instanceof Error ? e.message : String(e);
      setActionError(/duplicate key/i.test(text) ? 'Категория с таким названием уже есть.' : text);
    } finally {
      setBusy(false);
    }
  }

  async function submitCreate(e: FormEvent) {
    e.preventDefault();
    if (!student || !newName.trim()) return;
    await run(() => createDeck(student.id, newName, newParent || null));
    setNewName('');
    setShowCreate(false);
  }

  function renderNode(node: DeckNode) {
    const counts = countsByDeck.get(node.deck.id) ?? { new: 0, learn: 0, review: 0 };
    const open = menu === node.deck.id;
    return (
      <div key={node.deck.id} className={node.depth === 0 ? 'deck-group' : undefined}>
        <div className={`deck-row depth-${Math.min(node.depth, 2)}`}>
          <Link className="deck-name" to={`/study/${node.deck.id}`}>
            {node.deck.name}
          </Link>
          <CountCells counts={counts} />
          <button
            className="icon-btn"
            onClick={() => setMenu(open ? null : node.deck.id)}
            aria-label="Меню категории"
            aria-expanded={open}
          >
            <MoreIcon />
          </button>
        </div>
        {open && (
          <div className="deck-menu">
            <Link to={`/deck/${node.deck.id}`}>📋 Слова</Link>
            <Link to={`/add?deck=${node.deck.id}`}>➕ Добавить слова</Link>
            <button
              onClick={() => {
                setNewParent(node.deck.id);
                setShowCreate(true);
                setMenu(null);
              }}
            >
              📁 Подкатегория
            </button>
            <button
              disabled={busy}
              onClick={() => {
                const name = prompt('Новое название', node.deck.name);
                if (name && name.trim()) void run(() => renameDeck(node.deck.id, name));
                setMenu(null);
              }}
            >
              ✏️ Переименовать
            </button>
            <button
              className="danger"
              disabled={busy}
              onClick={() => {
                if (confirm(`Удалить «${node.path}» вместе со всеми словами и прогрессом?`)) {
                  void run(() => deleteDeck(node.deck.id));
                }
                setMenu(null);
              }}
            >
              🗑 Удалить
            </button>
          </div>
        )}
        {node.children.map(renderNode)}
      </div>
    );
  }

  const dueToday = total.new + total.learn + total.review;

  return (
    <div className="stack">
      {viewingOther && <p className="hint">Ты смотришь колоды ученика: {student?.name}</p>}

      <section className="card hero">
        <div className="hero-head">
          <div>
            <div className="eyebrow">Сегодня</div>
            <div className="hero-title">
              {loading ? '…' : dueToday > 0 ? `${dueToday} карточек` : 'Всё сделано 🎉'}
            </div>
          </div>
          <div className="streak" title="Дней подряд">
            🔥 <b>{days}</b>
          </div>
        </div>
        <div className="pills">
          <span className="pill new">
            <b>{total.new}</b> новых
          </span>
          <span className="pill learn">
            <b>{total.learn}</b> учу
          </span>
          <span className="pill due">
            <b>{total.review}</b> повтор
          </span>
        </div>
        {dueToday > 0 && (
          <button className="btn primary wide big-btn" onClick={() => navigate('/study/all')}>
            <PlayIcon /> Учить
          </button>
        )}
        <div className="hero-stats">
          <span className="muted">Сделано:</span>
          <span>
            <b>{summary.newDone}</b> новых
          </span>
          <span>
            <b>{summary.reviewsDone}</b> повторений
          </span>
          <span>
            <b>{formatDuration(summary.timeMs)}</b>
          </span>
        </div>
      </section>

      <section className="card decks">
        <div className="deck-head">
          <span>Категории</span>
          <span className="count new">Нов.</span>
          <span className="count learn">Учу</span>
          <span className="count due">Повт.</span>
          <span />
        </div>
        {loading && <p className="muted pad">Загрузка…</p>}
        {error && <p className="error pad">{error}</p>}
        {!loading && tree.length === 0 && (
          <p className="muted pad">Пока нет категорий. Создай первую, например «IELTS», а внутри «День 01».</p>
        )}
        {tree.map(renderNode)}
      </section>

      {actionError && <p className="error">{actionError}</p>}

      <div className="row gap wrap">
        <button className="btn" onClick={() => setShowCreate((v) => !v)}>
          📁 Новая категория
        </button>
        <Link className="btn" to="/add">
          ➕ Добавить слова
        </Link>
      </div>

      {showCreate && (
        <form className="card form" onSubmit={submitCreate}>
          <h3>Новая категория</h3>
          <label>
            Название
            <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="День 01" required />
          </label>
          <label>
            Внутри категории
            <select value={newParent} onChange={(e) => setNewParent(e.target.value)}>
              <option value="">— верхний уровень —</option>
              {flat.map((n) => (
                <option key={n.deck.id} value={n.deck.id}>
                  {n.path}
                </option>
              ))}
            </select>
          </label>
          <div className="row gap">
            <button className="btn primary" disabled={busy}>
              Создать
            </button>
            <button type="button" className="btn" onClick={() => setShowCreate(false)}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
