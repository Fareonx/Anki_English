import type { Deck } from './db';

export interface DeckNode {
  deck: Deck;
  children: DeckNode[];
  depth: number;
  /** Full name like "IELTS::День 01". */
  path: string;
}

const collator = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' });

export function buildDeckTree(decks: Deck[]): DeckNode[] {
  const byParent = new Map<string | null, Deck[]>();
  for (const d of decks) {
    const key = d.parent_id && decks.some((p) => p.id === d.parent_id) ? d.parent_id : null;
    const list = byParent.get(key) ?? [];
    list.push(d);
    byParent.set(key, list);
  }
  const build = (parent: string | null, depth: number, prefix: string): DeckNode[] =>
    (byParent.get(parent) ?? [])
      .sort((a, b) => collator.compare(a.name, b.name))
      .map((deck) => {
        const path = prefix ? `${prefix}::${deck.name}` : deck.name;
        return { deck, depth, path, children: build(deck.id, depth + 1, path) };
      });
  return build(null, 0, '');
}

export function flattenTree(nodes: DeckNode[]): DeckNode[] {
  return nodes.flatMap((n) => [n, ...flattenTree(n.children)]);
}

/** The deck and all its descendants. */
export function subtreeIds(decks: Deck[], rootId: string): Set<string> {
  const ids = new Set([rootId]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const d of decks) {
      if (d.parent_id && ids.has(d.parent_id) && !ids.has(d.id)) {
        ids.add(d.id);
        grew = true;
      }
    }
  }
  return ids;
}

export function deckPath(decks: Deck[], id: string): string {
  const names: string[] = [];
  let cur = decks.find((d) => d.id === id);
  const seen = new Set<string>();
  while (cur && !seen.has(cur.id)) {
    seen.add(cur.id);
    names.unshift(cur.name);
    const parentId: string | null = cur.parent_id;
    cur = parentId ? decks.find((d) => d.id === parentId) : undefined;
  }
  return names.join('::');
}

/**
 * A finished day: a deck without sub-decks whose words have all been started (no new
 * cards left) and that has nothing to study today. Its reviews still come through the
 * parent deck. Empty decks count as finished too, unless they were created today
 * (a category just made for new words must stay visible).
 */
export function isFinishedLeaf(
  node: DeckNode,
  cards: { queue: number }[],
  counts: { new: number; learn: number; review: number },
  todayStartMs: number,
): boolean {
  if (node.children.length > 0) return false;
  if (cards.length === 0) return Date.parse(node.deck.created_at) < todayStartMs;
  const anyNew = cards.some((c) => c.queue === 0);
  return !anyNew && counts.new + counts.learn + counts.review === 0;
}
