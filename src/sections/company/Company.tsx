import type { CompanyContent } from "@/content/company";
import { Reveal, Section, SectionHeader } from "@/ui";
import type { SectionViewProps } from "../section";
import { ApproachPanel } from "./ApproachPanel";
import { ServiceGrid } from "./ServiceGrid";

export type CompanyProps = SectionViewProps<CompanyContent>;

export function Company({ id, content }: CompanyProps) {
  const { eyebrow, title, titleMuted, paragraphs, approach, services } = content;
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="light" labelledBy={headingId}>
      <div className="split-layout-wide">
        <SectionHeader
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          titleMuted={titleMuted}
          className="lg:col-span-7"
        />
        <div className="space-y-5 lg:col-span-5 lg:pt-14">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} as="p" order={index} className="muted-body">
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>

      <ApproachPanel approach={approach} />
      <ServiceGrid services={services} />
    </Section>
  );
}
