import { HairlineGrid, SectionHeader } from "@/ui";

export function ProductWorkflow({ intro, workflow }) {
  return (
    <div className="mt-28">
      <SectionHeader level="h3" {...intro} />
      <HairlineGrid as="ol" className="mt-12 [--glass-shadow:none]" gridClassName="lg:grid-cols-3">
        {workflow.map(({ index, name, role, description }) => (
          <li key={name} className="hairline-cell flex flex-col">
            <div className="spread-row items-baseline">
              <span className="type-numeral text-(--fg-subtle)">{index}</span>
              <span className="type-label text-accent-text">{name}</span>
            </div>
            <p className="muted-copy mt-10 flex-1">{description}</p>
            <p className="type-label mt-8 text-(--fg-subtle)">{role}</p>
          </li>
        ))}
      </HairlineGrid>
    </div>
  );
}
