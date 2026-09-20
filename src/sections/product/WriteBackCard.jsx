import { ArrowRight } from "lucide-react";
import { padNumber } from "@/lib/format";
import { Reveal } from "@/ui";

export function WriteBackCard({ label, outbound, from, to, className }) {
  return (
    <Reveal order={1} className={className}>
      <div className="write-back-header">
        <p className="icon-label text-accent-text">
          <span aria-hidden="true" className="dot-marker bg-accent" />
          {label}
        </p>
        <p className="icon-label text-(--fg-subtle)">
          {from}
          <ArrowRight aria-hidden="true" className="size-3.5" />
          <span className="sr-only">to</span>
          {to}
        </p>
      </div>
      <div className="manifest-row mt-5">
        <span className="type-label text-(--fg-subtle)">{padNumber(1, 2)}</span>
        <span className="manifest-name">
          {outbound.label}
          <span aria-hidden="true" className="dot-marker bg-accent" />
        </span>
        <span className="muted-copy-small col-start-2 sm:col-start-3">{outbound.detail}</span>
      </div>
    </Reveal>
  );
}
