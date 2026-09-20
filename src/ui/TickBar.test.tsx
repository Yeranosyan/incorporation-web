import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TickBar } from "./TickBar";

describe("TickBar", () => {
  it("renders the requested number of ticks under an accessible label", () => {
    render(<TickBar count={12} label="Quote cycle" />);
    expect(screen.getByRole("img", { name: "Quote cycle" }).children).toHaveLength(12);
  });

  it("highlights only the ticks inside each range", () => {
    const { container } = render(
      <TickBar
        count={10}
        label="Ranges"
        ranges={[
          { from: 1, to: 2, tone: "accent" },
          { from: 6, to: 8, tone: "amber" },
        ]}
      />,
    );
    expect(container.querySelectorAll(".bg-accent")).toHaveLength(2);
    expect(container.querySelectorAll(".bg-amber")).toHaveLength(3);
  });
});
