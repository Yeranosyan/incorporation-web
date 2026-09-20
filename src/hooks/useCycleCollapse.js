import { useEffect, useRef, useState } from "react";
import {
  COLLAPSE_PHASES,
  clampUnit,
  collapseAt,
  ghostOpacity,
  reachOf,
  rowSwitchedAt,
  seamTarget,
  statementFocusAt,
} from "@/lib/cycleCollapse";
import { prefersReducedMotion } from "@/lib/motion";
import { observeIntersection } from "@/lib/observe";
import { springConfig, stepSpring } from "@/lib/spring";

const MAX_FRAME_SECONDS = 1 / 20;
const REST_DISTANCE = 0.0008;
const REST_VELOCITY = 0.004;
const FUSED_AT = 0.995;
const UNFUSED_BELOW = 0.96;
const EDGE_SPRING = springConfig({ response: 0.34, damping: 0.82 });
const FUSE_SPRING = springConfig({ response: 0.55, damping: 0.72 });
const SWITCH_SPRING = springConfig({ response: 0.5, damping: 0.76 });
const WAKE_MARGIN = "20% 0px 20% 0px";
const LAST_STATEMENT = COLLAPSE_PHASES.rows.length - 1;

const resting = (value) => ({ value, velocity: 0 });

const settle = (state, target, config, seconds) => {
  Object.assign(state, stepSpring(state, target, config, seconds));
  const settled = Math.abs(state.value - target) < REST_DISTANCE && Math.abs(state.velocity) < REST_VELOCITY;
  if (settled) Object.assign(state, resting(target));
  return settled;
};

export const useCycleCollapse = ({ chart, plan }) => {
  const trackRef = useRef(null);
  const [state, setState] = useState(() => (prefersReducedMotion() ? 1 : 0));
  const [focus, setFocus] = useState(() => (prefersReducedMotion() ? LAST_STATEMENT : 0));

  useEffect(() => {
    const track = trackRef.current;
    const stage = track?.querySelector("[data-stage]");
    if (!track || !stage) return undefined;

    const still = prefersReducedMotion();
    const reach = reachOf(plan);
    const parts = (name) => [...track.querySelectorAll(`[data-part="${name}"]`)];
    const faces = { front: parts("front"), top: parts("top"), right: parts("right"), rim: parts("rim") };
    const seamsPath = track.querySelector("[data-part='seams']");
    const liveSeam = track.querySelector("[data-part='live-seam']");
    const live = track.querySelector("[data-part='live']");
    const tag = track.querySelector("[data-part='tag']");
    const ghostTag = track.querySelector("[data-part='ghost-tag']");
    const rows = [...track.querySelectorAll("[data-row]")];

    const edges = plan.map(({ start, end }) => resting(still ? end : start));
    const fuse = resting(still ? 1 : 0);
    const switches = rows.map(() => resting(still ? 1 : 0));
    let fused = still;
    let current = still ? 1 : 0;
    let focused = still ? LAST_STATEMENT : 0;
    let frame = 0;
    let previous = 0;
    let active = false;

    const progressOf = () => {
      const trackBox = track.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      const distance = trackBox.height - stageBox.height;
      if (distance <= 1) return 1;
      return clampUnit((stageBox.top - trackBox.top) / distance);
    };

    const draw = () => {
      const positions = edges.map(({ value }) => value);
      const left = positions[0];
      const right = positions.at(-1);
      const slab = chart.slab(left, right, 0);
      const lit = clampUnit(fuse.value);
      Object.entries(faces).forEach(([name, nodes]) => nodes.forEach((path) => path.setAttribute("d", slab[name])));
      seamsPath.setAttribute("d", chart.seams(positions.slice(1, -1), 0));
      seamsPath.style.opacity = (1 - lit).toFixed(3);
      liveSeam.setAttribute("d", chart.seams([(left + right) / 2], 0));
      liveSeam.style.opacity = lit.toFixed(3);
      live.style.opacity = lit.toFixed(3);
      const [x, y] = chart.tagAt(left, 0);
      tag.style.translate = `${x.toFixed(2)}% ${y.toFixed(2)}%`;
      ghostTag.style.opacity = ghostOpacity(plan, left).toFixed(3);
      rows.forEach((row, index) => {
        row.style.setProperty("--switch", switches[index].value.toFixed(4));
        row.style.setProperty("--lit", clampUnit(switches[index].value).toFixed(4));
      });
    };

    const step = (seconds) => {
      const progress = progressOf();
      const travel = collapseAt(progress);
      let rest = true;

      edges.forEach((edge, index) => {
        if (!settle(edge, seamTarget(plan[index], travel, reach), EDGE_SPRING, seconds)) rest = false;
      });

      if (travel >= FUSED_AT) fused = true;
      if (travel < UNFUSED_BELOW) fused = false;
      const fuseTarget = fused ? 1 : 0;
      if (!settle(fuse, fuseTarget, FUSE_SPRING, seconds)) rest = false;

      const next = travel >= 0.5 ? 1 : 0;
      if (next !== current) {
        current = next;
        setState(next);
      }

      const nextFocus = statementFocusAt(progress);
      if (nextFocus !== focused) {
        focused = nextFocus;
        setFocus(nextFocus);
      }

      switches.forEach((change, index) => {
        const target = index === 0 ? fuseTarget : rowSwitchedAt(progress, index) ? 1 : 0;
        if (!settle(change, target, SWITCH_SPRING, seconds)) rest = false;
      });

      draw();
      return rest;
    };

    const tick = (now) => {
      const seconds = Math.min((now - previous) / 1000, MAX_FRAME_SECONDS);
      previous = now;
      frame = step(seconds) ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (still || frame || !active) return;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const syncHeight = () => {
      track.style.setProperty("--stage-height", `${stage.offsetHeight}px`);
      wake();
    };

    const sizer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(syncHeight);
    sizer?.observe(stage);
    syncHeight();
    draw();

    if (still) return () => sizer?.disconnect();

    const stopObserving = observeIntersection(
      track,
      ({ isIntersecting }) => {
        active = isIntersecting;
        if (active) wake();
      },
      WAKE_MARGIN,
    );
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);

    return () => {
      cancelAnimationFrame(frame);
      frame = 0;
      sizer?.disconnect();
      stopObserving();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [chart, plan]);

  return [trackRef, state, focus];
};
