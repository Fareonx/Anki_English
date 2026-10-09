import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DeckPicker } from '../components/DeckPicker';
import { NoteForm } from '../components/NoteForm';
import { autofill, lookupDictionary } from '../lib/autofill';
import { addNotes, createDeck, EMPTY_FIELDS, listDecks, listNotes, type Deck, type Note, type NoteFields } from '../lib/db';
import { findLastDay, planLastDay } from '../lib/days';
import { parseWordList, splitQuickWords } from '../lib/parse';
import { formatMeanings, lookup, similarWords, translate, type Lookup } from '../lib/translate';
import { useAuth } from '../auth';
import { useI18n } from '../lib/i18n';

const LAST_DECK_KEY = 'lastDeck';
const QUICK_PARALLEL = 5;

const EXAMPLE = `abandon ; оставлять, бросать ; tərk etmək ; They had to abandon the project.
benefit ; польза, выгода ; fayda
consistent ; последовательный ; ardıcıl`;

/** One word in the quick-add list. */
interface QuickItem {
  key: number;
  note: NoteFields;
  /** loading: translating; ok: ready; unknown: no such word, suggestions shown. */
  status: 'loading' | 'ok' | 'unknown';
  suggestions: string[];
  /** Transcription and example are still loading in the background. */
  details: boolean;
}

/** Runs `fn` over `items`, at most `limit` at a time. */
async function inParallel<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) await fn(items[next++]);
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

