import clsx from "clsx";
import { useMemo } from "react";
import type { ProductContent } from "@/content/product";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSyncLoop } from "@/hooks/useSyncLoop";
import { padNumber } from "@/lib/format";
import { buildSyncScene } from "@/lib/syncScene";
import { SyncReadout } from "./SyncReadout";
import { SyncScene } from "./SyncScene";
import { SystemNode } from "./SystemNode";

export type Integration = ProductContent["integration"];
export type SyncDiagramProps = { integration: Integration; className?: string };

export const WIDE_SCENE_QUERY = "(min-width: 48rem)";

export function SyncDiagram({ integration, className }: SyncDiagramProps) {
  const { source, target, diagramLabel, readLabel, writeLabel, inbound, outbound } = integration;
  const wide = useMediaQuery(WIDE_SCENE_QUERY);
  const scene = useMemo(() => buildSyncScene(wide ? "wide" : "compact"), [wide]);
  const [ref, status] = useSyncLoop<HTMLDivElement>(scene.motion);
  const { sourceX, targetX, nameY, readoutY } = scene.anchors;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={diagramLabel}
      className={clsx("sync-stage", className)}
      style={{
        "--source-x": `${sourceX}%`,
        "--target-x": `${targetX}%`,
        "--name-y": `${nameY}%`,
        "--readout-y": `${readoutY}%`,
      }}
    >
      <SyncScene scene={scene} order={status.order} wide={wide} />
      <div className="sync-captions">
        <SystemNode {...source} />
        <SystemNode {...target} align="end" />
        <div className="sync-readouts">
          <SyncReadout
            label={`${readLabel} · ${padNumber(inbound.length, 2)}`}
            items={inbound}
            value={status.read}
            active={status.active}
          />
          <SyncReadout
            tone="write"
            label={`${writeLabel} · ${padNumber(1, 2)}`}
            items={[outbound]}
            value={status.written}
            active={0}
          />
        </div>
      </div>
    </div>
  );
}
