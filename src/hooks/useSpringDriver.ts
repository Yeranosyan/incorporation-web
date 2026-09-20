import { useEffect, useMemo, useRef } from "react";
import { isSpringSettled, stepSpring } from "@/lib/spring";
import type { SpringConfig, SpringState } from "@/lib/spring";

export type SpringDriver = {
  set: (value: number) => void;
  animateTo: (target: number, config: SpringConfig, velocity?: number) => void;
  stop: () => void;
  read: () => number;
};

const MAX_FRAME_SECONDS = 1 / 20;

export const useSpringDriver = (onFrame: (value: number) => void): SpringDriver => {
  const state = useRef<SpringState>({ value: 0, velocity: 0 });
  const frame = useRef(0);
  const render = useRef(onFrame);

  useEffect(() => {
    render.current = onFrame;
  }, [onFrame]);

  const driver = useMemo(() => {
    const stop = () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };

    const set = (value: number) => {
      stop();
      state.current = { value, velocity: 0 };
      render.current(value);
    };

    const animateTo = (target: number, config: SpringConfig, velocity = state.current.velocity) => {
      stop();
      state.current = { value: state.current.value, velocity };
      let previous = performance.now();

      const tick = (now: number) => {
        const elapsed = Math.min((now - previous) / 1000, MAX_FRAME_SECONDS);
        previous = now;
        state.current = stepSpring(state.current, target, config, elapsed);

        if (isSpringSettled(state.current, target)) {
          state.current = { value: target, velocity: 0 };
          frame.current = 0;
          render.current(target);
          return;
        }

        render.current(state.current.value);
        frame.current = requestAnimationFrame(tick);
      };

      frame.current = requestAnimationFrame(tick);
    };

    const read = () => state.current.value;

    return { set, animateTo, stop, read };
  }, []);

  useEffect(() => driver.stop, [driver]);

  return driver;
};
