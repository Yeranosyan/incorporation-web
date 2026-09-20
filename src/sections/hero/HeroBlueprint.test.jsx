import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBlueprint } from "./HeroBlueprint";

const modules = [
  { label: "Web application", tone: "accent" },
  { label: "Data platform", tone: "pearl" },
];

describe("HeroBlueprint", () => {
  it("stays out of the accessibility tree", () => {
    const { container } = render(<HeroBlueprint modules={modules} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("raises one highlighted block and tag per module", () => {
    const { container } = render(<HeroBlueprint modules={modules} />);
    expect(container.querySelectorAll(".blueprint-module")).toHaveLength(modules.length);
    expect(container.querySelectorAll(".blueprint-march")).toHaveLength(modules.length);
    modules.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });
});
