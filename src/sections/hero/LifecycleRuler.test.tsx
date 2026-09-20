import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LifecycleRuler } from "./LifecycleRuler";

const content = {
  label: "Engagement lifecycle",
  hint: "Drag the ruler",
  stages: [
    { id: "discovery", name: "Discovery", summary: "First stage summary" },
    { id: "delivery", name: "Delivery", summary: "Second stage summary" },
    { id: "operation", name: "Operation", summary: "Third stage summary" },
  ],
};

const renderSlider = () => {
  render(<LifecycleRuler content={content} />);
  return screen.getByRole("slider", { name: content.label });
};

const copyOf = (summary: string) => screen.getByText(summary).closest("[data-active]");

const expectActiveStage = (slider: HTMLElement, position: number) => {
  const stage = content.stages[position];
  expect(slider).toHaveAttribute("aria-valuenow", String(position + 1));
  expect(slider).toHaveAttribute("aria-valuetext", stage.name);
  expect(copyOf(stage.summary)).toHaveAttribute("data-active", "true");
  content.stages
    .filter((_, index) => index !== position)
    .forEach(({ summary }) => expect(copyOf(summary)).toHaveAttribute("data-active", "false"));
};

describe("LifecycleRuler", () => {
  it("starts on the first stage", () => {
    const slider = renderSlider();
    expect(slider).toHaveAttribute("aria-valuemax", "3");
    expectActiveStage(slider, 0);
  });

  it("moves between stages with the arrow keys", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expectActiveStage(slider, 1);
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expectActiveStage(slider, 0);
  });

  it("jumps straight to the last and first stage with End and Home", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "End" });
    expectActiveStage(slider, 2);
    fireEvent.keyDown(slider, { key: "Home" });
    expectActiveStage(slider, 0);
  });

  it("announces the selected stage once through a live region", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "End" });
    expect(screen.getByText("Operation. Third stage summary")).toHaveAttribute("aria-live", "polite");
  });

  it("stays within the available stages", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expectActiveStage(slider, 0);
  });

  it("ignores keys that do not navigate", () => {
    const slider = renderSlider();
    fireEvent.keyDown(slider, { key: "Enter" });
    expectActiveStage(slider, 0);
  });
});
