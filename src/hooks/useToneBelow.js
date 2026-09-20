import { useEffect, useState } from "react";

const toneAt = (y) =>
  document
    .elementsFromPoint?.(window.innerWidth / 2, y)
    .find((element) => element.matches("section[data-tone]"))?.dataset.tone ?? "dark";

export const useToneBelow = (y) => {
  const [tone, setTone] = useState("dark");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setTone(toneAt(y));
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
  }, [y]);

  return tone;
};
