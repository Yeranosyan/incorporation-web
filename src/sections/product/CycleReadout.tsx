import { digitsBetween, parseRange } from "@/lib/cycleCollapse";
import { useFittedReel } from "@/hooks/useFittedReel";
import { Crossfade } from "@/ui";
import type { Cycle } from "./CycleChart";

export type CycleReadoutProps = { rows: Cycle["rows"]; state: number };
type ReelProps = { values: number[]; current: number };

const unitKey = (unit: string) => unit;

function Reel({ values, current }: ReelProps) {
  const digits = digitsBetween(values[0], values[1]);
  const index = digits.indexOf(current);
  const ref = useFittedReel(index);

  return (
    <span ref={ref} className="digit-window cycle-reel-window">
      <span className="digit-reel" style={{ "--digit": index }}>
        {digits.map((digit) => (
          <span key={digit}>{digit}</span>
        ))}
      </span>
    </span>
  );
}

export function CycleReadout({ rows, state }: CycleReadoutProps) {
  const ranges = rows.map((row) => parseRange(row.value));
  const { low, high } = ranges[state];

  return (
    <div aria-hidden="true" className="cycle-readout">
      <span className="cycle-readout-number">
        <Reel values={ranges.map((range) => range.low)} current={low} />
        <span className="px-[0.02em]">–</span>
        <Reel values={ranges.map((range) => range.high)} current={high} />
      </span>
      <Crossfade
        items={ranges.map(({ unit }) => unit)}
        active={state}
        axis="y"
        getKey={unitKey}
        className="cycle-readout-unit"
      >
        {(unit) => unit}
      </Crossfade>
    </div>
  );
}
