import clsx from "clsx";
import { useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import { boxFaces } from "@/lib/isometric";
import { BlueprintBlock, BlueprintTag, IsoPath, IsoScene } from "@/ui";
import { BLUEPRINT_TONES } from "@/ui/blueprintTones";
import { buildScene } from "./blueprintScene";
import type { BlueprintModule } from "./blueprintScene";

export type HeroBlueprintProps = { modules: readonly BlueprintModule[]; className?: string };

export function HeroBlueprint({ modules, className }: HeroBlueprintProps) {
  const [ref, inView] = useInView({ once: false });
  const { bounds, ground, lots, footprints, blocks, tags } = useMemo(() => buildScene(modules), [modules]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-visible={inView}
      className={clsx("blueprint pointer-events-none relative", className)}
    >
      <IsoScene bounds={bounds} className="h-auto w-full">
        <IsoPath points={boxFaces(ground).base} className="stroke-(--bp-line)" />
        {lots.map(({ id, box }) => (
          <IsoPath key={id} points={boxFaces(box).base} className="stroke-(--bp-line)" />
        ))}
        {footprints.map(({ id, box, tone }) => (
          <IsoPath
            key={id}
            points={boxFaces(box).base}
            className={clsx("blueprint-march", BLUEPRINT_TONES[tone].line)}
          />
        ))}
        {blocks.map(({ id, box, tone }, order) => (
          <BlueprintBlock key={id} box={box} tone={tone} order={order} />
        ))}
      </IsoScene>
      {tags.map((tag, order) => (
        <BlueprintTag key={tag.label} {...tag} order={order} />
      ))}
    </div>
  );
}
