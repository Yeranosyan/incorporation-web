import type { CycleChart } from "@/lib/cycleChart";

export type Slab = ReturnType<CycleChart["slab"]>;
export type CycleSlabProps = { slab: Slab; live?: boolean };

export function CycleSlab({ slab, live = false }: CycleSlabProps) {
  return (
    <g data-part={live ? "live" : undefined} className={live ? "iso-solid cycle-slab-live" : "iso-solid cycle-slab-before"}>
      <path data-part="right" d={slab.right} className="iso-face-right" />
      <path data-part="front" d={slab.front} className="iso-face-left" />
      <path data-part="top" d={slab.top} className="iso-face-top" />
      <path data-part="rim" d={slab.rim} className="cycle-slab-rim" />
    </g>
  );
}
