import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export const usePointerTilt = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !window.matchMedia?.(FINE_POINTER_QUERY).matches) return undefined;

    let frame = 0;
    let rect = null;

    const apply = (x, y) => {
      element.style.setProperty("--tilt-x", x.toFixed(3));
      element.style.setProperty("--tilt-y", y.toFixed(3));
    };

    const handleEnter = () => {
      rect = element.getBoundingClientRect();
    };

    const handleMove = (event) => {
      if (!rect?.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => apply(x, y));
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      rect = null;
      apply(0, 0);
    };

    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return ref;
};
