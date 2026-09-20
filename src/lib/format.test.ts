import { describe, expect, it } from "vitest";
import { formatTemplate, padNumber, percentOf } from "./format";

describe("padNumber", () => {
  it("rounds and left-pads with zeros", () => {
    expect(padNumber(1.6, 2)).toBe("02");
    expect(padNumber(11, 2)).toBe("11");
    expect(padNumber(7)).toBe("7");
  });
});

describe("percentOf", () => {
  it("expresses a value as a CSS percentage of a total", () => {
    expect(percentOf(13, 26)).toBe("50%");
    expect(percentOf(0, 26)).toBe("0%");
  });
});

describe("formatTemplate", () => {
  it("replaces named placeholders with their values", () => {
    expect(formatTemplate("Thank you, {name}. Reply to {email}.", { name: "Ada", email: "ada@example.com" })).toBe(
      "Thank you, Ada. Reply to ada@example.com.",
    );
  });

  it("leaves unknown placeholders untouched", () => {
    expect(formatTemplate("Limit {max} of {unknown}", { max: 120 })).toBe("Limit 120 of {unknown}");
  });
});
