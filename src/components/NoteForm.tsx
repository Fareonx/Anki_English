import { useState } from 'react';
import { autofill } from '../lib/autofill';
import type { NoteFields } from '../lib/db';
import { useI18n, type Key } from '../lib/i18n';

const FIELDS: { key: keyof NoteFields; label: Key; multiline?: boolean; placeholder?: string }[] = [
  { key: 'word', label: 'form.word', placeholder: 'sustainable' },
  { key: 'translation_ru', label: 'form.ru', placeholder: 'устойчивый' },
  { key: 'translation_az', label: 'form.az', placeholder: 'davamlı' },
  { key: 'ipa', label: 'form.ipa', placeholder: '/səˈsteɪnəbl/' },
  { key: 'pos', label: 'form.pos', placeholder: 'adjective' },
  { key: 'definition', label: 'form.definition', multiline: true },
  { key: 'example', label: 'form.example', multiline: true },
  { key: 'synonyms', label: 'form.synonyms' },
];

export function NoteForm({
  value,
  onChange,
}: {
  value: NoteFields;
  onChange: (next: NoteFields) => void;
}) {
  const [filling, setFilling] = useState(false);
  const { t } = useI18n();
  const [fillError, setFillError] = useState<string | null>(null);

  async function fill() {
    setFilling(true);
    setFillError(null);
    try {
      const next = await autofill(value);
      onChange(next);
      if (JSON.stringify(next) === JSON.stringify(value)) setFillError(t('form.nothing_found'));
    } catch {
      setFillError(t('form.service_down'));
    } finally {
      setFilling(false);
    }
  }

  return (
    <div className="note-form">
      {FIELDS.map((f) => (
        <label key={f.key}>
          {t(f.label)}
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
          {filling ? t('form.searching') : t('form.autofill')}
        </button>
        {fillError && <span className="muted small">{fillError}</span>}
      </div>
    </div>
  );
}
