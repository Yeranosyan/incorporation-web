import clsx from "clsx";
import { Fragment } from "react";
import { useSwapWidths } from "@/hooks/useSwapWidths";

function Words({ words, className }) {
  return (
    <span className={clsx("comparison-phrase", className)}>
      {words.map(({ word, at }, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <span className="comparison-word" style={{ "--at": at.toFixed(3) }}>
            {word}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

function Swap({ before, after, fitted }) {
  const ref = useSwapWidths(fitted);

  return (
    <span ref={ref} className={fitted ? "comparison-swap-fitted" : "comparison-swap"}>
      <Words words={before} className="comparison-out" />
      <Words words={after} className="comparison-in" />
    </span>
  );
}

export function ComparisonStatement({ contrast, place }) {
  const { head, before, after, tail } = contrast;
  const fitted = head.length + tail.length > 0;

  return (
    <p data-place={place} className="comparison-slot comparison-line">
      {head.length > 0 && <span className="comparison-shared">{head.join(" ")} </span>}
      <Swap before={before} after={after} fitted={fitted} />
      {tail.length > 0 && <span className="comparison-shared"> {tail.join(" ")}</span>}
    </p>
  );
}
