// Light/dark theme chosen per device in Settings. Light is the default.

export type Theme = 'light' | 'dark';

const KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f4f5f9', dark: '#0f1218' };

export function getTheme(): Theme {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Storage unavailable (private mode): the theme still applies for this visit.
  }
  applyTheme(theme);
}
