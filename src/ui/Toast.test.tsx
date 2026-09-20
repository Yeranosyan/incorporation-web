import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

const toast = { title: "Message sent", message: "The team will reply shortly." };

describe("Toast", () => {
  afterEach(() => vi.useRealTimers());

  it("announces the confirmation in a polite live region", () => {
    render(<Toast toast={toast} dismissLabel="Dismiss" onDismiss={() => {}} />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveTextContent("Message sent");
  });

  it("renders an empty live region when there is nothing to confirm", () => {
    render(<Toast toast={null} dismissLabel="Dismiss" onDismiss={() => {}} />);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("dismisses when the dismiss button is pressed", async () => {
    const onDismiss = vi.fn();
    render(<Toast toast={toast} dismissLabel="Dismiss" onDismiss={onDismiss} />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("dismisses itself after the configured duration", () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast toast={toast} dismissLabel="Dismiss" onDismiss={onDismiss} duration={3000} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
