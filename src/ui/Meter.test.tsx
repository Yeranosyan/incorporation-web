import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meter } from "./Meter";

describe("Meter", () => {
  it("exposes its value as an accessible meter", () => {
    render(<Meter label="Editable fields" value={3} total={5} />);
    const meter = screen.getByRole("meter", { name: "Editable fields" });
    expect(meter).toHaveAttribute("aria-valuenow", "3");
    expect(meter).toHaveAttribute("aria-valuemax", "5");
    expect(screen.getByText("3 / 5")).toBeInTheDocument();
  });

  it("fills in proportion to the value when active", () => {
    const { container } = render(<Meter label="In-app" value={11} total={15} />);
    const fill = container.querySelector<HTMLElement>("[data-meter-fill]")!;
    expect(fill.style.clipPath).toContain(`${(1 - 11 / 15) * 100}%`);
  });

  it("stays empty until it becomes active", () => {
    const { container } = render(<Meter label="Locked" value={2} total={5} active={false} />);
    expect(container.querySelector<HTMLElement>("[data-meter-fill]")!.style.clipPath).toContain("100%");
  });
});
