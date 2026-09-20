import type { ContrastSplit } from "@/lib/contrast";
import { ComparisonStatement } from "./ComparisonStatement";
import type { ComparisonPlace } from "./ComparisonStatement";

export type ComparisonRowProps = {
  index: number;
  contrast: ContrastSplit;
  place: ComparisonPlace;
  beforeLabel: string;
  afterLabel: string;
};

export function ComparisonRow({ index, contrast, place, beforeLabel, afterLabel }: ComparisonRowProps) {
  return (
    <div data-row={index} className="comparison-row" style={{ "--i": index }}>
      <span data-place={place} className="comparison-tick" />
      <p data-place={place} className="comparison-slot comparison-state">
        <span className="square-marker comparison-marker" />
        <span className="comparison-state-window">
          <span className="comparison-state-reel">
            <span>{beforeLabel}</span>
            <span className="text-(--fg)">{afterLabel}</span>
          </span>
        </span>
      </p>
      <ComparisonStatement contrast={contrast} place={place} />
    </div>
  );
}
