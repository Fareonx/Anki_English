import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../auth';
import { updateProfile } from '../lib/db';
import { DEFAULT_CONFIG } from '../lib/scheduler/config';
import type { SchedConfig } from '../lib/scheduler/types';
import { getTheme, setTheme, type Theme } from '../lib/theme';
import { LANGS, useI18n, type Key } from '../lib/i18n';

type NumberKey = {
  [K in keyof SchedConfig]: SchedConfig[K] extends number ? K : never;
}[keyof SchedConfig];

const NUMBER_FIELDS: { key: NumberKey; label: Key; min: number; max: number }[] = [
  { key: 'newPerDay', label: 'settings.new_per_day', min: 0, max: 500 },
  { key: 'reviewsPerDay', label: 'settings.reviews_per_day', min: 0, max: 9999 },
  { key: 'graduatingIvl', label: 'settings.graduating', min: 1, max: 365 },
  { key: 'easyIvl', label: 'settings.easy_ivl', min: 1, max: 365 },
  { key: 'leechThreshold', label: 'settings.leech', min: 1, max: 99 },
  { key: 'rolloverHour', label: 'settings.rollover', min: 0, max: 23 },
];

const parseSteps = (text: string) =>
  text
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);

export function SettingsPage() {
  const { student, config, isAdmin, profile, reload, signOut } = useAuth();
  const { t, lang, setLang } = useI18n();
  const [form, setForm] = useState<SchedConfig>(config);
  const [learnSteps, setLearnSteps] = useState(config.learnSteps.join(' '));
  const [relearnSteps, setRelearnSteps] = useState(config.relearnSteps.join(' '));
  const [name, setName] = useState(profile?.name ?? '');
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [theme, setThemeState] = useState<Theme>(getTheme);
  const [typeAnswer, setTypeAnswer] = useState(student?.settings?.typeAnswer !== false);

  useEffect(() => {
    setForm(config);
    setLearnSteps(config.learnSteps.join(' '));
    setRelearnSteps(config.relearnSteps.join(' '));
    setTypeAnswer(student?.settings?.typeAnswer !== false);
  }, [config, student]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!student) return;
    const steps = parseSteps(learnSteps);
    if (steps.length === 0) {
      setMessage({ kind: 'error', text: t('settings.need_step') });
      return;
    }
    const settings = {
      ...student.settings,
      ...form,
      learnSteps: steps,
      relearnSteps: parseSteps(relearnSteps),
      typeAnswer,
    };
    try {
      await updateProfile(student.id, { settings });
      await reload();
      setMessage({ kind: 'ok', text: t('settings.saved') });
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
      <h2>{t('settings.title')}</h2>

      <section className="card form">
        <h3>{t('settings.appearance')}</h3>
        <div className="segmented" role="radiogroup" aria-label={t('settings.theme')}>
          {(['light', 'dark'] as const).map((th) => (
            <button
              key={th}
              type="button"
              role="radio"
              aria-checked={theme === th}
              className={theme === th ? 'active' : ''}
              onClick={() => {
                setTheme(th);
                setThemeState(th);
              }}
            >
              {th === 'light' ? t('settings.light') : t('settings.dark')}
            </button>
          ))}
        </div>
        <div className="segmented" role="radiogroup" aria-label={t('language')}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={lang === l.code}
              className={lang === l.code ? 'active' : ''}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p className="muted small">{t('settings.device_note')}</p>
      </section>

      <form className="card form" onSubmit={save}>
        <h3>
          {t('settings.study')}
          {isAdmin && student ? `: ${student.name}` : ''}
        </h3>
        <p className="muted small">
          {t('settings.study_note', { words: DEFAULT_CONFIG.newPerDay })}
        </p>
        {NUMBER_FIELDS.map((f) => (
          <label key={f.key}>
            {t(f.label)}
            <input
              type="number"
              min={f.min}
              max={f.max}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) })}
            />
            {f.key === 'newPerDay' && (
              <span className="muted small">
                {t('settings.new_per_day_hint')}
              </span>
            )}
          </label>
        ))}
        <label className="checkbox">
          <input type="checkbox" checked={typeAnswer} onChange={(e) => setTypeAnswer(e.target.checked)} />
          {t('settings.type_answer')}
        </label>
        <label>
          {t('settings.learn_steps')}
          <input value={learnSteps} onChange={(e) => setLearnSteps(e.target.value)} placeholder="1 10" />
        </label>
        <label>
          {t('settings.relearn_steps')}
          <input value={relearnSteps} onChange={(e) => setRelearnSteps(e.target.value)} placeholder="10" />
        </label>
        {message && <p className={message.kind === 'ok' ? 'ok' : 'error'}>{message.text}</p>}
        <div className="row gap">
          <button className="btn primary">{t('save')}</button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setForm(DEFAULT_CONFIG);
              setLearnSteps(DEFAULT_CONFIG.learnSteps.join(' '));
              setRelearnSteps(DEFAULT_CONFIG.relearnSteps.join(' '));
            }}
          >
            {t('settings.reset')}
          </button>
        </div>
      </form>

      <form className="card form" onSubmit={saveName}>
        <h3>{t('settings.profile')}</h3>
        <label>
          {t('login.name')}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <p className="muted small">
          {t('settings.role', { role: isAdmin ? t('settings.role_admin') : t('settings.role_student') })}
        </p>
        <div className="row gap">
          <button className="btn">{t('settings.save_name')}</button>
          <button type="button" className="btn danger" onClick={() => void signOut()}>
            {t('settings.sign_out')}
          </button>
        </div>
      </form>

      <section className="card pad">
        <h3>{t('settings.install')}</h3>
        <ul className="plain small">
          {(['settings.install_pc', 'settings.install_android', 'settings.install_ios'] as const).map((k) => (
            // Static strings from our own dictionary (only <b> markup).
            <li key={k} dangerouslySetInnerHTML={{ __html: t(k) }} />
          ))}
        </ul>
      </section>
    </div>
  );
}
