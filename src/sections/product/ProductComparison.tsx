import { useMemo } from "react";
import { splitContrast } from "@/lib/contrast";
import { padNumber } from "@/lib/format";
import { ComparisonRow } from "./ComparisonRow";
import { ComparisonTable } from "./ComparisonTable";
import type { Comparison } from "./ComparisonTable";

export type ProductComparisonProps = { comparison: Comparison; focus: number };

const placeOf = (index: number, focus: number) => {
  if (index < focus) return "past";
  if (index > focus) return "next";
  return "current";
};

export function ProductComparison({ comparison, focus }: ProductComparisonProps) {
  const { beforeLabel, afterLabel, rows } = comparison;
  const contrasts = useMemo(() => rows.map(({ before, after }) => splitContrast(before, after)), [rows]);

  return (
    <div className="comparison">
      <ComparisonTable comparison={comparison} />

      <div aria-hidden="true" className="comparison-stage">
        <p className="comparison-count">
          <span className="digit-window">
            <span className="digit-reel" style={{ "--digit": focus }}>
              {rows.map(({ before }, index) => (
                <span key={before}>{padNumber(index + 1, 2)}</span>
              ))}
            </span>
          </span>
          <span className="text-(--fg-subtle)">/ {padNumber(rows.length, 2)}</span>
        </p>

        {contrasts.map((contrast, index) => (
          <ComparisonRow
            key={rows[index].before}
            index={index}
            contrast={contrast}
            place={placeOf(index, focus)}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        ))}
      </div>
    </div>
  );
}
