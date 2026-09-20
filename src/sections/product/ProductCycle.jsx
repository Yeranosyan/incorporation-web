import { useMemo } from "react";
import { useCycleCollapse } from "@/hooks/useCycleCollapse";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { buildCycleChart } from "@/lib/cycleChart";
import { seamPlan, weekBand } from "@/lib/cycleCollapse";
import { CycleChart } from "./CycleChart";
import { CycleHighlights } from "./CycleHighlights";
import { CycleReadout } from "./CycleReadout";
import { ProductComparison } from "./ProductComparison";

export const WIDE_CYCLE_QUERY = "(min-width: 48rem)";

export function ProductCycle({ cycle, highlights, comparison }) {
  const wide = useMediaQuery(WIDE_CYCLE_QUERY);
  const [before, after] = cycle.rows;
  const chart = useMemo(
    () => buildCycleChart(wide ? "wide" : "compact", cycle.scale, [weekBand(before)]),
    [wide, cycle.scale, before],
  );
  const plan = useMemo(
    () => seamPlan(weekBand(before), weekBand(after), before.to - before.from + 1),
    [before, after],
  );
  const [trackRef, state, focus] = useCycleCollapse({ chart, plan });

  return (
    <div className="mt-20">
      <div ref={trackRef} className="cycle-track">
        <div data-stage className="cycle-stage">
          <div className="cycle-head">
            <p className="cycle-label">{cycle.label}</p>
            <p className="cycle-caption">{cycle.caption}</p>
          </div>
          <CycleReadout rows={cycle.rows} state={state} />
          <CycleChart chart={chart} plan={plan} cycle={cycle} state={state} />
          <ProductComparison comparison={comparison} focus={focus} />
        </div>
      </div>
      <CycleHighlights highlights={highlights} />
    </div>
  );
}
