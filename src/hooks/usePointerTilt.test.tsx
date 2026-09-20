import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { domRect, mediaQuery } from "@/test/dom";
import { FINE_POINTER_QUERY, usePointerTilt } from "./usePointerTilt";

function Probe() {
  const ref = usePointerTilt();
  return <div ref={ref} data-testid="probe" />;
}

const mockPointer = (fine: boolean) =>
  vi.spyOn(window, "matchMedia").mockImplementation((query) => mediaQuery(fine && query === FINE_POINTER_QUERY, query));

const renderProbe = () => {
  render(<Probe />);
  const probe = screen.getByTestId("probe");
  probe.getBoundingClientRect = () => domRect({ left: 0, top: 0, width: 200, height: 100 });
  return probe;
};

const tiltOf = (probe: HTMLElement) => [
  probe.style.getPropertyValue("--tilt-x"),
  probe.style.getPropertyValue("--tilt-y"),
];

describe("usePointerTilt", () => {
  it("tilts toward the pointer on devices with a fine pointer", async () => {
    mockPointer(true);
    const probe = renderProbe();
    fireEvent.pointerEnter(probe);
    fireEvent.pointerMove(probe, { clientX: 200, clientY: 0 });
    await waitFor(() => expect(tiltOf(probe)).toEqual(["1.000", "-1.000"]));
  });

  it("returns to rest when the pointer leaves", async () => {
    mockPointer(true);
    const probe = renderProbe();
    fireEvent.pointerEnter(probe);
    fireEvent.pointerMove(probe, { clientX: 50, clientY: 75 });
    await waitFor(() => expect(tiltOf(probe)).toEqual(["-0.500", "0.500"]));
    fireEvent.pointerLeave(probe);
    expect(tiltOf(probe)).toEqual(["0.000", "0.000"]);
  });

  it("stays still on touch devices", () => {
    mockPointer(false);
    const probe = renderProbe();
    fireEvent.pointerEnter(probe);
    fireEvent.pointerMove(probe, { clientX: 200, clientY: 0 });
    expect(tiltOf(probe)).toEqual(["", ""]);
  });
});
