import { useState } from 'react';
import { autofill } from '../lib/autofill';
import type { NoteFields } from '../lib/db';

const FIELDS: { key: keyof NoteFields; label: string; multiline?: boolean; placeholder?: string }[] = [
  { key: 'word', label: 'Слово (English)', placeholder: 'sustainable' },
  { key: 'translation_ru', label: 'Перевод (русский)', placeholder: 'устойчивый' },
  { key: 'translation_az', label: 'Tərcümə (azərbaycanca)', placeholder: 'davamlı' },
  { key: 'ipa', label: 'Транскрипция', placeholder: '/səˈsteɪnəbl/' },
  { key: 'pos', label: 'Часть речи', placeholder: 'adjective' },
  { key: 'definition', label: 'Definition', multiline: true },
  { key: 'example', label: 'Пример', multiline: true },
  { key: 'synonyms', label: 'Синонимы / коллокации' },
];

export function NoteForm({
  value,
  onChange,
}: {
  value: NoteFields;
  onChange: (next: NoteFields) => void;
}) {
  const [filling, setFilling] = useState(false);
  const [fillError, setFillError] = useState<string | null>(null);

  async function fill() {
    setFilling(true);
    setFillError(null);
    try {
      const next = await autofill(value);
      onChange(next);
      if (JSON.stringify(next) === JSON.stringify(value)) setFillError('Ничего не нашлось — заполни вручную.');
    } catch {
      setFillError('Сервис словаря недоступен, заполни вручную.');
    } finally {
      setFilling(false);
    }
  }

  return (
    <div className="note-form">
      {FIELDS.map((f) => (
        <label key={f.key}>
          {f.label}
          {f.multiline ? (
            <textarea
              rows={2}
              value={value[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            />
          ) : (
            <input
              value={value[f.key]}
              placeholder={f.placeholder}
              required={f.key === 'word'}
              autoCapitalize={f.key === 'word' ? 'none' : undefined}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            />
          )}
        </label>
      ))}
      <div className="row gap">
        <button type="button" className="btn small" disabled={!value.word.trim() || filling} onClick={fill}>
          {filling ? 'Ищу…' : '✨ Автозаполнить пустые поля'}
        </button>
        {fillError && <span className="muted small">{fillError}</span>}
      </div>
    </div>
  );
}
