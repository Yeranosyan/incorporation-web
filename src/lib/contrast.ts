export type ContrastWord = { word: string; at: number };
export type ContrastSplit = {
  head: string[];
  before: ContrastWord[];
  after: ContrastWord[];
  tail: string[];
};

const wordsOf = (phrase: string) => phrase.split(" ");

const sharedLength = (
  first: string[],
  second: string[],
  pick: (words: string[], index: number) => string,
) => {
  const limit = Math.min(first.length, second.length) - 1;
  let length = 0;
  while (length < limit && pick(first, length) === pick(second, length)) length += 1;
  return length;
};

const fromStart = (words: string[], index: number) => words[index];

const fromEnd = (words: string[], index: number) => words[words.length - 1 - index];

const spanOf = (words: string[]) => words.join(" ").length;

const placed = (words: string[], span: number): ContrastWord[] => {
  let offset = 0;
  return words.map((word) => {
    const at = span > 1 ? offset / (span - 1) : 0;
    offset += word.length + 1;
    return { word, at: Math.min(at, 1) };
  });
};

export const splitContrast = (before: string, after: string): ContrastSplit => {
  const was = wordsOf(before);
  const now = wordsOf(after);
  const tail = sharedLength(was, now, fromEnd);
  const head = sharedLength(was.slice(0, was.length - tail), now.slice(0, now.length - tail), fromStart);
  const changedBefore = was.slice(head, was.length - tail);
  const changedAfter = now.slice(head, now.length - tail);
  const span = Math.max(spanOf(changedBefore), spanOf(changedAfter));

  return {
    head: was.slice(0, head),
    before: placed(changedBefore, span),
    after: placed(changedAfter, span),
    tail: was.slice(was.length - tail),
  };
};
