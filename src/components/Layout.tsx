import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth';

export function Layout({ children }: { children: ReactNode }) {
  const { isAdmin, students, student, selectStudent } = useAuth();
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <img src="./icon.svg" alt="" width={28} height={28} />
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
                  👤 {s.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <nav className="tabs">
          <NavLink to="/" end>
            Колоды
          </NavLink>
          <NavLink to="/add">Добавить</NavLink>
          <NavLink to="/stats">Статистика</NavLink>
          <NavLink to="/settings">Настройки</NavLink>
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
