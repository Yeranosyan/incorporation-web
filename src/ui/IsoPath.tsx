import { toPath } from "@/lib/isometric";
import type { Point } from "@/lib/isometric";

export type IsoPathProps = { points: Point[]; className?: string };

export function IsoPath({ points, className }: IsoPathProps) {
  return <path d={toPath(points)} vectorEffect="non-scaling-stroke" className={className} />;
}
