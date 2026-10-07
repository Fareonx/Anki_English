import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NoteForm } from '../components/NoteForm';
import { deleteNote, setSuspended, updateNote, type CardRow, type Note, type NoteFields } from '../lib/db';
import { buildDeckTree, deckPath, flattenTree, subtreeIds } from '../lib/decks';
import { maturity } from '../lib/stats';
import { useStudentData } from '../lib/useStudentData';
import { useI18n, type Key } from '../lib/i18n';

const MATURITY_LABEL = {
  new: 'status.new',
  learning: 'status.learning',
  young: 'status.young',
  mature: 'status.mature',
  suspended: 'status.suspended',
} as const satisfies Record<string, Key>;

function CardStatus({ card, label }: { card?: CardRow; label: string }) {
  const { t, units } = useI18n();
  if (!card) return null;
  const m = maturity(card);
  return (
    <span className={`status ${m}`} title={card.lapses ? t('browse.lapses', { n: card.lapses }) : undefined}>
      {label}: {t(MATURITY_LABEL[m])}
      {(m === 'young' || m === 'mature') && ` · ${card.ivl} ${units.day}`}
      {card.leech && ' · 🩸'}
    </span>
  );
}

export function BrowsePage() {
  const { deckId = '' } = useParams();
  const { decks, cards, notes, loading, error, reload } = useStudentData({ notes: true, revlogDays: 0 });
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<NoteFields & { deck_id: string }>({} as NoteFields & { deck_id: string });
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const flat = useMemo(() => flattenTree(buildDeckTree(decks)), [decks]);
  const ids = useMemo(() => subtreeIds(decks, deckId), [decks, deckId]);
  const cardsByNote = useMemo(() => {
    const map = new Map<string, CardRow[]>();
    for (const c of cards) map.set(c.note_id, [...(map.get(c.note_id) ?? []), c]);
    return map;
  }, [cards]);

  const q = query.trim().toLowerCase();
  const visible = notes.filter(
    (n) =>
      ids.has(n.deck_id) &&
      (!q || [n.word, n.translation_ru, n.translation_az].some((f) => f.toLowerCase().includes(q))),
  );

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setActionError(null);
    try {
      await action();
      await reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function startEdit(n: Note) {
    setEditing(n.id);
    setDraft({
      word: n.word,
      ipa: n.ipa,
      pos: n.pos,
      translation_ru: n.translation_ru,
      translation_az: n.translation_az,
      definition: n.definition,
      example: n.example,
      synonyms: n.synonyms,
      deck_id: n.deck_id,
    });
  }

  if (loading) return <p className="muted">{t('loading')}</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="stack">
      <div className="row gap wrap">
        <Link to="/" className="muted">
          ← {t('nav.decks')}
        </Link>
        <h2 className="grow">{deckPath(decks, deckId) || t('category')}</h2>
        <Link className="btn small" to={`/add?deck=${deckId}`}>
          ➕ {t('add')}
        </Link>
      </div>

      <input
        type="search"
        placeholder={t('browse.search', { n: visible.length })}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {actionError && <p className="error">{actionError}</p>}

      {visible.length === 0 && <p className="muted">{t('browse.empty')}</p>}

      <div className="word-list">
        {visible.map((n) => {
          const noteCards = cardsByNote.get(n.id) ?? [];
          const forward = noteCards.find((c) => c.template === 0);
          const reverse = noteCards.find((c) => c.template === 1);
          const suspended = noteCards.length > 0 && noteCards.every((c) => c.queue === -1);
          return (
            <div key={n.id} className="card word-item">
              <div className="word-line">
                <div className="grow">
                  <b>{n.word}</b> {n.ipa && <span className="muted small">{n.ipa}</span>}
                  <div className="small">
                    {n.translation_ru}
                    {n.translation_az && <span className="muted"> · {n.translation_az}</span>}
                  </div>
                  <div className="statuses">
                    <CardStatus card={forward} label="EN→RU" />
                    <CardStatus card={reverse} label="RU→EN" />
                  </div>
                </div>
                <div className="word-actions">
                  <button className="btn small" onClick={() => (editing === n.id ? setEditing(null) : startEdit(n))}>
                    ✏️
                  </button>
                  <button
                    className="btn small"
                    disabled={busy}
                    title={suspended ? t('browse.resume') : t('browse.suspend')}
                    aria-label={suspended ? t('browse.resume') : t('browse.suspend')}
                    onClick={() => void run(() => setSuspended(noteCards, !suspended))}
                  >
                    {suspended ? '▶' : '⏸'}
                  </button>
                  <button
                    className="btn small danger"
                    disabled={busy}
                    onClick={() => {
                      if (confirm(t('browse.delete_confirm', { word: n.word }))) void run(() => deleteNote(n.id));
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
              {editing === n.id && (
                <form
                  className="form edit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void run(async () => {
                      await updateNote(n.id, draft);
                      setEditing(null);
                    });
                  }}
                >
                  <NoteForm value={draft} onChange={(v) => setDraft({ ...draft, ...v })} />
                  <label>
                    {t('category')}
                    <select value={draft.deck_id} onChange={(e) => setDraft({ ...draft, deck_id: e.target.value })}>
                      {flat.map((d) => (
                        <option key={d.deck.id} value={d.deck.id}>
                          {d.path}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="row gap">
                    <button className="btn primary small" disabled={busy}>
                      {t('save')}
                    </button>
                    <button type="button" className="btn small" onClick={() => setEditing(null)}>
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
