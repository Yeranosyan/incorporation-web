import { describe, expect, it } from "vitest";
import { buildScene, MODULE_CAPACITY } from "./blueprintScene";
import type { Block, BlueprintModule } from "./blueprintScene";

const modules = [
  { label: "Web application", tone: "accent" },
  { label: "Integration API", tone: "amber" },
] as const;

const liesInFrontOf = (front: Block, back: Block) =>
  back.x < front.x + front.w &&
  back.y < front.y + front.d &&
  (front.x >= back.x + back.w || front.y >= back.y + back.d);

describe("buildScene", () => {
  it("draws every block after the blocks it can cover", () => {
    const { blocks } = buildScene(modules);
    blocks.forEach(({ box: front }, frontIndex) =>
      blocks.forEach(({ box: back }, backIndex) => {
        if (liesInFrontOf(front, back)) expect(frontIndex).toBeGreaterThan(backIndex);
      }),
    );
  });

  it("highlights one block, footprint and tag per module", () => {
    const { blocks, footprints, tags } = buildScene(modules);
    expect(blocks.filter(({ tone }) => tone).map(({ tone }) => tone).sort()).toEqual(["accent", "amber"]);
    expect(footprints).toHaveLength(modules.length);
    expect(tags.map(({ label }) => label)).toEqual(modules.map(({ label }) => label));
  });

  it("keeps the lots in front of every module lower than the module", () => {
    const { blocks } = buildScene(modules);
    blocks
      .filter(({ tone }) => tone)
      .forEach(({ id, box }) => {
        const [i, j] = id.split("-").map(Number);
        const front = [`${i + 1}-${j}-`, `${i}-${j + 1}-`, `${i + 1}-${j + 1}-`];
        blocks
          .filter((block) => front.some((prefix) => block.id.startsWith(prefix)))
          .forEach((block) => expect(block.box.h).toBeLessThan(box.h));
      });
  });

  it("anchors every tag inside the drawing", () => {
    buildScene(modules).tags.forEach(({ right, top }) => {
      expect(right).toBeGreaterThan(0);
      expect(right).toBeLessThan(100);
      expect(top).toBeGreaterThan(0);
      expect(top).toBeLessThan(100);
    });
  });

  it("ignores modules beyond the available lots", () => {
    const extra: BlueprintModule[] = Array.from({ length: MODULE_CAPACITY + 2 }, (_, index) => ({
      label: `M${index}`,
      tone: "accent",
    }));
    expect(buildScene(extra).tags).toHaveLength(MODULE_CAPACITY);
  });
});
