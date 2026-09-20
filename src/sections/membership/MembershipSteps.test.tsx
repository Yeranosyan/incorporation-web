import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MEMBERSHIP } from "@/content/membership";
import { MembershipSteps } from "./MembershipSteps";

const { credential } = MEMBERSHIP;

describe("MembershipSteps", () => {
  it("lists every credential fact and description for assistive technology, whatever the scroll step", () => {
    const { container } = render(<MembershipSteps credential={credential} step={0} onSelect={() => {}} />);
    expect(container.querySelector("dl")).toHaveAttribute("aria-label", credential.label);
    credential.layers.forEach(({ label, value, description }) => {
      expect(screen.getByText(label, { selector: "dt" })).toBeInTheDocument();
      expect(screen.getByText(value, { selector: "dd" })).toBeInTheDocument();
      expect(screen.getByText(description, { selector: "dd" })).toBeInTheDocument();
    });
  });

  it("marks the current step and jumps to a step when it is chosen", async () => {
    const onSelect = vi.fn();
    render(<MembershipSteps credential={credential} step={2} onSelect={onSelect} />);
    const steps = screen.getAllByRole("button");
    expect(steps.map((button) => button.getAttribute("aria-current"))).toEqual([null, null, "step", null]);

    await userEvent.click(steps[3]);
    expect(onSelect).toHaveBeenCalledWith(3);
  });
});
