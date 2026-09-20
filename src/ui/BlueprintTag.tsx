import clsx from "clsx";
import { Plus } from "lucide-react";
import { BLUEPRINT_TONES } from "./blueprintTones";
import type { BlueprintTone } from "./blueprintTones";

export type BlueprintTagProps = {
  label: string;
  tone: BlueprintTone;
  right: number;
  top: number;
  order?: number;
};

export function BlueprintTag({ label, tone, right, top, order }: BlueprintTagProps) {
  return (
    <span
      className="blueprint-tag blueprint-tag-layout -mt-12 mr-3"
      style={{ right: `${right}%`, top: `${top}%`, "--order": order }}
    >
      <span className="blueprint-tag-text">{label}</span>
      <span className={clsx("blueprint-tag-mark", BLUEPRINT_TONES[tone].mark)}>
        <Plus className="size-3.5" />
      </span>
    </span>
  );
}
