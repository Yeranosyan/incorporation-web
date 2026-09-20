import clsx from "clsx";
import { padNumber } from "@/lib/format";
import { Crossfade } from "@/ui";

const TONES = { read: "tone-lime", write: "tone-accent" };

const labelKey = ({ label }) => label;

export function SyncReadout({ label, items, value, active, tone = "read" }) {
  return (
    <div className={clsx("sync-readout", TONES[tone])}>
      <p className="sync-readout-label">
        <span aria-hidden="true" className="square-marker" />
        {label}
      </p>
      <div className="sync-readout-row">
        <span aria-hidden="true" data-idle={value === 0} className="digit-window sync-digits">
          <span className="digit-reel" style={{ "--digit": value }}>
            {Array.from({ length: items.length + 1 }, (_, index) => (
              <span key={index}>{padNumber(index, 2)}</span>
            ))}
          </span>
        </span>
        <Crossfade
          aria-hidden="true"
          items={items}
          active={active}
          axis="y"
          getKey={labelKey}
          className="sync-readout-name"
        >
          {({ label: name }) => name}
        </Crossfade>
      </div>
    </div>
  );
}
