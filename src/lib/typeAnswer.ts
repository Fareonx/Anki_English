// "Type in the answer", as in Anki: compare what was typed with the correct
// word letter by letter and show the differences.

export interface DiffChar {
  ch: string;
  ok: boolean;
}

export interface TypedResult {
  correct: boolean;
  /** What was typed; wrong or extra letters have ok = false. */
  typed: DiffChar[];
  /** The correct answer; letters that were missed or misspelt have ok = false. */
  expected: DiffChar[];
}

/** Lower-case, trimmed, single spaces, straight apostrophes. */
export function normalizeAnswer(s: string): string {
  return s
    .normalize('NFC')
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function checkTypedAnswer(typedRaw: string, expectedRaw: string): TypedResult {
  const typed = typedRaw.replace(/\s+/g, ' ').trim();
  const expected = expectedRaw.replace(/\s+/g, ' ').trim();
  const a = normalizeAnswer(typed);
  const b = normalizeAnswer(expected);

  // Longest common subsequence decides which letters line up.
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const okTyped = new Array<boolean>(n).fill(false);
  const okExpected = new Array<boolean>(m).fill(false);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      okTyped[i++] = true;
      okExpected[j++] = true;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }

  // Normalisation keeps the length, so indices map back to the original text.
  const sameLength = typed.length === n && expected.length === m;
  const show = (raw: string, norm: string) => (sameLength ? raw : norm);
  return {
    correct: a === b && a.length > 0,
    typed: [...show(typed, a)].map((ch, k) => ({ ch, ok: okTyped[k] })),
    expected: [...show(expected, b)].map((ch, k) => ({ ch, ok: okExpected[k] })),
  };
}
