import { useEffect, useRef, useState } from "react";
import { observeIntersection } from "@/lib/observe";

export type InViewOptions = { once?: boolean; rootMargin?: string };

export const useInView = <T extends Element = HTMLDivElement>({
  once = true,
  rootMargin,
}: InViewOptions = {}) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let stop = () => {};
    stop = observeIntersection(
      element,
      ({ isIntersecting }) => {
        if (once && !isIntersecting) return;
        setInView(isIntersecting);
        if (once) stop();
      },
      rootMargin,
    );

    return () => stop();
  }, [once, rootMargin]);

  return [ref, inView] as const;
};
