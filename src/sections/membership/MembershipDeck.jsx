import clsx from "clsx";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import { Reveal } from "@/ui";
import { MembershipCard } from "./MembershipCard";

export function MembershipDeck({ layers, step, className }) {
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
