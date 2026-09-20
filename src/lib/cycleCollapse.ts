export type Band = { from: number; to: number };
export type Seam = { start: number; end: number };
export type Range = { low: number; high: number; unit: string };

const RANGE = /^(\d+)\D+(\d+)\s+(.+)$/;
const GHOST_FADE_FROM = 0.85;
const HAND_OFF_AT = 0.4;

export const COLLAPSE_PHASES = {
  collapse: [0.04, 0.42],
  rows: [0.42, 0.57, 0.71, 0.85],
};

export const clampUnit = (value: number) => Math.min(Math.max(value, 0), 1);

export const weekBand = ({ from, to }: Band): Band => ({ from: from - 1, to });

export const collapseAt = (progress: number) => {
  const [start, end] = COLLAPSE_PHASES.collapse;
  return clampUnit((progress - start) / (end - start));
};

export const rowSwitchedAt = (progress: number, index: number) => progress >= COLLAPSE_PHASES.rows[index];

export const statementFocusAt = (progress: number) =>
  COLLAPSE_PHASES.rows.slice(1).filter((next, index) => {
    const previous = COLLAPSE_PHASES.rows[index];
    return progress >= previous + (next - previous) * HAND_OFF_AT;
  }).length;

export const seamPlan = (before: Band, after: Band, seams: number): Seam[] =>
  Array.from({ length: seams + 1 }, (_, index) => ({
    start: before.from + ((before.to - before.from) * index) / seams,
    end: after.from + ((after.to - after.from) * index) / seams,
  }));

export const reachOf = (plan: Seam[]) =>
  plan.reduce((largest, { start, end }) => Math.max(largest, start - end), 0);

export const seamTarget = ({ start, end }: Seam, travel: number, reach: number) =>
  Math.max(start - travel * reach, end);

export const ghostOpacity = (plan: Seam[], left: number) => {
  const [{ start, end }] = plan;
  const moved = (start - left) / (start - end);
  return clampUnit((moved - GHOST_FADE_FROM) / (1 - GHOST_FADE_FROM));
};

export const parseRange = (value: string): Range => {
  const [, low, high, unit] = value.match(RANGE) ?? [];
  return { low: Number(low), high: Number(high), unit };
};

export const digitsBetween = (a: number, b: number) =>
  Array.from({ length: Math.abs(a - b) + 1 }, (_, index) => Math.min(a, b) + index);
