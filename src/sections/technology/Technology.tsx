import type { TechnologyContent } from "@/content/technology";
import { Marquee, Section, SectionHeader } from "@/ui";
import type { SectionViewProps } from "../section";
import { PlatformList } from "./PlatformList";
import { StackGrid } from "./StackGrid";

export type TechnologyProps = SectionViewProps<TechnologyContent>;

export function Technology({ id, content }: TechnologyProps) {
  const { eyebrow, title, titleMuted, lede, categories, platformsLabel, platforms } = content;
  const headingId = `${id}-title`;
  const allItems = categories.flatMap(({ items }) => items);

  return (
    <Section id={id} tone="dark" labelledBy={headingId}>
      <SectionHeader id={headingId} eyebrow={eyebrow} title={title} titleMuted={titleMuted} lede={lede} />
      <Marquee items={allItems} className="mt-16 -mx-5 sm:-mx-8" />
      <StackGrid categories={categories} />
      <PlatformList label={platformsLabel} platforms={platforms} />
    </Section>
  );
}
