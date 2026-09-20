import clsx from "clsx";

const COLUMNS = 7;
const ROWS = 5;
const CELL = 14;
const GAP = 4;
const WIDTH = COLUMNS * (CELL + GAP) + GAP;
const HEIGHT = ROWS * (CELL + GAP) + GAP;

const CELLS = Array.from({ length: COLUMNS * ROWS }, (_, index) => ({
  index,
  x: GAP + (index % COLUMNS) * (CELL + GAP),
  y: GAP + Math.floor(index / COLUMNS) * (CELL + GAP),
}));

export function QuoteSchematic({ highlighted = 0, className }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={clsx("[stroke-width:var(--hairline)]", className)}
    >
      <rect x="0.5" y="0.5" width={WIDTH - 1} height={HEIGHT - 1} rx="4" vectorEffect="non-scaling-stroke" />
      {CELLS.map(({ index, x, y }) => (
        <g key={index}>
          <rect
            x={x}
            y={y}
            width={CELL}
            height={CELL}
            rx="2.5"
            vectorEffect="non-scaling-stroke"
            className="quote-schematic-cell"
            style={{ fillOpacity: index < highlighted ? 0.9 : 0, transitionDelay: `${index * 25}ms` }}
          />
          <circle cx={x + CELL / 2} cy={y + CELL / 2} r="2" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}
