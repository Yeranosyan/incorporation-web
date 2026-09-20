import clsx from "clsx";
import { Fragment } from "react";
import { useSwapWidths } from "@/hooks/useSwapWidths";
import type { ContrastSplit, ContrastWord } from "@/lib/contrast";

export type ComparisonPlace = "past" | "current" | "next";
export type ComparisonStatementProps = { contrast: ContrastSplit; place: ComparisonPlace };
type WordsProps = { words: ContrastWord[]; className?: string };
type SwapProps = { before: ContrastWord[]; after: ContrastWord[]; fitted: boolean };

function Words({ words, className }: WordsProps) {
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

function Swap({ before, after, fitted }: SwapProps) {
  const ref = useSwapWidths(fitted);

  return (
    <span ref={ref} className={fitted ? "comparison-swap-fitted" : "comparison-swap"}>
      <Words words={before} className="comparison-out" />
      <Words words={after} className="comparison-in" />
    </span>
  );
}

export function ComparisonStatement({ contrast, place }: ComparisonStatementProps) {
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
