import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DeckPicker } from '../components/DeckPicker';
import { NoteForm } from '../components/NoteForm';
import { autofill } from '../lib/autofill';
import { addNotes, EMPTY_FIELDS, listDecks, listNotes, type Deck, type NoteFields } from '../lib/db';
import { parseWordList } from '../lib/parse';
import { useAuth } from '../auth';
import { useI18n } from '../lib/i18n';

const LAST_DECK_KEY = 'lastDeck';

const EXAMPLE = `abandon ; оставлять, бросать ; tərk etmək ; They had to abandon the project.
benefit ; польза, выгода ; fayda
consistent ; последовательный ; ardıcıl`;

export function AddPage() {
  const { student } = useAuth();
  const { t } = useI18n();
  const [params] = useSearchParams();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [existing, setExisting] = useState<Set<string>>(new Set());
  const [deckId, setDeckId] = useState('');
  const [mode, setMode] = useState<'list' | 'single'>('list');
  const [single, setSingle] = useState<NoteFields>(EMPTY_FIELDS);
  const [text, setText] = useState('');
  const [fillEmpty, setFillEmpty] = useState(true);
  const [progress, setProgress] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!student) return;
    void Promise.all([listDecks(student.id), listNotes(student.id)]).then(([d, n]) => {
      setDecks(d);
      setExisting(new Set(n.map((x) => x.word.trim().toLowerCase())));
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(LAST_DECK_KEY);
      } catch {
        // ignore
      }
      const wanted = params.get('deck') ?? stored;
      setDeckId(d.some((x) => x.id === wanted) ? wanted! : '');
    });
  }, [student, params]);

  useEffect(() => {
    if (!deckId) return;
    try {
      localStorage.setItem(LAST_DECK_KEY, deckId);
    } catch {
      // ignore
    }
  }, [deckId]);

  const parsed = useMemo(() => parseWordList(text), [text]);
  const fresh = parsed.filter((n) => !existing.has(n.word.toLowerCase()));
  const dupes = parsed.length - fresh.length;

  async function save(notes: NoteFields[], fill: boolean) {
    if (!deckId) {
      setMessage({ kind: 'error', text: t('add.need_deck') });
      return false;
    }
    setMessage(null);
    try {
      let toSave = notes;
      if (fill) {
        toSave = [];
        for (const [i, n] of notes.entries()) {
          setProgress(t('add.filling', { i: i + 1, n: notes.length }));
          toSave.push(await autofill(n).catch(() => n));
        }
      }
      setProgress(t('add.saving'));
      const count = await addNotes(deckId, toSave);
      setExisting((prev) => new Set([...prev, ...toSave.map((n) => n.word.trim().toLowerCase())]));
      const deckName = decks.find((d) => d.id === deckId)?.name ?? '';
      setMessage({ kind: 'ok', text: t('add.added', { n: count, deck: deckName }) });
      return true;
    } catch (e) {
      setMessage({ kind: 'error', text: e instanceof Error ? e.message : String(e) });
      return false;
    } finally {
      setProgress(null);
    }
  }

  async function submitList(e: FormEvent) {
    e.preventDefault();
    if (fresh.length === 0) return;
    if (await save(fresh, fillEmpty)) setText('');
  }

  async function submitSingle(e: FormEvent) {
    e.preventDefault();
    if (!single.word.trim()) return;
    if (existing.has(single.word.trim().toLowerCase()) && !confirm(t('add.exists_confirm', { word: single.word }))) return;
    // The single-word form has its own autofill button, so save exactly what is shown.
    if (await save([single], false)) setSingle(EMPTY_FIELDS);
  }

  return (
    <div className="stack">
      <h2>{t('add.title')}</h2>
      <div className="card form">
        <DeckPicker decks={decks} value={deckId} onChange={setDeckId} onCreated={(d) => setDecks((x) => [...x, d])} />
      </div>

      <div className="segmented">
        <button className={mode === 'list' ? 'active' : ''} onClick={() => setMode('list')}>
          {t('add.list')}
        </button>
        <button className={mode === 'single' ? 'active' : ''} onClick={() => setMode('single')}>
          {t('add.single')}
        </button>
      </div>

      {mode === 'list' ? (
        <form className="card form" onSubmit={submitList}>
          <label>
            {(() => {
              const [before, after] = t('add.list_help', { format: '\u0000' }).split('\u0000');
              return (
                <>
                  {before}
                  <code>{t('add.list_format')}</code>
                  {after}
                </>
              );
            })()}
            <textarea rows={10} value={text} placeholder={EXAMPLE} onChange={(e) => setText(e.target.value)} />
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={fillEmpty} onChange={(e) => setFillEmpty(e.target.checked)} />
            {t('add.autofill')}
          </label>

          {parsed.length > 0 && (
            <div className="preview">
              <p className="small">
                {t('add.count')} <b>{parsed.length}</b>
                {dupes > 0 && <span className="muted"> · {t('add.dupes', { n: dupes })}</span>}
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t('add.col_word')}</th>
                      <th>{t('add.col_ru')}</th>
                      <th>{t('add.col_az')}</th>
                      <th>{t('add.col_example')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.map((n) => (
                      <tr key={n.word} className={existing.has(n.word.toLowerCase()) ? 'dim' : ''}>
                        <td>{n.word}</td>
                        <td>{n.translation_ru || <span className="muted">{t('add.auto')}</span>}</td>
                        <td>{n.translation_az || <span className="muted">{t('add.auto')}</span>}</td>
                        <td>{n.example || <span className="muted">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {progress && <p className="info">{progress}</p>}
          {message && <p className={message.kind === 'ok' ? 'ok' : 'error'}>{message.text}</p>}
          <button className="btn primary" disabled={fresh.length === 0 || !!progress}>
            {fresh.length > 0 ? t('add.submit_n', { n: fresh.length }) : t('add')}
          </button>
        </form>
      ) : (
        <form className="card form" onSubmit={submitSingle}>
          <NoteForm value={single} onChange={setSingle} />
          {progress && <p className="info">{progress}</p>}
          {message && <p className={message.kind === 'ok' ? 'ok' : 'error'}>{message.text}</p>}
          <button className="btn primary" disabled={!single.word.trim() || !!progress}>
            {t('add.submit_one')}
          </button>
        </form>
      )}
    </div>
  );
}
