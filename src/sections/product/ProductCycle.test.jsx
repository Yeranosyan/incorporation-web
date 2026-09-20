import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PRODUCT } from "@/content/product";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import { ProductCycle } from "./ProductCycle";

const { cycle, highlights, comparison } = PRODUCT;

const mockMedia = (matching) =>
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: matching.includes(query),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

const renderCycle = () =>
  render(<ProductCycle cycle={cycle} highlights={highlights} comparison={comparison} />);

describe("ProductCycle", () => {
  it("describes both quote cycles in the chart", () => {
    mockMedia([]);
    renderCycle();
    const chart = screen.getByRole("img", { name: new RegExp(cycle.label) });
    cycle.rows.forEach(({ label, value }) => expect(chart).toHaveAccessibleName(expect.stringContaining(`${label}: ${value}`)));
  });

  it("compares every row before and with CPQ Teams in a table", () => {
    mockMedia([]);
    renderCycle();
    const table = screen.getByRole("table", { name: `${comparison.beforeLabel} and ${comparison.afterLabel}` });
    expect(within(table).getAllByRole("columnheader").map((header) => header.textContent)).toEqual([
      comparison.beforeLabel,
      comparison.afterLabel,
    ]);
    comparison.rows.forEach(({ before, after }) => {
      const row = within(table).getByRole("row", { name: new RegExp(before) });
      expect(within(row).getAllByRole("cell").map((cell) => cell.textContent)).toEqual([
        expect.stringContaining(before),
        after,
      ]);
    });
  });

  it("lists every highlight with its value", () => {
    mockMedia([]);
    renderCycle();
    highlights.forEach(({ value, label }) => {
      const item = screen.getByText(label).closest("li");
      expect(item).toHaveTextContent(`${value}${label}`);
    });
  });

  it("shows the collapsed cycle and every row switched when motion is reduced", () => {
    mockMedia([REDUCED_MOTION_QUERY]);
    const { container } = renderCycle();
    const reels = [...container.querySelectorAll(".cycle-readout .digit-reel")];
    const shown = reels.map((reel) => reel.children[Number(reel.style.getPropertyValue("--digit"))].textContent);
    expect(shown).toEqual(["1", "2"]);
    const switches = [...container.querySelectorAll("[data-row]")].map((row) => row.style.getPropertyValue("--switch"));
    expect(switches).toEqual(comparison.rows.map(() => "1.0000"));
  });
});
