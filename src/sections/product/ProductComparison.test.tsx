import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PRODUCT } from "@/content/product";
import { ProductComparison } from "./ProductComparison";

const { comparison } = PRODUCT;

const renderComparison = (focus: number) => render(<ProductComparison comparison={comparison} focus={focus} />);

const placesOf = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-row]")].map(
    (row) => row.querySelector<HTMLElement>(".comparison-line")!.dataset.place,
  );

describe("ProductComparison", () => {
  it("keeps every contrast in an accessible table", () => {
    renderComparison(0);
    const table = screen.getByRole("table", { name: `${comparison.beforeLabel} and ${comparison.afterLabel}` });
    expect(within(table).getAllByRole("row")).toHaveLength(comparison.rows.length + 1);
  });

  it("shows only the focused statement, with earlier ones passed and later ones waiting", () => {
    const { container } = renderComparison(2);
    expect(placesOf(container)).toEqual(["past", "past", "current", "next"]);
  });

  it("counts the focused statement out of all four", () => {
    const { container } = renderComparison(1);
    const reel = container.querySelector<HTMLElement>(".comparison-count .digit-reel")!;
    expect(reel.style.getPropertyValue("--digit")).toBe("1");
    expect(reel.children[1]).toHaveTextContent("02");
    expect(container.querySelector(".comparison-count")).toHaveTextContent(`/ 0${comparison.rows.length}`);
  });

  it("morphs only the changed words of a statement", () => {
    const { container } = renderComparison(0);
    const [first] = container.querySelectorAll(".comparison-line");
    expect(first.querySelector(".comparison-out")).toHaveTextContent("3–6 months");
    expect(first.querySelector(".comparison-in")).toHaveTextContent("1–2 weeks");
    expect(first.querySelector(".comparison-shared")).toHaveTextContent("per quote cycle");
  });
});
