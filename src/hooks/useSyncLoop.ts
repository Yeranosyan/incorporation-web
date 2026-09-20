import { useEffect, useRef, useState } from "react";
import { padNumber } from "@/lib/format";
import { project } from "@/lib/isometric";
import { prefersReducedMotion } from "@/lib/motion";
import { observeIntersection } from "@/lib/observe";
import { hangingSides } from "@/lib/syncScene";
import type { SyncMotion } from "@/lib/syncScene";
import { SYNC_CYCLE, SYNC_POOL, SYNC_STILL_TIME, syncFrameAt } from "@/lib/syncTimeline";
import type { SyncFrame } from "@/lib/syncTimeline";

export type SyncStatus = { order: string; read: number; active: number; written: number };

type Placement = SyncFrame["write"];

const MAX_FRAME_SECONDS = 1 / 20;
const HIDDEN_BELOW = 0.05;
const RESIZE_TOLERANCE = 0.02;

const INITIAL_ORDER = Array.from({ length: SYNC_POOL }, (_, slot) => slot).join("");

const INITIAL_STATUS: SyncStatus = { order: INITIAL_ORDER, read: 0, active: 0, written: 0 };

const heights = new WeakMap<Element, number>();

const place = (node: SVGGElement | null, { cx, cy, top, depth, clip, opacity }: Placement, size: number) => {
  if (!node) return;
  const visible = top - Math.max(top - depth, clip);
  if (visible < HIDDEN_BELOW || opacity <= 0) {
    node.style.visibility = "hidden";
    return;
  }
  const [x, y] = project([cx, cy, top]);
  node.style.visibility = "visible";
  node.style.opacity = opacity >= 1 ? "" : opacity.toFixed(3);
  node.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
  const height = Math.min(visible, depth);
  if (Math.abs((heights.get(node) ?? depth) - height) > RESIZE_TOLERANCE) {
    heights.set(node, height);
    const sides = hangingSides(size, height);
    node.querySelector("[data-side='left']")?.setAttribute("d", sides.left);
    node.querySelector("[data-side='right']")?.setAttribute("d", sides.right);
  }
};

export const useSyncLoop = <T extends Element = SVGSVGElement>(motion: SyncMotion) => {
  const ref = useRef<T>(null);
  const [status, setStatus] = useState(INITIAL_STATUS);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const slots = Array.from({ length: SYNC_POOL }, (_, slot) =>
      root.querySelector<SVGGElement>(`[data-slot="${slot}"]`),
    );
    const write = root.querySelector<SVGGElement>("[data-write]");
    const numerals = [...root.querySelectorAll("[data-numeral]")];
    const still = prefersReducedMotion();
    let clock = still ? SYNC_STILL_TIME : 0;
    let frame = 0;
    let previous = 0;
    let last = "";

    const draw = () => {
      const scene = syncFrameAt(clock, motion);
      scene.reads.forEach((state) => {
        const node = slots[state.slot];
        place(node, state, motion.size);
        const label = node?.querySelector("text");
        const text = padNumber(state.type + 1, 2);
        if (label && label.textContent !== text) label.textContent = text;
      });
      place(write, scene.write, motion.size);
      scene.lit.forEach((lit, index) => numerals[index]?.setAttribute("data-lit", String(lit)));
      const key = `${scene.order}-${scene.read}-${scene.written}`;
      if (key !== last) {
        last = key;
        setStatus({ order: scene.order, read: scene.read, active: scene.active, written: scene.written });
      }
    };

    const tick = (now: number) => {
      clock += Math.min((now - previous) / 1000, MAX_FRAME_SECONDS);
      if (clock > SYNC_CYCLE * SYNC_POOL * 100) clock -= SYNC_CYCLE * SYNC_POOL * 100;
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (still || frame) return;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    draw();
    const stop = observeIntersection(root, ({ isIntersecting }) => (isIntersecting ? play() : pause()), "0px");

    return () => {
      pause();
      stop();
    };
  }, [motion]);

  return [ref, status] as const;
};
