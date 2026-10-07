import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth';
import { Layout } from './components/Layout';
import { AddPage } from './pages/AddPage';
import { BrowsePage } from './pages/BrowsePage';
import { DecksPage } from './pages/DecksPage';
import { LoginPage } from './pages/LoginPage';
import { SettingsPage } from './pages/SettingsPage';
import { StatsPage } from './pages/StatsPage';
import { StudyPage } from './pages/StudyPage';

export function App() {
  const { loading, userId, profile, student, isAdmin } = useAuth();

  if (loading) return <div className="center muted">Загрузка…</div>;
  if (!userId || !profile) return <LoginPage />;

  return (
    <HashRouter>
      <Layout>
        {!student ? (
          <div className="card empty">
            <h2>Пока нет ученика</h2>
            <p className="muted">
              {isAdmin
                ? 'Попроси брата открыть приложение и зарегистрироваться. После этого здесь появятся его колоды и статистика.'
                : 'Профиль не найден. Попробуй выйти и войти снова.'}
            </p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<DecksPage />} />
            <Route path="/study/:deckId" element={<StudyPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/deck/:deckId" element={<BrowsePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Layout>
    </HashRouter>
  );
}
