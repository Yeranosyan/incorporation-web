import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { CENTER_BAND, observeIntersection } from "@/lib/observe";

const BAND_TOP = 0.45;

export const useScrollStep = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const markers = [...(ref.current?.querySelectorAll("[data-step-marker]") ?? [])];
    const last = markers.length - 1;

    const stops = markers.map((marker, index) =>
      observeIntersection(
        marker,
        ({ isIntersecting, boundingClientRect, rootBounds }) => {
          if (isIntersecting) {
            setStep(index);
            return;
          }
          if (!rootBounds || !boundingClientRect) return;
          if (index === 0 && boundingClientRect.top >= rootBounds.bottom) setStep(0);
          if (index === last && boundingClientRect.bottom <= rootBounds.top) setStep(last);
        },
        CENTER_BAND,
      ),
    );

    return () => stops.forEach((stop) => stop());
  }, []);

  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const markers = track.querySelectorAll("[data-step-marker]");
      if (!markers.length) return;
      const { top, height } = markers[0].getBoundingClientRect();
      if (!height) return;
      const progress = (window.innerHeight * BAND_TOP - top) / height;
      track.style.setProperty("--scroll-progress", Math.min(Math.max(progress, 0), markers.length).toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollToStep = useCallback((index: number) => {
    const marker = ref.current?.querySelectorAll("[data-step-marker]")[index];
    if (!marker) return;
    const top = marker.getBoundingClientRect().top + window.scrollY - window.innerHeight * BAND_TOP + 1;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  return [ref, step, scrollToStep] as const;
};
