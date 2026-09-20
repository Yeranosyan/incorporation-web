import clsx from "clsx";
import type { MembershipContent } from "@/content/membership";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import { Reveal } from "@/ui";
import { MembershipCard } from "./MembershipCard";

export type MembershipLayers = MembershipContent["credential"]["layers"];
export type MembershipDeckProps = { layers: MembershipLayers; step: number; className?: string };

export function MembershipDeck({ layers, step, className }: MembershipDeckProps) {
  const tiltRef = usePointerTilt();

  return (
    <Reveal order={1} aria-hidden="true" className={clsx("membership-deck-frame", className)}>
      <div ref={tiltRef} className="membership-deck">
        {layers.map((layer, index) => (
          <MembershipCard key={layer.label} {...layer} index={index} total={layers.length} depth={step - index} />
        ))}
      </div>
    </Reveal>
  );
}
