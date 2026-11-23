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

describe('checkTypedAnswer (lenient, Italian)', () => {
  it('accepts missing accents and apostrophes but marks them', () => {
    expect(checkTypedAnswer('la citta', 'la città', true)).toMatchObject({ correct: true, inexact: true });
    expect(checkTypedAnswer("l'universita", "l'università", true).correct).toBe(true);
    expect(checkTypedAnswer('luniversita', "l'università", true).correct).toBe(true);
    expect(checkTypedAnswer('perche', 'perché', true).correct).toBe(true);
    expect(checkTypedAnswer('la città', 'la città', true)).toEqual(
      expect.objectContaining({ correct: true }),
    );
    expect(checkTypedAnswer('la città', 'la città', true).inexact).toBeUndefined();
  });

  it('still rejects wrong letters and keeps accents strict without lenient', () => {
    expect(checkTypedAnswer('la cita', 'la città', true).correct).toBe(false);
    expect(checkTypedAnswer('il citta', 'la città', true).correct).toBe(false);
    expect(checkTypedAnswer('citta', 'città').correct).toBe(false);
  });

  it('lines up accented letters in the diff', () => {
    const r = checkTypedAnswer('caffe', 'caffè', true);
    expect(r.expected.every((c) => c.ok)).toBe(true);
    expect(r.expected.map((c) => c.ch).join('')).toBe('caffè');
  });
});

describe('checkTypedAnswer (lenient) ignores punctuation', () => {
  it('accepts answers without ?, … and with other capitals', () => {
    expect(checkTypedAnswer('come stai', 'come stai?', true).correct).toBe(true);
    expect(checkTypedAnswer('mi chiamo', 'mi chiamo…', true).correct).toBe(true);
    expect(checkTypedAnswer('Mi chiamo...', 'mi chiamo…', true).correct).toBe(true);
    expect(checkTypedAnswer('cosi cosi', 'così così', true).correct).toBe(true);
    expect(checkTypedAnswer('come stai', 'come stai?').correct).toBe(false);
  });
});

describe('checkTypedAnswer with an optional article (Spanish)', () => {
  const ES = /^(el|la|los|las)\s+/i;
  it('accepts the noun without its article, but not a wrong article', () => {
    expect(checkTypedAnswer('agua', 'el agua', true, ES)).toMatchObject({ correct: true, inexact: true });
    expect(checkTypedAnswer('el agua', 'el agua', true, ES).correct).toBe(true);
    expect(checkTypedAnswer('cancion', 'la canción', true, ES).correct).toBe(true);
    expect(checkTypedAnswer('la agua', 'el agua', true, ES).correct).toBe(false);
    expect(checkTypedAnswer('Buenos dias.', '¡buenos días!', true, ES).correct).toBe(true);
    expect(checkTypedAnswer('agua', 'el agua', true).correct).toBe(false);
  });
});

describe('checkTypedAnswer with two forms', () => {
  it('accepts either form of "este / esta"', () => {
    expect(checkTypedAnswer('esta', 'este / esta', true).correct).toBe(true);
    expect(checkTypedAnswer('este', 'este / esta', true).correct).toBe(true);
    expect(checkTypedAnswer('ese', 'este / esta', true).correct).toBe(false);
  });
});
