import { useId } from "react";
import { padNumber } from "@/lib/format";
import { Reveal } from "@/ui";

export function DataTypeGrid({ label, syncedLabel, items, className }) {
  const labelId = useId();

  return (
    <div className={className}>
      <div className="spread-row items-center">
        <p id={labelId} className="type-label text-(--fg-muted)">
          {label}
        </p>
        <span className="icon-label text-(--fg-subtle)">
          <span aria-hidden="true" className="dot-marker bg-lime" />
          {syncedLabel}
        </span>
      </div>
      <ul aria-labelledby={labelId} className="mt-5">
        {items.map(({ label: itemLabel, detail }, index) => (
          <Reveal as="li" key={itemLabel} order={index} className="manifest-row">
            <span className="type-label text-(--fg-subtle)">{padNumber(index + 1, 2)}</span>
            <span className="manifest-name">
              {itemLabel}
              <span aria-hidden="true" className="dot-marker bg-lime" />
            </span>
            <span className="muted-copy-small col-start-2 sm:col-start-3">{detail}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
