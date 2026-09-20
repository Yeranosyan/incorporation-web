import type { CompanyContent } from "@/content/company";
import { HairlineGrid } from "@/ui";
import { padNumber } from "@/lib/format";

export type ServiceGridProps = { services: CompanyContent["services"] };

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <HairlineGrid as="ul" className="mt-6" gridClassName="sm:grid-cols-2 lg:grid-cols-3">
      {services.map(({ title, description }, index) => (
        <li key={title} className="hairline-cell">
          <span className="type-label text-(--fg-subtle)">{padNumber(index + 1, 2)}</span>
          <div className="mt-16">
            <h3 className="service-title">{title}</h3>
            <p className="muted-copy mt-3">{description}</p>
          </div>
        </li>
      ))}
    </HairlineGrid>
  );
}
