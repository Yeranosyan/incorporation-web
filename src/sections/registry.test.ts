import { describe, expect, it } from "vitest";
import { NAV_ITEMS, SECTIONS } from "./registry";

describe("section registry", () => {
  it("uses unique section ids", () => {
    const ids = SECTIONS.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("pairs every section with a component and its content", () => {
    SECTIONS.forEach(({ Component, content }) => {
      expect(typeof Component).toBe("function");
      expect(content).toBeTruthy();
    });
  });

  it("builds the navigation only from labelled sections, in page order", () => {
    expect(NAV_ITEMS.map(({ label }) => label)).toEqual([
      "Company",
      "CPQ Teams",
      "Industries",
      "Technology",
      "Principles",
      "Membership",
    ]);
  });
});
