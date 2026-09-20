import { describe, expect, it } from "vitest";
import { resolveKeyIndex } from "./keyboard";

describe("resolveKeyIndex", () => {
  it("moves forward and backward with the arrow keys", () => {
    expect(resolveKeyIndex("ArrowRight", 1, 3)).toBe(2);
    expect(resolveKeyIndex("ArrowDown", 1, 3)).toBe(2);
    expect(resolveKeyIndex("ArrowLeft", 1, 3)).toBe(0);
    expect(resolveKeyIndex("ArrowUp", 1, 3)).toBe(0);
  });

  it("jumps to the first and last index with Home and End", () => {
    expect(resolveKeyIndex("Home", 2, 3)).toBe(0);
    expect(resolveKeyIndex("End", 0, 3)).toBe(2);
  });

  it("stops at the edges unless wrapping is enabled", () => {
    expect(resolveKeyIndex("ArrowRight", 2, 3)).toBe(2);
    expect(resolveKeyIndex("ArrowLeft", 0, 3)).toBe(0);
    expect(resolveKeyIndex("ArrowRight", 2, 3, { wrap: true })).toBe(0);
    expect(resolveKeyIndex("ArrowLeft", 0, 3, { wrap: true })).toBe(2);
  });

  it("ignores vertical arrows for horizontal-only widgets", () => {
    expect(resolveKeyIndex("ArrowDown", 0, 3, { horizontalOnly: true })).toBeNull();
    expect(resolveKeyIndex("ArrowRight", 0, 3, { horizontalOnly: true })).toBe(1);
  });

  it("returns null for keys that do not navigate", () => {
    expect(resolveKeyIndex("Enter", 1, 3)).toBeNull();
  });
});
