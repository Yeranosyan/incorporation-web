import { toPath } from "@/lib/isometric";

export function IsoPath({ points, className }) {
  return <path d={toPath(points)} vectorEffect="non-scaling-stroke" className={className} />;
}