export function AddPage() {
  const { student, config } = useAuth();
  const { t } = useI18n();
  const [params] = useSearchParams();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [deckId, setDeckId] = useState('');
  const [toLastDay, setToLastDay] = useState(false);
  const [mode, setMode] = useState<'quick' | 'list' | 'single'>('quick');
  const [quickText, setQuickText] = useState('');
  const [quick, setQuick] = useState<QuickItem[]>([]);
  const [splitting, setSplitting] = useState(false);
  const nextKey = useRef(1);
  const [single, setSingle] = useState<NoteFields>(EMPTY_FIELDS);
  const [text, setText] = useState('');
  const [fillEmpty, setFillEmpty] = useState(true);
  const [progress, setProgress] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const existing = useMemo(() => new Set(notes.map((x) => x.word.trim().toLowerCase())), [notes]);
  const lastDay = useMemo(() => {
    const words = new Map<string, number>();
    for (const n of notes) words.set(n.deck_id, (words.get(n.deck_id) ?? 0) + 1);
    return findLastDay(decks, words);
  }, [decks, notes]);
  const capacity = config.newPerDay;

  async function reloadData() {
    if (!student) return;
    const [d, n] = await Promise.all([listDecks(student.id), listNotes(student.id)]);
    setDecks(d);
    setNotes(n);
    return d;
  }

  useEffect(() => {
    if (!student) return;
    void reloadData().then((d) => {
      if (!d) return;
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(LAST_DECK_KEY);
      } catch {
        // ignore
      }
      const wanted = params.get('deck') ?? stored;
      setDeckId(d.some((x) => x.id === wanted) ? wanted! : '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /** Saves into the chosen category, or spreads the words over the last days. */
  async function save(toAdd: NoteFields[], fill: boolean) {
    if (!student) return false;
    if (!toLastDay && !deckId) {
      setMessage({ kind: 'error', text: t('add.need_deck') });
      return false;
    }
    setMessage(null);
    try {
      let toSave = toAdd;
      if (fill) {
        toSave = [];
        for (const [i, n] of toAdd.entries()) {
          setProgress(t('add.filling', { i: i + 1, n: toAdd.length }));
          toSave.push(await autofill(n).catch(() => n));
        }
      }
      setProgress(t('add.saving'));
      if (toLastDay && lastDay) {
        const plan = planLastDay(lastDay, toSave.length, capacity);
        let offset = 0;
        for (const chunk of plan) {
          const target = chunk.deckId ?? (await createDeck(student.id, chunk.name, lastDay.deck.parent_id)).id;
          await addNotes(target, toSave.slice(offset, offset + chunk.count));
          offset += chunk.count;
        }
        const days = plan.map((c) => `${c.name.split(' · ')[0]} (${c.total}/${capacity})`).join(', ');
        setMessage({ kind: 'ok', text: t('add.added_days', { n: toSave.length, days }) });
      } else {
        const count = await addNotes(deckId, toSave);
        const deckName = decks.find((d) => d.id === deckId)?.name ?? '';
        setMessage({ kind: 'ok', text: t('add.added', { n: count, deck: deckName }) });
      }
      await reloadData();
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

  function patchQuick(key: number, patch: Partial<QuickItem>) {
    setQuick((prev) => prev.map((q) => (q.key === key ? { ...q, ...patch } : q)));
  }

  function editQuick(key: number, fields: Partial<NoteFields>) {
    setQuick((prev) => prev.map((q) => (q.key === key ? { ...q, note: { ...q.note, ...fields } } : q)));
  }

  /** Transcription, part of speech and example arrive later; they never block adding. */
  function loadDetails(key: number, word: string) {
    patchQuick(key, { details: true });
    void lookupDictionary(word)
      .catch(() => ({}) as Partial<NoteFields>)
      .then((dict) => {
        setQuick((prev) =>
          prev.map((q) => {
            if (q.key !== key || q.note.word !== word) return q;
            const note = { ...q.note };
            for (const [k, v] of Object.entries(dict) as [keyof NoteFields, string][]) {
              if (!note[k] && v) note[k] = v;
            }
            return { ...q, note, details: false };
          }),
        );
      });
  }

  /** Translates one word; an unknown word gets spelling suggestions instead. */
  async function processQuick(key: number, word: string) {
    const [ru, az] = await Promise.all([
      lookup(word, 'ru').catch(() => null as Lookup | null),
      lookup(word, 'az').catch(() => null as Lookup | null),
    ]);
    const translations = {
      translation_ru: ru ? formatMeanings(word, ru) : await translate(word, 'ru'),
      translation_az: az ? formatMeanings(word, az) : await translate(word, 'az'),
    };
    const unknown = ru !== null && (!ru.known || !!ru.suggestion);
    if (!unknown) {
      setQuick((prev) =>
        prev.map((q) => (q.key === key ? { ...q, status: 'ok', note: { ...q.note, word, ...translations } } : q)),
      );
      loadDetails(key, word);
      return;
    }
    const similar = await similarWords(word).catch(() => [] as string[]);
    const suggestions = [...new Set([ru?.suggestion, ...similar].filter((w): w is string => !!w))]
      .filter((w) => w.toLowerCase() !== word.toLowerCase())
      .slice(0, 4);
    setQuick((prev) =>
      prev.map((q) =>
        q.key === key ? { ...q, status: 'unknown', suggestions, note: { ...q.note, word, ...translations } } : q,
      ),
    );
  }

  async function translateQuick(e: FormEvent) {
    e.preventDefault();
    if (!quickText.trim()) return;
    setMessage(null);
    setSplitting(true);
    const words = await splitQuickWords(quickText, async (chunk) => (await lookup(chunk, 'ru')).known).finally(() =>
      setSplitting(false),
    );
    const fresh = words.filter((w) => !quick.some((q) => q.note.word.toLowerCase() === w.toLowerCase()));
    if (fresh.length === 0) return;
    const items: QuickItem[] = fresh.map((word) => ({
      key: nextKey.current++,
      note: { ...EMPTY_FIELDS, word },
      status: 'loading',
      suggestions: [],
      details: false,
    }));
    setQuick((prev) => [...prev, ...items]);
    setQuickText('');
    await inParallel(items, QUICK_PARALLEL, (item) => processQuick(item.key, item.note.word));
  }

  function chooseSuggestion(key: number, word: string) {
    setQuick((prev) =>
      prev.map((q) =>
        q.key === key ? { ...q, status: 'loading', suggestions: [], note: { ...EMPTY_FIELDS, word } } : q,
      ),
    );
    void processQuick(key, word);
  }

  function keepAsIs(key: number) {
    const item = quick.find((q) => q.key === key);
    patchQuick(key, { status: 'ok', suggestions: [] });
    if (item) loadDetails(key, item.note.word);
  }

  const quickReady = quick.filter((q) => q.status === 'ok' && !existing.has(q.note.word.trim().toLowerCase()));

  async function submitQuick() {
    if (quickReady.length === 0) return;
    const keys = new Set(quickReady.map((q) => q.key));
    if (await save(quickReady.map((q) => q.note), false)) setQuick((prev) => prev.filter((q) => !keys.has(q.key)));
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
        <div className={toLastDay ? 'picker-off' : undefined}>
          <DeckPicker decks={decks} value={deckId} onChange={setDeckId} onCreated={(d) => setDecks((x) => [...x, d])} />
        </div>
        {lastDay && (
          <button
            type="button"
            className={`btn last-day${toLastDay ? ' active' : ''}`}
            aria-pressed={toLastDay}
            onClick={() => setToLastDay((v) => !v)}
          >
            📅 {t('add.to_last_day')} · {lastDay.deck.name.split(' · ')[0]} ({lastDay.words}/{capacity})
          </button>
        )}
        {toLastDay && lastDay && <p className="muted small">{t('add.to_last_day_hint', { n: capacity })}</p>}
      </div>

      <div className="segmented">
        <button className={mode === 'quick' ? 'active' : ''} onClick={() => setMode('quick')}>
          {t('add.quick')}
        </button>
        <button className={mode === 'list' ? 'active' : ''} onClick={() => setMode('list')}>
          {t('add.list')}
        </button>
        <button className={mode === 'single' ? 'active' : ''} onClick={() => setMode('single')}>
          {t('add.single')}
        </button>
      </div>

      {mode === 'quick' && (
        <div className="card form">
          <form className="quick-input" onSubmit={translateQuick}>
            <label>
              {t('add.quick_help')}
              <textarea
                rows={3}
                value={quickText}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder={'abandon environment\nthank you'}
                onChange={(e) => setQuickText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) void translateQuick(e);
                }}
              />
            </label>
            <button className="btn" disabled={!quickText.trim() || splitting}>
              {splitting ? '…' : t('add.translate')}
            </button>
          </form>

          {quick.map((q) => {
            const n = q.note;
            const dupe = existing.has(n.word.trim().toLowerCase());
            return (
              <div key={q.key} className={`quick-word${dupe ? ' dim' : ''}${q.status === 'unknown' ? ' unknown' : ''}`}>
                <div className="quick-head">
                  <b>{n.word}</b>
                  {q.status === 'ok' && (n.ipa ? <span className="muted small">{n.ipa}</span> : q.details && <span className="muted small">…</span>)}
                  {dupe && <span className="muted small">{t('add.already')}</span>}
                  <button
                    type="button"
                    className="btn small"
                    aria-label={t('add.remove')}
                    title={t('add.remove')}
                    onClick={() => setQuick((prev) => prev.filter((x) => x.key !== q.key))}
                  >
                    ✕
                  </button>
                </div>
                {q.status === 'loading' && <p className="muted small">{t('add.translating_one')}</p>}
                {q.status === 'unknown' && (
                  <div className="did-you-mean">
                    <p className="small">
                      <b>{t('add.not_found', { word: n.word })}</b>
                      {q.suggestions.length > 0 && <> {t('add.did_you_mean')}</>}
                    </p>
                    <div className="row gap wrap">
                      {q.suggestions.map((w) => (
                        <button key={w} type="button" className="btn small suggestion" onClick={() => chooseSuggestion(q.key, w)}>
                          {w}
                        </button>
                      ))}
                      <button type="button" className="link-btn small" onClick={() => keepAsIs(q.key)}>
                        {t('add.keep_as_is')}
                      </button>
                    </div>
                  </div>
                )}
                {q.status === 'ok' && (
                  <>
                    <label>
                      🇷🇺 {t('add.col_ru')}
                      <input value={n.translation_ru} onChange={(e) => editQuick(q.key, { translation_ru: e.target.value })} />
                    </label>
                    <label>
                      🇦🇿 {t('add.col_az')}
                      <input value={n.translation_az} onChange={(e) => editQuick(q.key, { translation_az: e.target.value })} />
                    </label>
                    <label>
                      {t('add.col_example')}
                      <input
                        value={n.example}
                        placeholder={q.details ? '…' : ''}
                        onChange={(e) => editQuick(q.key, { example: e.target.value })}
                      />
                    </label>
                  </>
                )}
              </div>
            );
          })}

          {quickReady.length > 0 && <p className="muted small">{t('add.quick_check')}</p>}
          {progress && <p className="info">{progress}</p>}
          {message && <p className={message.kind === 'ok' ? 'ok' : 'error'}>{message.text}</p>}
          {quick.length > 0 && (
            <button className="btn primary" disabled={quickReady.length === 0 || !!progress} onClick={() => void submitQuick()}>
              {t('add.submit_n', { n: quickReady.length })}
            </button>
          )}
        </div>
      )}

      {mode === 'quick' ? null : mode === 'list' ? (
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
