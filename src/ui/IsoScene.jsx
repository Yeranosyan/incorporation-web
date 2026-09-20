import clsx from "clsx";

export function IsoScene({ bounds, className, children }) {
  return (
    <svg
      viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
      fill="none"
      className={clsx("block [stroke-width:var(--hairline)]", className)}
    >
      {children}
    </svg>
  );
}
