import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
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
      <div key={node.deck.id}>
        <div className="deck-row" style={{ paddingLeft: 12 + node.depth * 20 }}>
          <Link className="deck-name" to={`/study/${node.deck.id}`}>
            {node.depth > 0 && <span className="tree-mark">└</span>}
            {node.deck.name}
          </Link>
          <CountCells counts={counts} />
          <button className="icon-btn" onClick={() => setMenu(open ? null : node.deck.id)} aria-label="Меню">
            ⋯
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

  return (
    <div className="stack">
      {viewingOther && <p className="hint">Ты смотришь колоды ученика: {student?.name}</p>}

      <section className="card today">
        <div>
          <div className="big">{summary.newDone}</div>
          <div className="muted small">новых карточек сегодня</div>
        </div>
        <div>
          <div className="big">{summary.reviewsDone}</div>
          <div className="muted small">повторений</div>
        </div>
        <div>
          <div className="big">{formatDuration(summary.timeMs)}</div>
          <div className="muted small">время</div>
        </div>
        <div>
          <div className="big">🔥 {days}</div>
          <div className="muted small">дней подряд</div>
        </div>
      </section>

      <section className="card">
        <div className="deck-head">
          <span>Категория</span>
          <span className="count new">Новые</span>
          <span className="count learn">Учу</span>
          <span className="count due">Повтор</span>
          <span />
        </div>
        {loading && <p className="muted pad">Загрузка…</p>}
        {error && <p className="error pad">{error}</p>}
        {!loading && tree.length === 0 && (
          <p className="muted pad">Пока нет категорий. Создай первую, например «IELTS», а внутри «День 01».</p>
        )}
        {tree.map(renderNode)}
        {tree.length > 0 && (
          <div className="deck-row total">
            <Link className="deck-name" to="/study/all">
              ⭐ Все слова
            </Link>
            <CountCells counts={total} />
            <span />
          </div>
        )}
      </section>

      {actionError && <p className="error">{actionError}</p>}

      <div className="row gap">
        {total.new + total.learn + total.review > 0 && (
          <button className="btn primary" onClick={() => navigate('/study/all')}>
            ▶ Учить всё
          </button>
        )}
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
