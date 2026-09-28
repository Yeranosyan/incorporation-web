import { describe, expect, it } from "vitest";
import { GTAG_SCRIPT_URL, analyticsPlugin, buildAnalyticsTags } from "./analyticsPlugin.ts";

describe("buildAnalyticsTags", () => {
  it("injects nothing when the measurement ID is not set", () => {
    expect(buildAnalyticsTags({})).toEqual([]);
    expect(buildAnalyticsTags({ GA_MEASUREMENT_ID: "" })).toEqual([]);
  });

  it("loads gtag.js and configures the measurement ID from the environment", () => {
    const [loader, bootstrap] = buildAnalyticsTags({ GA_MEASUREMENT_ID: "G-TEST123" });
    expect(loader.attrs).toEqual({ async: true, src: `${GTAG_SCRIPT_URL}?id=G-TEST123` });
    expect(bootstrap.children).toContain('gtag("config", "G-TEST123");');
  });

  it("rejects a value that is not a measurement ID instead of writing it into the page", () => {
    expect(() => buildAnalyticsTags({ GA_MEASUREMENT_ID: 'G-X");alert(1);//' })).toThrow(/GA_MEASUREMENT_ID/);
    expect(() => buildAnalyticsTags({ GA_MEASUREMENT_ID: "UA-12345-1" })).toThrow(/GA_MEASUREMENT_ID/);
  });
});

describe("analyticsPlugin", () => {
  it("runs only in builds, never on the dev server, and injects ahead of the stylesheet and app script", () => {
    expect(analyticsPlugin({ GA_MEASUREMENT_ID: "G-TEST123" })).toMatchObject({
      name: "onecodio-google-analytics",
      apply: "build",
      transformIndexHtml: { order: "pre" },
    });
  });
});
