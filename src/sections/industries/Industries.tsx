import type { IndustriesContent } from "@/content/industries";
import { Reveal, Section, SectionHeader } from "@/ui";
import { padNumber } from "@/lib/format";
import type { SectionViewProps } from "../section";

export type IndustriesProps = SectionViewProps<IndustriesContent>;

export function Industries({ id, content }: IndustriesProps) {
  const { eyebrow, title, titleMuted, lede, items, closing } = content;
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="stone" labelledBy={headingId}>
      <SectionHeader id={headingId} eyebrow={eyebrow} title={title} titleMuted={titleMuted} lede={lede} />

      <Reveal as="ol" className="industry-list mt-16">
        {items.map((item, index) => (
          <li key={item} className="group industry-row">
            <span className="type-label text-(--fg-subtle)">{padNumber(index + 1, 2)}</span>
            <span className="industry-name">{item}</span>
            <span aria-hidden="true" className="industry-dot" />
          </li>
        ))}
      </Reveal>

      <Reveal as="p" className="muted-body max-w-2xl mt-12">
        {closing}
      </Reveal>
    </Section>
  );
}
