import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './auth';
import { I18nProvider } from './lib/i18n';
import './styles.css';
import { registerSW } from 'virtual:pwa-register';

// The installed app (home screen) keeps running its cached version until the service
// worker updates. Check for a new version on start, whenever the app comes back to the
// screen and every 30 minutes; autoUpdate then reloads the page with the new version.
registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (!registration) return;
    const check = () => void registration.update().catch(() => undefined);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check();
    });
    setInterval(check, 30 * 60 * 1000);
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nProvider>
  </StrictMode>,
);
