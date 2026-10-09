import { describe, expect, it } from 'vitest';
import { isFinishedLeaf, type DeckNode } from './decks';

const node = (children: DeckNode[] = [], created = '2026-10-01T00:00:00Z'): DeckNode => ({
  deck: { id: 'd', student_id: 's', parent_id: 'p', name: 'День 01', created_at: created },
  children,
  depth: 1,
  path: 'IELTS::День 01',
});
const zero = { new: 0, learn: 0, review: 0 };
const TODAY = Date.parse('2026-10-09T00:00:00Z');

describe('isFinishedLeaf', () => {
  it('hides a day whose words are all started and that has nothing for today', () => {
    expect(isFinishedLeaf(node(), [{ queue: 2 }, { queue: 2 }], zero, TODAY)).toBe(true);
  });

  it('keeps a day with new cards or something due today', () => {
    expect(isFinishedLeaf(node(), [{ queue: 2 }, { queue: 0 }], zero, TODAY)).toBe(false);
    expect(isFinishedLeaf(node(), [{ queue: 2 }], { ...zero, review: 1 }, TODAY)).toBe(false);
    expect(isFinishedLeaf(node(), [{ queue: 1 }], { ...zero, learn: 1 }, TODAY)).toBe(false);
  });

  it('hides old empty decks but not ones created today or parents', () => {
    expect(isFinishedLeaf(node(), [], zero, TODAY)).toBe(true);
    expect(isFinishedLeaf(node([], '2026-10-09T05:00:00Z'), [], zero, TODAY)).toBe(false);
    expect(isFinishedLeaf(node([node()]), [], zero, TODAY)).toBe(false);
  });
});
