import { useEffect, useRef } from "react";

export const useFittedReel = <T extends HTMLElement = HTMLSpanElement>(index: number) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const reelWindow = ref.current;
    const glyph = reelWindow?.firstElementChild?.children[index];
    if (!reelWindow || !glyph) return undefined;

    const fit = () => {
      const width = glyph.getBoundingClientRect().width;
      if (width > 0) reelWindow.style.setProperty("--reel-width", `${width}px`);
    };

    fit();
    document.fonts?.ready.then(fit);
    const sizer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
    sizer?.observe(glyph);
    return () => sizer?.disconnect();
  }, [index]);

  return ref;
};
