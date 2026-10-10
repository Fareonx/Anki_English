import { describe, expect, it } from 'vitest';
import { isFinishedLeaf, type DeckNode } from './decks';

const node = (children: DeckNode[] = [], created = '2026-10-01T00:00:00Z'): DeckNode => ({
  deck: { id: 'd', student_id: 's', parent_id: 'p', name: 'День 01', created_at: created },
  children,
  depth: 1,
  path: 'IELTS::День 01',
});
const TODAY = Date.parse('2026-10-09T00:00:00Z');

describe('isFinishedLeaf', () => {
  it('hides a day whose words are all started, even with reviews due', () => {
    expect(isFinishedLeaf(node(), [{ queue: 2 }, { queue: 2 }], TODAY)).toBe(true);
    expect(isFinishedLeaf(node(), [{ queue: 1 }, { queue: 2 }], TODAY)).toBe(true);
  });

  it('keeps a day with new cards left', () => {
    expect(isFinishedLeaf(node(), [{ queue: 2 }, { queue: 0 }], TODAY)).toBe(false);
  });

  it('hides old empty decks but not ones created today or parents', () => {
    expect(isFinishedLeaf(node(), [], TODAY)).toBe(true);
    expect(isFinishedLeaf(node([], '2026-10-09T05:00:00Z'), [], TODAY)).toBe(false);
    expect(isFinishedLeaf(node([node()]), [], TODAY)).toBe(false);
  });
});
