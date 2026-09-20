import { useEffect, useState } from "react";
import { CENTER_BAND, observeIntersection } from "@/lib/observe";

export const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(() => {
    const stops = key.split(" ").map((id) => {
      const element = document.getElementById(id);
      if (!element) return () => {};
      return observeIntersection(
        element,
        ({ isIntersecting }) => isIntersecting && setActive(id),
        CENTER_BAND,
      );
    });

    return () => stops.forEach((stop) => stop());
  }, [key]);

  return active;
};
