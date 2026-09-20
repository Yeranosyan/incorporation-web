import { describe, expect, it } from "vitest";
import {
  COLLAPSE_PHASES,
  collapseAt,
  digitsBetween,
  ghostOpacity,
  parseRange,
  reachOf,
  rowSwitchedAt,
  seamPlan,
  seamTarget,
  statementFocusAt,
  weekBand,
} from "./cycleCollapse";

const plan = seamPlan(weekBand({ from: 13, to: 26 }), weekBand({ from: 1, to: 2 }), 14);

describe("seamPlan", () => {
  it("maps every seam of the long cycle onto the short one", () => {
    expect(plan).toHaveLength(15);
    expect(plan[0]).toEqual({ start: 12, end: 0 });
    expect(plan.at(-1)).toEqual({ start: 26, end: 2 });
  });

  it("measures the longest distance a seam travels", () => {
    expect(reachOf(plan)).toBe(24);
  });
});

describe("collapseAt", () => {
  it("holds still before the collapse and completes at its end", () => {
    const [start, end] = COLLAPSE_PHASES.collapse;
    expect(collapseAt(0)).toBe(0);
    expect(collapseAt(start)).toBe(0);
    expect(collapseAt((start + end) / 2)).toBeCloseTo(0.5);
    expect(collapseAt(end)).toBe(1);
    expect(collapseAt(1)).toBe(1);
  });
});

describe("seamTarget", () => {
  it("never pulls a seam past its destination", () => {
    const reach = reachOf(plan);
    expect(seamTarget(plan[0], 0, reach)).toBe(12);
    expect(seamTarget(plan[0], 1, reach)).toBe(0);
    expect(seamTarget(plan[plan.length - 1], 1, reach)).toBe(2);
  });
});

describe("rowSwitchedAt", () => {
  it("switches comparison rows in order as scrolling continues", () => {
    const switched = (progress: number) => COLLAPSE_PHASES.rows.map((_, index) => rowSwitchedAt(progress, index));
    expect(switched(0.5)).toEqual([true, false, false, false]);
    expect(switched(0.75)).toEqual([true, true, true, false]);
    expect(switched(1)).toEqual([true, true, true, true]);
  });
});

describe("statementFocusAt", () => {
  it("hands focus to the next statement partway between row switches", () => {
    expect(statementFocusAt(0)).toBe(0);
    expect(statementFocusAt(0.45)).toBe(0);
    expect(statementFocusAt(0.5)).toBe(1);
    expect(statementFocusAt(0.7)).toBe(2);
    expect(statementFocusAt(1)).toBe(3);
  });

  it("focuses a statement before its row finishes switching", () => {
    COLLAPSE_PHASES.rows.slice(1).forEach((start, index) => {
      expect(statementFocusAt(start)).toBe(index + 1);
    });
  });
});

describe("ghostOpacity", () => {
  it("reveals the original label only once the slab has left it behind", () => {
    expect(ghostOpacity(plan, 12)).toBe(0);
    expect(ghostOpacity(plan, 6)).toBe(0);
    expect(ghostOpacity(plan, 0)).toBe(1);
  });
});

describe("parseRange", () => {
  it("splits a duration range into its bounds and unit", () => {
    expect(parseRange("3–6 months")).toEqual({ low: 3, high: 6, unit: "months" });
    expect(parseRange("1–2 weeks")).toEqual({ low: 1, high: 2, unit: "weeks" });
  });
});

describe("digitsBetween", () => {
  it("lists every digit a reel rolls through in either direction", () => {
    expect(digitsBetween(3, 1)).toEqual([1, 2, 3]);
    expect(digitsBetween(2, 6)).toEqual([2, 3, 4, 5, 6]);
  });
});
