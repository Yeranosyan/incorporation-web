import { ActionLink, CpqLogo, Reveal } from "@/ui";

export function ProductIntro({ headingId, content }) {
  const { name, logo, eyebrow, title, titleMuted, lede, actions } = content;

  return (
    <div className="split-layout lg:items-end">
      <div className="lg:col-span-8">
        <Reveal className="product-brand-row">
          <CpqLogo src={logo} label={name} className="-m-3 size-20" />
          <div>
            <p className="product-name">{name}</p>
            <p className="type-label mt-1.5 text-(--fg-muted)">{eyebrow}</p>
          </div>
        </Reveal>

        <Reveal order={1}>
          <h2 id={headingId} className="type-display mt-12">
            {title}
            <br />
            <span className="text-(--fg-subtle)">{titleMuted}</span>
          </h2>
        </Reveal>
      </div>

      <Reveal order={2} className="lg:col-span-4">
        <p className="muted-body">{lede}</p>
        <div className="actions-row mt-8">
          {actions.map(({ label, ...action }) => (
            <ActionLink key={label} {...action}>
              {label}
            </ActionLink>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
