import type { JSX, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';
import { AddIcon, DecksIcon, LessonsIcon, SettingsIcon, StatsIcon } from './Icons';
import { useI18n, type Key } from '../lib/i18n';
import { LanguageSelect } from './LanguageSelect';
import { courseFor } from '../lessons';
import { APP_TITLE } from '../lib/studyLang';

type Tab = { to: string; label: Key; icon: JSX.Element; end: boolean };

const TABS: Tab[] = [
  { to: '/', label: 'nav.decks', icon: <DecksIcon />, end: true },
  { to: '/add', label: 'nav.add', icon: <AddIcon />, end: false },
  { to: '/stats', label: 'nav.stats', icon: <StatsIcon />, end: false },
  { to: '/settings', label: 'nav.settings', icon: <SettingsIcon />, end: false },
];

// Grammar lessons exist for Italian and Spanish; the tab goes before Settings.
const LESSONS_TAB: Tab = { to: '/lessons', label: 'nav.lessons', icon: <LessonsIcon />, end: false };
const TABS_LESSONS: Tab[] = [...TABS.slice(0, 3), LESSONS_TAB, TABS[3]];

export function Layout({ children }: { children: ReactNode }) {
  const { isAdmin, students, student, selectStudent, studyLang } = useAuth();
  const { t } = useI18n();
  const tabs = courseFor(studyLang) ? TABS_LESSONS : TABS;
  // The study screen is a focus mode: no header and no tab bar.
  const focus = useLocation().pathname.startsWith('/study/');

  return (
    <div className={`app ${focus ? 'focus' : ''}`}>
      {!focus && (
        <header className="topbar">
          <div className="topbar-inner">
            <NavLink to="/" className="brand">
              <img src="./icon.svg" alt="" width={30} height={30} />
              <span>{APP_TITLE[studyLang]}</span>
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
            {tabs.map((tab) => (
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
          {tabs.map((tab) => (
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
