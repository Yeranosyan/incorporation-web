import clsx from "clsx";
import { Crossfade } from "@/ui";
import { CycleSlab } from "./CycleSlab";

const rowKey = ({ label }) => label;

export function CycleChart({ chart, plan, cycle, state }) {
  const { label, axis, rows } = cycle;
  const [before] = rows;
  const first = plan[0];
  const last = plan.at(-1);
  const slab = chart.slab(first.start, last.start, 0);
  const [tagX, tagY] = chart.tagAt(first.start, 0);
  const tagOrigin = `${tagX}% ${tagY}%`;
  const summary = rows.map((row) => `${row.label}: ${row.value}`).join(". ");

  return (
    <div className="cycle-figure">
      <div role="img" aria-label={`${label}. ${summary}.`} className="cycle-chart" style={{ aspectRatio: chart.aspect }}>
        <svg viewBox={chart.viewBox} aria-hidden="true" className="iso-layer">
          <g className="iso-solid iso-solid-plinth">
            <path d={chart.plinth.right} className="iso-face-right" />
            <path d={chart.plinth.front} className="iso-face-left" />
            <path d={chart.plinth.top} className="iso-face-top" />
          </g>
          <path d={chart.plinthRim} className="cycle-plinth-rim" />
          <path d={chart.grooves} className="cycle-groove" />
          {chart.ghost.map((d, index) => (
            <path key={index} d={d} className="cycle-ghost" />
          ))}
          <CycleSlab slab={slab} />
          <CycleSlab slab={slab} live />
          <path data-part="seams" d={chart.seams(plan.slice(1, -1).map(({ start }) => start), 0)} className="cycle-seams" />
          <path data-part="live-seam" d={chart.seams([(first.start + last.start) / 2], 0)} className="cycle-live-seam" />
        </svg>

        <div aria-hidden="true" className="cycle-tags">
          <div data-part="ghost-tag" className="cycle-tag-carrier" style={{ translate: tagOrigin, opacity: 0 }}>
            <p className="cycle-tag cycle-tag-ghost">
              <span>{before.label}</span>
              <span className="text-(--fg-muted)">{before.value}</span>
            </p>
          </div>
          <div data-part="tag" className="cycle-tag-carrier" style={{ translate: tagOrigin }}>
            <div className="cycle-tag">
              <span className={clsx("square-marker", state === 1 && "tone-lime")} />
              <Crossfade items={rows} active={state} axis="y" getKey={rowKey} className="cycle-tag-name">
                {(row) => row.label}
              </Crossfade>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="cycle-axis">
        {axis.map((week) => (
          <span key={week} className="cycle-axis-label" style={{ left: `${chart.axisPercent(week)}%` }}>
            {week}
          </span>
        ))}
      </div>
    </div>
  );
}
