import { describe, expect, it } from "vitest";
import { buildCycleChart } from "./cycleChart";

const bands = [{ from: 12, to: 26 }];

describe("buildCycleChart", () => {
  it("draws a flatter chart on wide screens", () => {
    expect(buildCycleChart("wide", 26, bands).aspect).toBeGreaterThan(buildCycleChart("compact", 26, bands).aspect);
  });

  it("places the axis from the first to the last week inside the drawing", () => {
    const chart = buildCycleChart("wide", 26, bands);
    const start = chart.axisPercent(0);
    const end = chart.axisPercent(26);
    expect(start).toBeGreaterThan(0);
    expect(end).toBeLessThan(100);
    expect(chart.axisPercent(13)).toBeCloseTo((start + end) / 2);
  });

  it("marks where each original band sat", () => {
    expect(buildCycleChart("wide", 26, bands).ghost).toHaveLength(bands.length);
  });

  it("grows a slab with the weeks it spans", () => {
    const chart = buildCycleChart("wide", 26, bands);
    expect(chart.slab(12, 26, 0).front).not.toEqual(chart.slab(0, 2, 0).front);
    expect(chart.seams([13, 14, 15], 0).match(/M/g)).toHaveLength(3);
  });

  it("anchors the label to the slab's left edge", () => {
    const chart = buildCycleChart("compact", 26, bands);
    const [early] = chart.tagAt(12, 0);
    const [late] = chart.tagAt(0, 0);
    expect(late).toBeLessThan(early);
  });
});
