const TONES = {
  plinth: "iso-solid-plinth",
  record: "sync-solid-record",
  read: "sync-solid-toned tone-lime",
  write: "sync-solid-toned tone-accent",
};

export type SolidFaces = { top: string; left: string; right: string };
export type SolidTone = keyof typeof TONES;
export type SyncSolidProps = { faces: SolidFaces; tone: SolidTone; hanging?: boolean };

export function SyncSolid({ faces, tone, hanging = false }: SyncSolidProps) {
  return (
    <g className={`iso-solid ${TONES[tone]}`}>
      <path d={faces.left} data-side={hanging ? "left" : undefined} className="iso-face-left" />
      <path d={faces.right} data-side={hanging ? "right" : undefined} className="iso-face-right" />
      <path d={faces.top} className="iso-face-top" />
    </g>
  );
}
