import type { ProductContent } from "@/content/product";
import { useInView } from "@/hooks/useInView";

export type CycleHighlightsProps = { highlights: ProductContent["highlights"] };

export function CycleHighlights({ highlights }: CycleHighlightsProps) {
  const [ref, inView] = useInView<HTMLUListElement>({ once: false });

  return (
    <ul ref={ref} data-visible={inView} className="cycle-highlights">
      {highlights.map(({ value, label }, index) => (
        <li key={label} className="cycle-highlight" style={{ "--order": index }}>
          <span className="digit-window cycle-highlight-numeral">
            <span className="cycle-highlight-value">{value}</span>
          </span>
          <span className="cycle-highlight-label">{label}</span>
        </li>
      ))}
    </ul>
  );
}
