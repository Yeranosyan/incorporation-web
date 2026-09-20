import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/content/hero";
import { ActionLink, Badge, Eyebrow, Reveal, Section } from "@/ui";
import type { SectionViewProps } from "../section";
import { HeroBlueprint } from "./HeroBlueprint";
import { HeroMetrics } from "./HeroMetrics";
import { LifecycleRuler } from "./LifecycleRuler";

export type HeroProps = SectionViewProps<HeroContent>;

export function Hero({ id, content }: HeroProps) {
  const { announcement, eyebrow, title, titleMuted, lede, actions, lifecycle, metrics, blueprint } = content;
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone="dark" spacing="hero" labelledBy={headingId}>
      <div className="relative isolate">
        <Reveal>
          <a href={announcement.href} className="group hero-announcement">
            <Badge>{announcement.tag}</Badge>
            <span className="text-(--fg-muted) transition-colors group-hover:text-(--fg)">{announcement.text}</span>
            <ArrowRight aria-hidden="true" className="hero-announcement-arrow" />
          </a>
        </Reveal>

        <Reveal order={1}>
          <Eyebrow className="mt-12">{eyebrow}</Eyebrow>
          <h1 id={headingId} className="type-display mt-6 max-w-5xl">
            {title}
            <br />
            <span className="text-(--fg-subtle)">{titleMuted}</span>
          </h1>
        </Reveal>

        <div className="hero-intro-grid mt-10">
          <Reveal as="p" order={2} className="hero-lede">
            {lede}
          </Reveal>
          <Reveal order={3} className="actions-row">
            {actions.map(({ label, ...action }) => (
              <ActionLink key={label} {...action}>
                {label}
              </ActionLink>
            ))}
          </Reveal>
        </div>

        <HeroBlueprint modules={blueprint.modules} className="hero-blueprint mt-6 xl:absolute xl:mt-0" />

        <Reveal order={4} className="mt-6 xl:mt-16">
          <LifecycleRuler content={lifecycle} />
        </Reveal>

        <HeroMetrics metrics={metrics} />
      </div>
    </Section>
  );
}
