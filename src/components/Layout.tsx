import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';
import { AddIcon, DecksIcon, SettingsIcon, StatsIcon } from './Icons';

const TABS = [
  { to: '/', label: 'Колоды', icon: <DecksIcon />, end: true },
  { to: '/add', label: 'Добавить', icon: <AddIcon />, end: false },
  { to: '/stats', label: 'Статистика', icon: <StatsIcon />, end: false },
  { to: '/settings', label: 'Настройки', icon: <SettingsIcon />, end: false },
];

export function Layout({ children }: { children: ReactNode }) {
  const { isAdmin, students, student, selectStudent } = useAuth();
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
            {isAdmin && students.length > 0 && (
              <select
                className="student-select"
                value={student?.id ?? ''}
                onChange={(e) => selectStudent(e.target.value)}
                aria-label="Ученик"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <nav className="tabs top-tabs">
            {TABS.map((t) => (
              <NavLink key={t.to} to={t.to} end={t.end}>
                {t.label}
              </NavLink>
            ))}
          </nav>
        </header>
      )}

      <main className="content">{children}</main>

      {!focus && (
        <nav className="bottom-nav" aria-label="Разделы">
          {TABS.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end}>
              {t.icon}
              <span>{t.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
