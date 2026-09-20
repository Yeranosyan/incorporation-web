import { describe, expect, it } from "vitest";
import { splitContrast } from "./contrast";
import type { ContrastWord } from "./contrast";

const wordsOf = (placed: ContrastWord[]) => placed.map(({ word }) => word);

describe("splitContrast", () => {
  it("keeps the words both phrases share and swaps only the rest", () => {
    const contrast = splitContrast("3–6 months per quote cycle", "1–2 weeks per quote cycle");
    expect(contrast.head).toEqual([]);
    expect(wordsOf(contrast.before)).toEqual(["3–6", "months"]);
    expect(wordsOf(contrast.after)).toEqual(["1–2", "weeks"]);
    expect(contrast.tail).toEqual(["per", "quote", "cycle"]);
  });

  it("swaps the whole phrase when nothing is shared", () => {
    const contrast = splitContrast("Email threads and phone calls", "One place for every request and change");
    expect(contrast.head).toEqual([]);
    expect(contrast.tail).toEqual([]);
    expect(wordsOf(contrast.before).join(" ")).toBe("Email threads and phone calls");
    expect(wordsOf(contrast.after).join(" ")).toBe("One place for every request and change");
  });

  it("never treats a whole phrase as shared", () => {
    const contrast = splitContrast("per quote", "per quote");
    expect(contrast.before.length).toBeGreaterThan(0);
    expect(contrast.after.length).toBeGreaterThan(0);
  });

  it("staggers words from the start to the end of the changed span", () => {
    const { before, after } = splitContrast("100–200 page PDFs to review", "A live quote, approved in two clicks");
    [before, after].forEach((words) => {
      const positions = words.map(({ at }) => at);
      expect(positions[0]).toBe(0);
      expect(positions).toEqual([...positions].sort((a, b) => a - b));
      positions.forEach((at) => expect(at).toBeLessThanOrEqual(1));
    });
  });
});
