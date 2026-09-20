import { describe, expect, it } from "vitest";
import { SPRINGS, isSpringSettled, springConfig, stepSpring } from "./spring";
import type { SpringConfig } from "./spring";

const simulate = (
  config: SpringConfig,
  from: number,
  target: number,
  velocity = 0,
  seconds = 2,
) => {
  let state = { value: from, velocity };
  let peak = from;
  for (let elapsed = 0; elapsed < seconds; elapsed += 1 / 60) {
    state = stepSpring(state, target, config, 1 / 60);
    peak = Math.max(peak, state.value);
  }
  return { state, peak };
};

describe("springConfig", () => {
  it("maps response and damping ratio to stiffness and friction", () => {
    const config = springConfig({ response: 1, damping: 1 });
    expect(config.stiffness).toBeCloseTo((2 * Math.PI) ** 2);
    expect(config.friction).toBeCloseTo(4 * Math.PI);
  });
});

describe("stepSpring", () => {
  it("settles a critically damped spring on its target without overshoot", () => {
    const { state, peak } = simulate(SPRINGS.settle, 0, 100);
    expect(isSpringSettled(state, 100)).toBe(true);
    expect(peak).toBeLessThanOrEqual(100.01);
  });

  it("overshoots an under-damped spring before it settles", () => {
    const { state, peak } = simulate(SPRINGS.momentum, 0, 100);
    expect(peak).toBeGreaterThan(100);
    expect(isSpringSettled(state, 100)).toBe(true);
  });

  it("continues in the direction of the initial velocity", () => {
    const next = stepSpring({ value: 0, velocity: 600 }, 0, SPRINGS.settle, 1 / 60);
    expect(next.value).toBeGreaterThan(0);
  });

  it("returns the same state when no time elapses", () => {
    const state = { value: 12, velocity: 3 };
    expect(stepSpring(state, 0, SPRINGS.settle, 0)).toEqual(state);
  });
});

describe("isSpringSettled", () => {
  it("rejects a state that is still moving", () => {
    expect(isSpringSettled({ value: 100, velocity: 40 }, 100)).toBe(false);
  });
});
