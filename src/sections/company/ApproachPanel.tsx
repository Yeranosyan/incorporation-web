import type { CompanyContent } from "@/content/company";
import { Eyebrow, Reveal } from "@/ui";
import { padNumber } from "@/lib/format";

export type ApproachPanelProps = { approach: CompanyContent["approach"] };

export function ApproachPanel({ approach }: ApproachPanelProps) {
  const { label, title, pillars, outcome } = approach;

  return (
    <Reveal data-tone="dark" className="approach-panel mt-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{label}</Eyebrow>
          <h3 className="type-title mt-6 max-w-md">{title}</h3>
        </div>
        <ol className="approach-pillars lg:col-span-7">
          {pillars.map(({ title: pillarTitle, description }, index) => (
            <li key={pillarTitle} className="border-t border-(--line) pt-6">
              <span className="type-label text-accent-text">{padNumber(index + 1, 2)}</span>
              <p className="item-title mt-4">{pillarTitle}</p>
              <p className="muted-copy-small mt-3">{description}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="approach-outcome mt-12">{outcome}</p>
    </Reveal>
  );
}
