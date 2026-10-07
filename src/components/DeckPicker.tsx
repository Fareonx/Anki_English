import { useMemo, useState } from 'react';
import { useAuth } from '../auth';
import { createDeck, type Deck } from '../lib/db';
import { buildDeckTree, flattenTree } from '../lib/decks';

/** Chooses a deck, with an inline way to create a new category. */
export function DeckPicker({
  decks,
  value,
  onChange,
  onCreated,
}: {
  decks: Deck[];
  value: string;
  onChange: (id: string) => void;
  onCreated: (deck: Deck) => void;
}) {
  const { student } = useAuth();
  const flat = useMemo(() => flattenTree(buildDeckTree(decks)), [decks]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function create() {
    if (!student || !name.trim()) return;
    setError(null);
    try {
      const deck = await createDeck(student.id, name, parent || null);
      onCreated(deck);
      onChange(deck.id);
      setCreating(false);
      setName('');
    } catch (e) {
      const text = e instanceof Error ? e.message : String(e);
      setError(/duplicate key/i.test(text) ? 'Категория с таким названием уже есть.' : text);
    }
  }

  return (
    <div className="deck-picker">
      <label>
        Категория
        <div className="row gap">
          <select value={value} onChange={(e) => onChange(e.target.value)} required>
            <option value="" disabled>
              — выбери категорию —
            </option>
            {flat.map((n) => (
              <option key={n.deck.id} value={n.deck.id}>
                {n.path}
              </option>
            ))}
          </select>
          <button type="button" className="btn small" onClick={() => setCreating((v) => !v)}>
            📁 Новая
          </button>
        </div>
      </label>
      {creating && (
        <div className="inline-create">
          <input
            autoFocus
            value={name}
            placeholder="Название, например «День 05»"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void create();
              }
            }}
          />
          <select value={parent} onChange={(e) => setParent(e.target.value)} aria-label="Внутри категории">
            <option value="">— верхний уровень —</option>
            {flat.map((n) => (
              <option key={n.deck.id} value={n.deck.id}>
                внутри: {n.path}
              </option>
            ))}
          </select>
          <button type="button" className="btn small primary" onClick={() => void create()}>
            Создать
          </button>
          {error && <p className="error small">{error}</p>}
        </div>
      )}
    </div>
  );
}
