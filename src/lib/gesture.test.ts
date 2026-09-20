import { describe, expect, it } from "vitest";
import {
  clamp,
  createVelocityTracker,
  nearestIndex,
  projectMomentum,
  resistBounds,
  rubberband,
} from "./gesture";

describe("clamp", () => {
  it("limits a value to the given range", () => {
    expect(clamp(-4, 0, 10)).toBe(0);
    expect(clamp(4, 0, 10)).toBe(4);
    expect(clamp(40, 0, 10)).toBe(10);
  });
});

describe("projectMomentum", () => {
  it("returns zero for a stationary release", () => {
    expect(projectMomentum(0)).toBe(0);
  });

  it("projects the resting distance in the direction of travel", () => {
    expect(projectMomentum(1000)).toBeCloseTo(499);
    expect(projectMomentum(-1000)).toBeCloseTo(-499);
  });
});

describe("rubberband", () => {
  it("returns less movement than the raw overshoot", () => {
    const resisted = rubberband(120, 400);
    expect(resisted).toBeGreaterThan(0);
    expect(resisted).toBeLessThan(120);
  });

  it("increases resistance the further the overshoot travels", () => {
    const near = rubberband(40, 400) / 40;
    const far = rubberband(400, 400) / 400;
    expect(far).toBeLessThan(near);
  });
});

describe("resistBounds", () => {
  it("passes values inside the bounds through unchanged", () => {
    expect(resistBounds(50, 0, 100, 400)).toBe(50);
  });

  it("resists values beyond either bound", () => {
    const below = resistBounds(-80, 0, 100, 400);
    const above = resistBounds(180, 0, 100, 400);
    expect(below).toBeGreaterThan(-80);
    expect(below).toBeLessThan(0);
    expect(above).toBeGreaterThan(100);
    expect(above).toBeLessThan(180);
  });
});

describe("nearestIndex", () => {
  it("selects the closest snap point", () => {
    expect(nearestIndex([0, 100, 200], 140)).toBe(1);
    expect(nearestIndex([0, 100, 200], 160)).toBe(2);
    expect(nearestIndex([0, 100, 200], -500)).toBe(0);
  });
});

describe("createVelocityTracker", () => {
  it("measures velocity in pixels per second", () => {
    const tracker = createVelocityTracker();
    tracker.add(0, 0);
    tracker.add(50, 50);
    expect(tracker.velocity()).toBe(1000);
  });

  it("discards samples outside the measurement window", () => {
    const tracker = createVelocityTracker(100);
    tracker.add(0, 0);
    tracker.add(100, 200);
    tracker.add(110, 250);
    expect(tracker.velocity()).toBe(200);
  });

  it("reports zero after a reset", () => {
    const tracker = createVelocityTracker();
    tracker.add(0, 0);
    tracker.add(80, 40);
    tracker.reset();
    expect(tracker.velocity()).toBe(0);
  });
});
