// Grammar lessons ("Уроки" tab). Content is plain data so it can be checked and tested.

/** A table of forms, e.g. a conjugation: head ['', 'presente'], rows [['io', 'sono'], ...]. */
export interface FormTable {
  title?: string;
  head: string[];
  rows: string[][];
}

export interface Example {
  /** The sentence in the language studied. */
  it: string;
  ru: string;
  az: string;
}

/** One exercise item: the student types `answer` (accents and apostrophes are not required). */
export interface Drill {
  /** What to do, e.g. "essere · noi" or "Io ___ (andare) a Bologna." */
  prompt: string;
  answer: string;
  /** Other accepted answers, e.g. "sono andata" next to "sono andato". */
  also?: string[];
  /** Short Russian hint shown after a wrong answer. */
  hint?: string;
}

export interface LessonSection {
  title: string;
  /** Explanation in Russian. Paragraphs separated by blank lines; **bold** is allowed. */
  text: string;
  tables?: FormTable[];
  examples?: Example[];
}

export interface Lesson {
  /** Stable id, e.g. "u02-modali". Progress is stored under it. */
  id: string;
  /** Unit of the textbook: 0 for "Benvenuti!", 1..11. */
  unit: number;
  title: string;
  /** One line: what you will be able to do. */
  goal: string;
  sections: LessonSection[];
  drills: Drill[];
}

export interface Unit {
  unit: number;
  /** Title as in the textbook, e.g. "Un nuovo inizio". */
  title: string;
  /** Russian title. */
  ru: string;
}
