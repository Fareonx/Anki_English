import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { name: name.trim() } },
        });
        if (error) throw error;
        if (!data.session) {
          setMessage({ kind: 'info', text: 'Аккаунт создан. Подтверди адрес по ссылке из письма и войди.' });
          setMode('signin');
        }
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : String(err);
      setMessage({
        kind: 'error',
        text: /Invalid login credentials/i.test(text)
          ? 'Неверная почта или пароль.'
          : /Email not confirmed/i.test(text)
            ? 'Почта ещё не подтверждена.'
            : /at least 6 characters/i.test(text)
              ? 'Пароль должен быть не короче 6 символов.'
              : text,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <form className="card login-card" onSubmit={submit}>
        <img src="./icon.svg" alt="" width={56} height={56} />
        <h1>IELTS Words</h1>
        <p className="muted">Учим слова по методу Anki</p>

        <div className="segmented">
          <button type="button" className={mode === 'signin' ? 'active' : ''} onClick={() => setMode('signin')}>
            Вход
          </button>
          <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Регистрация
          </button>
        </div>

        {mode === 'signup' && (
          <label>
            Имя
            <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
          </label>
        )}
        <label>
          Почта
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
        </label>

        {message && <p className={message.kind === 'error' ? 'error' : 'info'}>{message.text}</p>}

        <button className="btn primary wide" disabled={busy}>
          {busy ? '…' : mode === 'signin' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </form>
    </div>
  );
}
