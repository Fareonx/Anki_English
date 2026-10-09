import { describe, expect, it } from 'vitest';
import { checkTypedAnswer, isAcceptedAlternative, meaningsOf, type AltLookup } from './typeAnswer';

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

describe('isAcceptedAlternative', () => {
  const table: Record<string, AltLookup> = {
    'ru:hi': { main: 'Привет', alternatives: ['Привет!', 'Ну!', 'Салют!'], known: true, suggestion: null },
    'ru:bye': { main: 'Пока', alternatives: ['Пока!', 'До свидания!'], known: true, suggestion: null },
    'ru:house': { main: 'дом', alternatives: ['дом', 'здание'], known: true, suggestion: null },
    'ru:mothr': { main: 'мать', alternatives: [], known: false, suggestion: 'mother' },
    'ru:cat': { main: 'кошка', alternatives: ['кошка', 'кот'], known: true, suggestion: null },
    'az:cat': { main: 'pişik', alternatives: ['pişik'], known: true, suggestion: null },
  };
  const lookup = async (w: string, lang: 'ru' | 'az') => {
    const hit = table[`${lang}:${w}`];
    if (!hit) throw new Error('offline');
    return hit;
  };
  const hello = { word: 'hello', translation_ru: 'привет, здравствуйте', translation_az: 'salam', synonyms: '' };

  it('accepts a word whose translation is one of the meanings', async () => {
    expect(await isAcceptedAlternative('Hi', hello, lookup)).toBe(true);
    const bye = { word: 'goodbye', translation_ru: 'до свидания, пока', translation_az: 'sağ ol', synonyms: '' };
    expect(await isAcceptedAlternative('Bye', bye, lookup)).toBe(true);
    const home = { word: 'home', translation_ru: 'дом (родной), домой', translation_az: 'ev', synonyms: '' };
    expect(await isAcceptedAlternative('house', home, lookup)).toBe(true);
  });

  it('accepts the note synonyms without a network', async () => {
    const mother = { word: 'mother', translation_ru: 'мама, мать', translation_az: 'ana', synonyms: 'mom, mum' };
    expect(await isAcceptedAlternative('Mum', mother, async () => Promise.reject(new Error('offline')))).toBe(true);
  });

  it('rejects typos, other words and the empty answer', async () => {
    const mother = { word: 'mother', translation_ru: 'мама, мать', translation_az: 'ana', synonyms: '' };
    expect(await isAcceptedAlternative('mothr', mother, lookup)).toBe(false);
    expect(await isAcceptedAlternative('cat', hello, lookup)).toBe(false);
    expect(await isAcceptedAlternative('', hello, lookup)).toBe(false);
    expect(await isAcceptedAlternative('zzz', hello, lookup)).toBe(false);
  });

  it('normalizes meanings', () => {
    expect(meaningsOf('дом (родной), домой', 'Привет!')).toEqual(['дом', 'домой', 'привет']);
  });
});
