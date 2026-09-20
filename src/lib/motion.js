export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  Boolean(window.matchMedia?.(REDUCED_MOTION_QUERY).matches);

export const easeOutExpo = (progress) =>
  progress >= 1 ? 1 : 1 - 2 ** (-10 * progress);
