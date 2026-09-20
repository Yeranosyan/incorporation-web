import clsx from "clsx";
import type { ReactNode } from "react";
import type { Bounds } from "@/lib/isometric";

export type IsoSceneProps = { bounds: Bounds; className?: string; children?: ReactNode };

export function IsoScene({ bounds, className, children }: IsoSceneProps) {
  return (
    <svg
      viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
      fill="none"
      className={clsx("block [stroke-width:var(--hairline)]", className)}
    >
      {children}
    </svg>
  );
}
