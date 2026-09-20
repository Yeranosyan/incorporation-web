import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Crossfade } from "./Crossfade";

const items = ["Discovery", "Delivery", "Operation"];

const renderCrossfade = (active: number) =>
  render(
    <Crossfade items={items} active={active}>
      {(item) => <span>{item}</span>}
    </Crossfade>,
  );

const itemOf = (text: string) => screen.getByText(text).closest<HTMLElement>("[data-active]")!;

describe("Crossfade", () => {
  it("keeps every item mounted in the same grid cell", () => {
    renderCrossfade(1);
    items.forEach((item) => expect(itemOf(item)).toHaveClass("crossfade-item"));
  });

  it("exposes only the active item to assistive technology and focus", () => {
    renderCrossfade(1);
    expect(itemOf("Delivery")).toHaveAttribute("data-active", "true");
    expect(itemOf("Delivery")).not.toHaveAttribute("aria-hidden");
    expect(itemOf("Discovery")).toHaveAttribute("aria-hidden", "true");
    expect(itemOf("Discovery")).toHaveAttribute("inert");
  });

  it("offsets inactive items toward the side they sit on", () => {
    renderCrossfade(1);
    expect(itemOf("Discovery").style.getPropertyValue("--offset")).toBe("-1");
    expect(itemOf("Delivery").style.getPropertyValue("--offset")).toBe("0");
    expect(itemOf("Operation").style.getPropertyValue("--offset")).toBe("1");
  });
});
