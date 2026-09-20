import type { ProductContent } from "@/content/product";
import { padNumber } from "@/lib/format";
import { Eyebrow, HairlineGrid } from "@/ui";

export type ProductSafeguardsProps = { safeguards: ProductContent["safeguards"] };

export function ProductSafeguards({ safeguards }: ProductSafeguardsProps) {
  const { label, items, hosting } = safeguards;

  return (
    <div className="mt-28">
      <Eyebrow>{label}</Eyebrow>
      <HairlineGrid as="ul" className="mt-8 [--glass-shadow:none]" gridClassName="sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, description }, index) => (
          <li key={title} className="bg-(--card) p-7">
            <span className="type-label text-accent-text">{padNumber(index + 1, 2)}</span>
            <h4 className="item-title mt-8">{title}</h4>
            <p className="muted-copy-small mt-3">{description}</p>
          </li>
        ))}
      </HairlineGrid>
      <p className="mt-6 text-sm text-(--fg-subtle)">{hosting}</p>
    </div>
  );
}
