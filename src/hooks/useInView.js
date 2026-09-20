import { useEffect, useRef, useState } from "react";
import { observeIntersection } from "@/lib/observe";

export const useInView = ({ once = true, rootMargin } = {}) => {
  const ref = useRef(null);
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

  return [ref, inView];
};
