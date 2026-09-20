import { useInView } from "@/hooks/useInView";

export function CycleHighlights({ highlights }) {
  const [ref, inView] = useInView({ once: false });

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
