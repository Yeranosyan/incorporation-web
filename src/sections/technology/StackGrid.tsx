import type { TechnologyContent } from "@/content/technology";
import { HairlineGrid } from "@/ui";
import { padNumber } from "@/lib/format";

export type StackGridProps = { categories: TechnologyContent["categories"] };

export function StackGrid({ categories }: StackGridProps) {
  return (
    <HairlineGrid className="mt-16" gridClassName="sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ name, items }) => (
        <div key={name} className="hairline-cell">
          <div className="spread-row items-baseline">
            <h3 className="item-title">{name}</h3>
            <span className="type-label text-(--fg-subtle)">{padNumber(items.length, 2)}</span>
          </div>
          <ul className="tech-chip-list mt-8">
            {items.map((item) => (
              <li key={item} className="tech-chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </HairlineGrid>
  );
}
