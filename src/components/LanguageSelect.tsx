import { LANGS, useI18n } from '../lib/i18n';

/** Compact interface-language switcher (RU / AZ / EN). */
export function LanguageSelect() {
  const { lang, setLang, t } = useI18n();
  return (
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => setLang(e.target.value as typeof lang)}
      aria-label={t('language')}
      title={t('language')}
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.short}
        </option>
      ))}
    </select>
  );
}
