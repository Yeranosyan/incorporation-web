import clsx from "clsx";

export type MarqueeProps = { items: string[]; className?: string };

export function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div aria-hidden="true" className={clsx("edge-fade-x overflow-hidden", className)}>
      <ul className="marquee-track animate-marquee">
        {loop.map((item, index) => (
          <li key={`${item}-${index}`} className="marquee-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
