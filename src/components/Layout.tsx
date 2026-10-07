import type { JSX, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';
import { AddIcon, DecksIcon, SettingsIcon, StatsIcon } from './Icons';
import { useI18n, type Key } from '../lib/i18n';
import { LanguageSelect } from './LanguageSelect';

const TABS: { to: string; label: Key; icon: JSX.Element; end: boolean }[] = [
  { to: '/', label: 'nav.decks', icon: <DecksIcon />, end: true },
  { to: '/add', label: 'nav.add', icon: <AddIcon />, end: false },
  { to: '/stats', label: 'nav.stats', icon: <StatsIcon />, end: false },
  { to: '/settings', label: 'nav.settings', icon: <SettingsIcon />, end: false },
];

export function Layout({ children }: { children: ReactNode }) {
  const { isAdmin, students, student, selectStudent } = useAuth();
  const { t } = useI18n();
  // The study screen is a focus mode: no header and no tab bar.
  const focus = useLocation().pathname.startsWith('/study/');

  return (
    <div className={`app ${focus ? 'focus' : ''}`}>
      {!focus && (
        <header className="topbar">
          <div className="topbar-inner">
            <NavLink to="/" className="brand">
              <img src="./icon.svg" alt="" width={30} height={30} />
              <span>IELTS Words</span>
            </NavLink>
            <div className="topbar-actions">
            {isAdmin && students.length > 0 && (
              <select
                className="student-select"
                value={student?.id ?? ''}
                onChange={(e) => selectStudent(e.target.value)}
                aria-label={t('student')}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
            <LanguageSelect />
            </div>
          </div>
          <nav className="tabs top-tabs">
            {TABS.map((tab) => (
              <NavLink key={tab.to} to={tab.to} end={tab.end}>
                {t(tab.label)}
              </NavLink>
            ))}
          </nav>
        </header>
      )}

      <main className="content">{children}</main>

      {!focus && (
        <nav className="bottom-nav" aria-label={t('sections')}>
          {TABS.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end}>
              {tab.icon}
              <span>{t(tab.label)}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
