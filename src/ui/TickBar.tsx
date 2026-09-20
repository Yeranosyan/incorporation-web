import clsx from "clsx";
import { Reveal } from "./Reveal";

const TONES = {
  accent: "bg-accent",
  amber: "bg-amber",
  strong: "bg-(--tick-strong)",
};

export type TickTone = keyof typeof TONES;
export type TickRange = { from: number; to: number; tone: TickTone };
export type TickBarProps = {
  count: number;
  ranges?: TickRange[];
  label: string;
  className?: string;
};

const toneAt = (ranges: TickRange[], position: number) =>
  ranges.find(({ from, to }) => position >= from && position <= to)?.tone;

export function TickBar({ count, ranges = [], label, className }: TickBarProps) {
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
