import { useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { padNumber } from "@/lib/format";
import { easeOutExpo, prefersReducedMotion } from "@/lib/motion";

export function CountUp({ value, pad = 0, duration = 1400, className }) {
  const [ref, inView] = useInView();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!inView || prefersReducedMotion()) {
      node.textContent = padNumber(inView ? value : 0, pad);
      return undefined;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      node.textContent = padNumber(value * easeOutExpo(progress), pad);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref, inView, value, pad, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{padNumber(value, pad)}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  );
}
