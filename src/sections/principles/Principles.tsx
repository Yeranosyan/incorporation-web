import type { PrinciplesContent } from "@/content/principles";
import { Reveal, Section, SectionHeader } from "@/ui";
import { padNumber } from "@/lib/format";
import type { SectionViewProps } from "../section";

export type PrinciplesProps = SectionViewProps<PrinciplesContent>;

export function Principles({ id, content }: PrinciplesProps) {
  const { eyebrow, title, titleMuted, lede, commitments, closing } = content;
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="light" labelledBy={headingId}>
      <div className="split-layout">
        <SectionHeader
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          titleMuted={titleMuted}
          lede={lede}
          className="principles-header lg:col-span-5"
        />
        <ol className="lg:col-span-7">
          {commitments.map(({ title: commitmentTitle, description }, index) => (
            <Reveal as="li" key={commitmentTitle} order={index} className="principle-row">
              <span className="type-label pt-2 text-accent-text">{padNumber(index + 1, 2)}</span>
              <div>
                <h3 className="type-title">{commitmentTitle}</h3>
                <p className="muted-body mt-3">{description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal as="p" className="principles-closing mt-16">
        {closing}
      </Reveal>
    </Section>
  );
}
