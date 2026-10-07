import { describe, expect, it } from 'vitest';
import { checkTypedAnswer } from './typeAnswer';

const marks = (cs: { ch: string; ok: boolean }[]) => cs.map((c) => (c.ok ? c.ch : `[${c.ch}]`)).join('');

describe('checkTypedAnswer', () => {
  it('accepts the right word ignoring case and extra spaces', () => {
    expect(checkTypedAnswer('  Sustainable ', 'sustainable').correct).toBe(true);
    expect(checkTypedAnswer('climate   change', 'climate change').correct).toBe(true);
    expect(checkTypedAnswer('don’t', "don't").correct).toBe(true);
  });

  it('marks a wrong letter on both sides', () => {
    const r = checkTypedAnswer('Case', 'Casa');
    expect(r.correct).toBe(false);
    expect(marks(r.typed)).toBe('Cas[e]');
    expect(marks(r.expected)).toBe('Cas[a]');
  });

  it('marks missing and extra letters', () => {
    const missing = checkTypedAnswer('enviroment', 'environment');
    expect(marks(missing.typed)).toBe('enviroment');
    expect(marks(missing.expected)).toBe('enviro[n]ment');
    const extra = checkTypedAnswer('accross', 'across');
    expect(marks(extra.expected)).toBe('across');
    expect(extra.typed.filter((c) => !c.ok)).toHaveLength(1);
  });

  it('treats an empty answer as wrong', () => {
    const r = checkTypedAnswer('', 'goal');
    expect(r.correct).toBe(false);
    expect(marks(r.expected)).toBe('[g][o][a][l]');
  });
});
