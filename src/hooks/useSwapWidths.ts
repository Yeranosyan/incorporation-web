import { useLayoutEffect, useRef } from "react";

export const useSwapWidths = <T extends HTMLElement = HTMLSpanElement>(enabled: boolean) => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof ResizeObserver === "undefined") return undefined;
    const [from, to] = node.children as HTMLCollectionOf<HTMLElement>;

    const fit = () => {
      node.style.setProperty("--from", `${from.offsetWidth}px`);
      node.style.setProperty("--to", `${to.offsetWidth}px`);
    };

    fit();
    const sizer = new ResizeObserver(fit);
    sizer.observe(from);
    sizer.observe(to);
    return () => sizer.disconnect();
  }, [enabled]);

  return ref;
};
