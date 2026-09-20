import { ComparisonStatement } from "./ComparisonStatement";

export function ComparisonRow({ index, contrast, place, beforeLabel, afterLabel }) {
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
