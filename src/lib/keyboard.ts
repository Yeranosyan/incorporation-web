import { clamp } from "./gesture";

export type KeyIndexOptions = { wrap?: boolean; horizontalOnly?: boolean };

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
const HORIZONTAL_KEYS = new Set(["ArrowRight", "ArrowLeft", "Home", "End"]);

export const resolveKeyIndex = (
  key: string,
  current: number,
  count: number,
  { wrap = false, horizontalOnly = false }: KeyIndexOptions = {},
) => {
  if (horizontalOnly && !HORIZONTAL_KEYS.has(key)) return null;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;

  const step = STEPS[key];
  if (!step) return null;

  const next = current + step;
  return wrap ? (next + count) % count : clamp(next, 0, count - 1);
};
