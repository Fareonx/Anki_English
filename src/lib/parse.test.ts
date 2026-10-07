import { describe, expect, it } from 'vitest';
import { parseWordList } from './parse';

describe('parseWordList', () => {
  it('reads semicolon and tab separated columns', () => {
    const notes = parseWordList(
      'abandon ; оставлять ; tərk etmək ; They abandoned the plan.\n\n# comment\nbenefit\tвыгода\tfayda\nconsistent',
    );
    expect(notes).toHaveLength(3);
    expect(notes[0]).toMatchObject({
      word: 'abandon',
      translation_ru: 'оставлять',
      translation_az: 'tərk etmək',
      example: 'They abandoned the plan.',
    });
    expect(notes[1]).toMatchObject({ word: 'benefit', translation_ru: 'выгода', translation_az: 'fayda' });
    expect(notes[2]).toMatchObject({ word: 'consistent', translation_ru: '' });
  });

  it('drops duplicates case-insensitively', () => {
    expect(parseWordList('Issue;вопрос\nissue;проблема')).toHaveLength(1);
  });
});
