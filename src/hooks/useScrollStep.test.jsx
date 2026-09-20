import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { useScrollStep } from "./useScrollStep";

const observers = [];

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = new Set();
    observers.push(this);
  }

  observe(target) {
    this.targets.add(target);
  }

  unobserve(target) {
    this.targets.delete(target);
  }

  disconnect() {}
}

const BAND = { top: 450, bottom: 460 };

function Probe() {
  const [ref, step, scrollToStep] = useScrollStep();
  return (
    <div ref={ref}>
      <output>{step}</output>
      <button type="button" onClick={() => scrollToStep(2)}>
        Go to step 3
      </button>
      {[0, 1, 2].map((index) => (
        <span key={index} data-step-marker />
      ))}
    </div>
  );
}

const report = (index, entry) => {
  const target = document.querySelectorAll("[data-step-marker]")[index];
  const observer = observers.find((candidate) => candidate.targets.has(target));
  act(() => observer.callback([{ target, rootBounds: BAND, ...entry }]));
};

describe("useScrollStep", () => {
  beforeAll(() => {
    globalThis.IntersectionObserver = MockIntersectionObserver;
  });

  it("exposes scroll progress through the steps as a CSS variable", async () => {
    const { container } = render(<Probe />);
    const marker = document.querySelectorAll("[data-step-marker]")[0];
    const band = window.innerHeight * 0.45;

    vi.spyOn(marker, "getBoundingClientRect").mockReturnValue({ top: band - 600, height: 400 });
    fireEvent.scroll(window);
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(container.firstChild.style.getPropertyValue("--scroll-progress")).toBe("1.500");

    vi.spyOn(marker, "getBoundingClientRect").mockReturnValue({ top: band + 200, height: 400 });
    fireEvent.scroll(window);
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(container.firstChild.style.getPropertyValue("--scroll-progress")).toBe("0.000");
  });

  it("scrolls a chosen marker into the center band", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<Probe />);
    const marker = document.querySelectorAll("[data-step-marker]")[2];
    vi.spyOn(marker, "getBoundingClientRect").mockReturnValue({ top: 1000, bottom: 1400 });

    fireEvent.click(screen.getByRole("button", { name: "Go to step 3" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000 + window.scrollY - window.innerHeight * 0.45 + 1, behavior: "smooth" });
  });

  it("follows the marker under the viewport center band", () => {
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("0");

    report(2, { isIntersecting: true, boundingClientRect: { top: 300, bottom: 700 } });
    expect(screen.getByRole("status")).toHaveTextContent("2");

    report(1, { isIntersecting: true, boundingClientRect: { top: 200, bottom: 600 } });
    expect(screen.getByRole("status")).toHaveTextContent("1");
  });

  it("holds the first step before the track and the last step after it", () => {
    render(<Probe />);

    report(2, { isIntersecting: true, boundingClientRect: { top: 300, bottom: 700 } });
    report(0, { isIntersecting: false, boundingClientRect: { top: 900, bottom: 1300 } });
    expect(screen.getByRole("status")).toHaveTextContent("0");

    report(2, { isIntersecting: false, boundingClientRect: { top: -600, bottom: -200 } });
    expect(screen.getByRole("status")).toHaveTextContent("2");
  });
});
