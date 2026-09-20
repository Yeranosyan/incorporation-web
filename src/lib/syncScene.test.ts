import { describe, expect, it } from "vitest";
import { SYNC_LAYER_COUNT, buildSyncScene, hangingSides } from "./syncScene";
import type { SyncScene } from "./syncScene";

const spread = ({ anchors }: SyncScene) => anchors.targetX - anchors.sourceX;

const verticalSpan = (path: string) => {
  const ys = [...path.matchAll(/-?[\d.]+ (-?[\d.]+)/g)].map(([, y]) => Number(y));
  return Math.max(...ys) - Math.min(...ys);
};

describe("buildSyncScene", () => {
  it("spreads the two systems further apart on wide screens", () => {
    const wide = buildSyncScene("wide");
    const compact = buildSyncScene("compact");
    expect(spread(wide)).toBeGreaterThan(spread(compact));
    expect(wide.aspect).toBeGreaterThan(compact.aspect);
  });

  it("anchors captions inside the drawing", () => {
    const { anchors } = buildSyncScene("wide");
    Object.values(anchors).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it("stacks one record layer per synced data type", () => {
    const { record } = buildSyncScene("wide");
    expect(record.numerals).toHaveLength(SYNC_LAYER_COUNT);
    expect(record.seams).toHaveLength(SYNC_LAYER_COUNT - 1);
  });

  it("clips the CPQ Teams glass to two percentage polygons", () => {
    const { glass } = buildSyncScene("compact");
    expect(glass.clipLeft).toMatch(/^polygon\(.+%\)$/);
    expect(glass.clipRight).toMatch(/^polygon\(.+%\)$/);
  });
});

describe("hangingSides", () => {
  it("draws taller sides for a deeper slab", () => {
    const shallow = hangingSides(100, 4);
    const deep = hangingSides(100, 20);
    expect(verticalSpan(deep.left) - verticalSpan(shallow.left)).toBeCloseTo(16);
    expect(verticalSpan(deep.right) - verticalSpan(shallow.right)).toBeCloseTo(16);
  });
});
