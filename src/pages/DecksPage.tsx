import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { MoreIcon, PlayIcon } from '../components/Icons';
import { createDeck, deleteDeck, renameDeck } from '../lib/db';
import { buildDeckTree, flattenTree, isFinishedLeaf, subtreeIds, type DeckNode } from '../lib/decks';
import { countFreshToday, StudySession, type Counts } from '../lib/scheduler/queue';
import { formatDuration, streak, summarizeToday, todayStartIso } from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';
import { useI18n } from '../lib/i18n';

function CountCells({ counts }: { counts: Counts }) {
  return (
    <>
      <span className={`count new ${counts.new ? '' : 'zero'}`}>{counts.new}</span>
      <span className={`count learn ${counts.learn ? '' : 'zero'}`}>{counts.learn}</span>
      <span className={`count due ${counts.review ? '' : 'zero'}`}>{counts.review}</span>
    </>
  );
}

const SHOW_DONE_KEY = 'showFinishedDecks';

export function DecksPage() {
  const { student, config, isAdmin, profile } = useAuth();
  const { t, units } = useI18n();
  const { decks, cards, revlog, loading, error, reload } = useStudentData({ revlogDays: 60 });
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newParent, setNewParent] = useState('');
  const [menu, setMenu] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(() => {
    try {
      return localStorage.getItem(SHOW_DONE_KEY) === '1';
    } catch {
      return false;
    }
  });

  function toggleShowDone() {
    setShowDone((v) => {
      try {
        localStorage.setItem(SHOW_DONE_KEY, v ? '0' : '1');
      } catch {
        // ignore
      }
      return !v;
    });
  }

  const now = Date.now();
  const tree = useMemo(() => buildDeckTree(decks), [decks]);
  const flat = useMemo(() => flattenTree(tree), [tree]);

  const { summary, countsByDeck, total, finished } = useMemo(() => {
    const cardNote = new Map(cards.map((c) => [c.id, c.note_id]));
    const summaryRaw = summarizeToday(revlog, cardNote, config, now);
    // The daily limit counts words started today in all decks, not only the opened one.
    const summary = { ...summaryRaw, freshWordsToday: countFreshToday(cards, summaryRaw) };
    const todayStart = Date.parse(todayStartIso(config, now));
    const countsByDeck = new Map<string, Counts>();
    const finished = new Set<string>();
    for (const node of flat) {
      const ids = subtreeIds(decks, node.deck.id);
      const subset = cards.filter((c) => ids.has(c.deck_id));
      const counts = new StudySession(subset, summary, config, now).counts();
      countsByDeck.set(node.deck.id, counts);
      if (isFinishedLeaf(node, subset, todayStart)) finished.add(node.deck.id);
    }
    const total = new StudySession(cards, summary, config, now).counts();
    return { summary, countsByDeck, total, finished };
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
      setActionError(/duplicate key/i.test(text) ? t('decks.duplicate') : text);
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
    if (!(isAdmin && showDone) && finished.has(node.deck.id)) return null;
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
            aria-label={t('decks.menu')}
            aria-expanded={open}
          >
            <MoreIcon />
          </button>
        </div>
        {open && (
          <div className="deck-menu">
            <Link to={`/deck/${node.deck.id}`}>{t('decks.menu_words')}</Link>
            <Link to={`/add?deck=${node.deck.id}`}>{t('decks.add_words')}</Link>
            <button
              onClick={() => {
                setNewParent(node.deck.id);
                setShowCreate(true);
                setMenu(null);
              }}
            >
              {t('decks.menu_sub')}
            </button>
            <button
              disabled={busy}
              onClick={() => {
                const name = prompt(t('decks.rename_prompt'), node.deck.name);
                if (name && name.trim()) void run(() => renameDeck(node.deck.id, name));
                setMenu(null);
              }}
            >
              {t('decks.menu_rename')}
            </button>
            <button
              className="danger"
              disabled={busy}
              onClick={() => {
                if (confirm(t('decks.delete_confirm', { name: node.path }))) {
                  void run(() => deleteDeck(node.deck.id));
                }
                setMenu(null);
              }}
            >
              {t('decks.menu_delete')}
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
      {viewingOther && <p className="hint">{t('decks.viewing_student', { name: student?.name ?? '' })}</p>}

      <section className="card hero">
        <div className="hero-head">
          <div>
            <div className="eyebrow">{t('decks.today')}</div>
            <div className="hero-title">
              {loading ? '…' : dueToday > 0 ? t('decks.cards', { n: dueToday }) : t('decks.all_done')}
            </div>
          </div>
          <div className="streak" title={t('decks.streak')}>
            🔥 <b>{days}</b>
          </div>
        </div>
        <div className="pills">
          <span className="pill new">
            <b>{total.new}</b> {t('decks.pill_new')}
          </span>
          <span className="pill learn">
            <b>{total.learn}</b> {t('decks.pill_learn')}
          </span>
          <span className="pill due">
            <b>{total.review}</b> {t('decks.pill_due')}
          </span>
        </div>
        {dueToday > 0 && (
          <button className="btn primary wide big-btn" onClick={() => navigate('/study/all')}>
            <PlayIcon /> {t('decks.study')}
          </button>
        )}
        <div className="hero-stats">
          <span className="muted">{t('decks.done')}</span>
          <span>
            <b>{summary.newDone}</b> {t('decks.done_new')}
          </span>
          <span>
            <b>{summary.reviewsDone}</b> {t('decks.done_reviews')}
          </span>
          <span>
            <b>{formatDuration(summary.timeMs, units)}</b>
          </span>
        </div>
      </section>

      <section className="card decks">
        <div className="deck-head">
          <span>{t('decks.categories')}</span>
          <span className="count new">{t('decks.col_new')}</span>
          <span className="count learn">{t('decks.col_learn')}</span>
          <span className="count due">{t('decks.col_due')}</span>
          <span />
        </div>
        {loading && <p className="muted pad">{t('loading')}</p>}
        {error && <p className="error pad">{error}</p>}
        {!loading && tree.length === 0 && (
          <p className="muted pad">{t('decks.empty')}</p>
        )}
        {tree.map(renderNode)}
        {isAdmin && finished.size > 0 && (
          <button className="link-btn show-done" onClick={toggleShowDone}>
            {showDone ? t('decks.hide_done') : t('decks.show_done', { n: finished.size })}
          </button>
        )}
      </section>

      {actionError && <p className="error">{actionError}</p>}

      <div className="row gap wrap">
        <button className="btn" onClick={() => setShowCreate((v) => !v)}>
          {t('decks.new_category')}
        </button>
        <Link className="btn" to="/add">
          {t('decks.add_words')}
        </Link>
      </div>

      {showCreate && (
        <form className="card form" onSubmit={submitCreate}>
          <h3>{t('decks.new_category')}</h3>
          <label>
            {t('decks.name')}
            <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t('decks.name_placeholder')} required />
          </label>
          <label>
            {t('decks.inside')}
            <select value={newParent} onChange={(e) => setNewParent(e.target.value)}>
              <option value="">{t('decks.top_level')}</option>
              {flat.map((n) => (
                <option key={n.deck.id} value={n.deck.id}>
                  {n.path}
                </option>
              ))}
            </select>
          </label>
          <div className="row gap">
            <button className="btn primary" disabled={busy}>
              {t('create')}
            </button>
            <button type="button" className="btn" onClick={() => setShowCreate(false)}>
              {t('cancel')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
