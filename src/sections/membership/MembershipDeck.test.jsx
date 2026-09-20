import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MEMBERSHIP } from "@/content/membership";
import { MembershipDeck } from "./MembershipDeck";

const { layers } = MEMBERSHIP.credential;

const statesAt = (step) => {
  const { container, unmount } = render(<MembershipDeck layers={layers} step={step} />);
  const states = [...container.querySelectorAll(".membership-card")].map((card) => card.dataset.state);
  unmount();
  return states;
};

describe("MembershipDeck", () => {
  it("draws one card per fact inside a deck hidden from assistive technology", () => {
    const { container } = render(<MembershipDeck layers={layers} step={0} />);
    expect(container.querySelector(".membership-deck").closest('[aria-hidden="true"]')).not.toBeNull();
    const cards = [...container.querySelectorAll(".membership-card-value")];
    expect(cards.map((card) => card.textContent)).toEqual(layers.map(({ value }) => value));
  });

  it("stacks the cards reached so far and keeps later cards waiting", () => {
    expect(statesAt(0)).toEqual(["front", "pending", "pending", "pending"]);
    expect(statesAt(1)).toEqual(["behind", "front", "pending", "pending"]);
    expect(statesAt(3)).toEqual(["buried", "behind", "behind", "front"]);
  });
});
