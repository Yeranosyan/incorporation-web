import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CountUp } from "./CountUp";

describe("CountUp", () => {
  it("exposes the padded final value to assistive technology", () => {
    const { container } = render(<CountUp value={11} pad={2} />);
    expect(container.querySelector(".sr-only")).toHaveTextContent("11");
  });

  it("hides the animated digits from assistive technology", () => {
    const { container } = render(<CountUp value={6} pad={2} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
