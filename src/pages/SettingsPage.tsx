import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../auth';
import { updateProfile } from '../lib/db';
import { DEFAULT_CONFIG } from '../lib/scheduler/config';
import type { SchedConfig } from '../lib/scheduler/types';

type NumberKey = {
  [K in keyof SchedConfig]: SchedConfig[K] extends number ? K : never;
}[keyof SchedConfig];

const NUMBER_FIELDS: { key: NumberKey; label: string; hint?: string; min: number; max: number }[] = [
  { key: 'newPerDay', label: 'Новых карточек в день', hint: 'Каждое слово — 2 карточки (EN→RU и RU→EN)', min: 0, max: 500 },
  { key: 'reviewsPerDay', label: 'Максимум повторений в день', min: 0, max: 9999 },
  { key: 'graduatingIvl', label: 'Интервал после изучения (дней)', min: 1, max: 365 },
  { key: 'easyIvl', label: 'Интервал для «Легко» (дней)', min: 1, max: 365 },
  { key: 'leechThreshold', label: 'Слово «трудное» после стольких забываний', min: 1, max: 99 },
  { key: 'rolloverHour', label: 'Новый день начинается в (час)', min: 0, max: 23 },
];

const parseSteps = (text: string) =>
  text
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);

export function SettingsPage() {
  const { student, config, isAdmin, profile, reload, signOut } = useAuth();
  const [form, setForm] = useState<SchedConfig>(config);
  const [learnSteps, setLearnSteps] = useState(config.learnSteps.join(' '));
  const [relearnSteps, setRelearnSteps] = useState(config.relearnSteps.join(' '));
  const [name, setName] = useState(profile?.name ?? '');
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setForm(config);
    setLearnSteps(config.learnSteps.join(' '));
    setRelearnSteps(config.relearnSteps.join(' '));
  }, [config]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!student) return;
    const steps = parseSteps(learnSteps);
    if (steps.length === 0) {
      setMessage({ kind: 'error', text: 'Нужен хотя бы один шаг изучения, например «1 10».' });
      return;
    }
    const settings: Partial<SchedConfig> = { ...form, learnSteps: steps, relearnSteps: parseSteps(relearnSteps) };
    try {
      await updateProfile(student.id, { settings: settings as Record<string, unknown> });
      await reload();
      setMessage({ kind: 'ok', text: 'Сохранено.' });
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof Error ? err.message : String(err) });
    }
  }

  async function saveName(e: FormEvent) {
    e.preventDefault();
    if (!profile || !name.trim()) return;
    await updateProfile(profile.id, { name: name.trim() });
    await reload();
  }

  return (
    <div className="stack">
      <h2>Настройки</h2>

      <form className="card form" onSubmit={save}>
        <h3>Учёба{isAdmin && student ? `: ${student.name}` : ''}</h3>
        <p className="muted small">
          По умолчанию стоят стандартные настройки Anki. Лимит новых карточек — {DEFAULT_CONFIG.newPerDay}, то есть{' '}
          {DEFAULT_CONFIG.newPerDay / 2} слов в день в обе стороны.
        </p>
        {NUMBER_FIELDS.map((f) => (
          <label key={f.key}>
            {f.label}
            <input
              type="number"
              min={f.min}
              max={f.max}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) })}
            />
            {f.key === 'newPerDay' && (
              <span className="muted small">
                ≈ {Math.round(form.newPerDay / 2)} слов в день. {f.hint}
              </span>
            )}
          </label>
        ))}
        <label>
          Шаги изучения (минуты)
          <input value={learnSteps} onChange={(e) => setLearnSteps(e.target.value)} placeholder="1 10" />
        </label>
        <label>
          Шаги переучивания после «Снова» (минуты)
          <input value={relearnSteps} onChange={(e) => setRelearnSteps(e.target.value)} placeholder="10" />
        </label>
        {message && <p className={message.kind === 'ok' ? 'ok' : 'error'}>{message.text}</p>}
        <div className="row gap">
          <button className="btn primary">Сохранить</button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setForm(DEFAULT_CONFIG);
              setLearnSteps(DEFAULT_CONFIG.learnSteps.join(' '));
              setRelearnSteps(DEFAULT_CONFIG.relearnSteps.join(' '));
            }}
          >
            Сбросить к стандартным
          </button>
        </div>
      </form>

      <form className="card form" onSubmit={saveName}>
        <h3>Профиль</h3>
        <label>
          Имя
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <p className="muted small">Роль: {isAdmin ? 'админ (добавляет слова и смотрит прогресс)' : 'ученик'}</p>
        <div className="row gap">
          <button className="btn">Сохранить имя</button>
          <button type="button" className="btn danger" onClick={() => void signOut()}>
            Выйти
          </button>
        </div>
      </form>

      <section className="card pad">
        <h3>Установить как приложение</h3>
        <ul className="plain small">
          <li>
            <b>Компьютер (Chrome / Edge):</b> значок «Установить» справа в адресной строке → «Установить».
          </li>
          <li>
            <b>Android (Chrome):</b> меню ⋮ → «Добавить на главный экран» / «Установить приложение».
          </li>
          <li>
            <b>iPhone (Safari):</b> кнопка «Поделиться» → «На экран „Домой“».
          </li>
        </ul>
      </section>
    </div>
  );
}
