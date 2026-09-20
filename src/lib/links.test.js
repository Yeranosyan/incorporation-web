import { describe, expect, it } from "vitest";
import { linkTargetProps } from "./links";

describe("linkTargetProps", () => {
  it("opens external links in a new tab without an opener reference", () => {
    expect(linkTargetProps({ external: true })).toEqual({ target: "_blank", rel: "noopener noreferrer" });
  });

  it("adds no attributes to internal links", () => {
    expect(linkTargetProps()).toEqual({ target: undefined, rel: undefined });
  });
});
