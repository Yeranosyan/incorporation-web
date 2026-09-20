import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PRODUCT } from "@/content/product";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import { buildSyncScene } from "@/lib/syncScene";
import { SyncDiagram, WIDE_SCENE_QUERY } from "./SyncDiagram";

const { integration } = PRODUCT;

const mockMedia = (initial) => {
  let matching = initial;
  const listeners = new Set();
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: matching.includes(query),
    media: query,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  }));
  return (next) => {
    matching = next;
    act(() => listeners.forEach((listener) => listener()));
  };
};

const playFor = (seconds) => act(() => vi.advanceTimersByTime(seconds * 1000));

const renderDiagram = () => render(<SyncDiagram integration={integration} />);

const digitsOf = (container) =>
  [...container.querySelectorAll(".digit-reel")].map((reel) => reel.style.getPropertyValue("--digit"));

const leftSideOf = (node) => node.querySelector("[data-side='left']").getAttribute("d");

const visibleSlabsOf = (container) =>
  [...container.querySelectorAll("[data-slot]")].filter((node) => node.style.visibility === "visible");

describe("SyncDiagram", () => {
  afterEach(() => vi.useRealTimers());

  it("names both systems inside the described diagram", () => {
    mockMedia([]);
    renderDiagram();
    const diagram = screen.getByRole("img", { name: integration.diagramLabel });
    expect(diagram).toHaveTextContent(integration.source.name);
    expect(diagram).toHaveTextContent(integration.target.name);
  });

  it("shows the completed sync when motion is reduced", () => {
    mockMedia([REDUCED_MOTION_QUERY, WIDE_SCENE_QUERY]);
    const { container } = renderDiagram();
    expect(digitsOf(container)).toEqual([String(integration.inbound.length), "1"]);
    expect(container.querySelectorAll('[data-numeral][data-lit="true"]')).toHaveLength(integration.inbound.length);
  });

  it("numbers the record layers only on wide screens", () => {
    mockMedia([]);
    const { container } = renderDiagram();
    expect(container.querySelectorAll("[data-numeral]")).toHaveLength(0);
  });

  it("redraws blocks at full depth when the layout changes mid-cycle", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    const changeMedia = mockMedia([WIDE_SCENE_QUERY]);
    const { container } = renderDiagram();
    playFor(10.5);
    changeMedia([]);
    const { slab, cap } = buildSyncScene("compact");
    const stacked = visibleSlabsOf(container);
    expect(stacked.map(leftSideOf)).toEqual(stacked.map(() => slab.left));
    playFor(7.6);
    expect(leftSideOf(container.querySelector("[data-write]"))).toBe(cap.left);
  });
});
