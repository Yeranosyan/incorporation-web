import type { HeroContent } from "@/content/hero";
import { CountUp, HairlineGrid } from "@/ui";

export type HeroMetricsProps = { metrics: HeroContent["metrics"] };

export function HeroMetrics({ metrics }: HeroMetricsProps) {
  return (
    <HairlineGrid as="dl" className="mt-6 [--glass-shadow:none]" gridClassName="grid-cols-2 lg:grid-cols-4">
      {metrics.map(({ value, label, detail }) => (
        <div key={label} className="hero-metric-cell">
          <dt className="type-label text-(--fg-muted)">{label}</dt>
          <dd className="type-numeral mt-6">
            <CountUp value={value} pad={2} />
          </dd>
          <dd className="mt-3 text-sm text-(--fg-subtle)">{detail}</dd>
        </div>
      ))}
    </HairlineGrid>
  );
}
