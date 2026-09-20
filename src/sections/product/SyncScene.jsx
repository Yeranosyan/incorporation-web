import { padNumber } from "@/lib/format";
import { SyncSolid } from "./SyncSolid";

export function SyncScene({ scene, order, wide }) {
  const { viewBox, aspect, plinths, record, glass, slab, cap } = scene;

  return (
    <div aria-hidden="true" className="sync-canvas" style={{ aspectRatio: aspect }}>
      <svg viewBox={viewBox} className="iso-layer">
        {plinths.map((faces, index) => (
          <SyncSolid key={index} faces={faces} tone="plinth" />
        ))}

        <SyncSolid faces={record} tone="record" />
        {record.seams.map((d, index) => (
          <path key={index} d={d} className="sync-seam" />
        ))}
        <path d={record.rim} className="sync-record-rim" />
        <path d={record.groove} className="sync-port-groove" />
        <path d={record.port} className="sync-port" />
        {wide &&
          record.numerals.map((transform, level) => (
            <text key={level} transform={transform} data-numeral={level} data-lit="false" className="sync-numeral">
              {padNumber(level + 1, 2)}
            </text>
          ))}

        <path d={glass.floor} className="sync-glass-floor" />
        {glass.back.map((d, index) => (
          <path key={index} d={d} className="sync-glass-back" />
        ))}
        <path d={glass.backEdges} className="sync-glass-edge-soft" />
        <path d={glass.backPost} className="sync-glass-edge-soft" />
        <path d={glass.backRim} className="sync-glass-edge" />

        {[...order].map((slot) => (
          <g key={slot} data-slot={slot} className="sync-mover">
            <SyncSolid faces={slab} tone="read" hanging />
            {wide && (
              <text transform={slab.numeral} className="sync-slab-numeral">
                {padNumber(1, 2)}
              </text>
            )}
          </g>
        ))}
        <g data-write className="sync-mover">
          <SyncSolid faces={cap} tone="write" hanging />
        </g>
      </svg>

      <div className="sync-glass sync-glass-left" style={{ clipPath: glass.clipLeft }} />
      <div className="sync-glass sync-glass-right" style={{ clipPath: glass.clipRight }} />

      <svg viewBox={viewBox} className="iso-layer">
        <path d={glass.frontBase} className="sync-glass-edge-soft" />
        {glass.frontPosts.map((d, index) => (
          <path key={index} d={d} className="sync-glass-edge" />
        ))}
        <path d={glass.frontRim} className="sync-glass-rim" />
      </svg>
    </div>
  );
}
