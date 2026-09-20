import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PRODUCT } from "@/content/product";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import { buildSyncScene } from "@/lib/syncScene";
import { mediaQuery } from "@/test/dom";
import { SyncDiagram, WIDE_SCENE_QUERY } from "./SyncDiagram";

const { integration } = PRODUCT;

const mockMedia = (initial: string[]) => {
  let matching = initial;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    ...mediaQuery(matching.includes(query), query),
    addEventListener: (_: string, listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_: string, listener: () => void) => {
      listeners.delete(listener);
    },
  }) as MediaQueryList);
  return (next: string[]) => {
    matching = next;
    act(() => listeners.forEach((listener) => listener()));
  };
};

const playFor = (seconds: number) => act(() => vi.advanceTimersByTime(seconds * 1000));

const renderDiagram = () => render(<SyncDiagram integration={integration} />);

const digitsOf = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>(".digit-reel")].map((reel) => reel.style.getPropertyValue("--digit"));

const leftSideOf = (node: Element) => node.querySelector("[data-side='left']")!.getAttribute("d");

const visibleSlabsOf = (container: HTMLElement) =>
  [...container.querySelectorAll<SVGGElement>("[data-slot]")].filter((node) => node.style.visibility === "visible");

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
    expect(leftSideOf(container.querySelector("[data-write]")!)).toBe(cap.left);
  });
});
