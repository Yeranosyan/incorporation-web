import clsx from "clsx";
import { boxFaces, toPath } from "@/lib/isometric";
import type { Box } from "@/lib/isometric";
import { BLUEPRINT_TONES } from "./blueprintTones";
import type { BlueprintTone } from "./blueprintTones";

const FACE_FILLS = {
  top: "fill-(--bp-top)",
  left: "fill-(--bp-left)",
  right: "fill-(--bp-right)",
};

export type BlockFace = keyof typeof FACE_FILLS;
export type BlueprintBlockProps = { box: Box; tone?: BlueprintTone; order?: number };

export function BlueprintBlock({ box, tone, order }: BlueprintBlockProps) {
  const geometry = boxFaces(box);

  return (
    <g
      className={clsx("blueprint-block", tone && ["blueprint-module", BLUEPRINT_TONES[tone].block])}
      style={{ "--order": order }}
    >
      {(Object.entries(FACE_FILLS) as [BlockFace, string][]).map(([face, fill]) => (
        <path
          key={face}
          d={toPath(geometry[face])}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={clsx(fill, "stroke-(--bp-edge)")}
        />
      ))}
    </g>
  );
}
