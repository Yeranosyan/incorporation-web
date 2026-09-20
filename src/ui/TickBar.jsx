import clsx from "clsx";
import { Reveal } from "./Reveal";

const TONES = {
  accent: "bg-accent",
  amber: "bg-amber",
  strong: "bg-(--tick-strong)",
};

const toneAt = (ranges, position) =>
  ranges.find(({ from, to }) => position >= from && position <= to)?.tone;

export function TickBar({ count, ranges = [], label, className }) {
  return (
    <Reveal fade={false} role="img" aria-label={label} className={clsx("tick-bar", className)}>
      {Array.from({ length: count }, (_, index) => {
        const tone = toneAt(ranges, index + 1);
        return (
          <span
            key={index}
            className={clsx("tick w-0.75 rounded-full", tone ? clsx(TONES[tone], "h-full") : "h-3/4 bg-(--tick)")}
            style={{ "--order": index }}
          />
        );
      })}
    </Reveal>
  );
}
