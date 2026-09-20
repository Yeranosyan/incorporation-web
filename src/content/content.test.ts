import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, it } from "vitest";
import { HERO } from "./hero";
import { MEMBERSHIP } from "./membership";
import { PRODUCT } from "./product";
import { LINKS } from "./site";

describe("site content", () => {
  it("uses HTTPS for every external link", () => {
    Object.values(LINKS)
      .filter((href) => href.startsWith("http"))
      .forEach((href) => expect(href.startsWith("https://")).toBe(true));
  });

  it("gives every lifecycle stage a unique id", () => {
    const ids = HERO.lifecycle.stages.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps quote cycle ranges within the chart scale", () => {
    PRODUCT.cycle.rows.forEach(({ from, to }) => {
      expect(from).toBeGreaterThanOrEqual(1);
      expect(to).toBeLessThanOrEqual(PRODUCT.cycle.scale);
      expect(from).toBeLessThanOrEqual(to);
    });
  });

  it("ships the CPQ Teams logo as a static file", () => {
    const logoPath = resolve(cwd(), "public", PRODUCT.logo.replace(/^\//, ""));
    expect(PRODUCT.logo.endsWith(".svg")).toBe(true);
    expect(existsSync(logoPath)).toBe(true);
  });

  it("gives every CPQ Teams portal four specs and meters within their totals", () => {
    PRODUCT.portals.forEach(({ specs, meters }) => {
      expect(specs).toHaveLength(4);
      meters.forEach(({ value, total }) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(total);
      });
    });
  });

  it("keeps the FEA listing number off the membership credential", () => {
    const listingId = new URL(LINKS.feaProfile).searchParams.get("sid");
    MEMBERSHIP.credential.layers.forEach(({ label, value }) => {
      expect(value).not.toContain(listingId);
      expect(label).not.toMatch(/listing/i);
    });
  });

  it("gives every CPQ Teams portal a unique id", () => {
    const ids = PRODUCT.portals.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
