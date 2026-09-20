import { useScrollStep } from "@/hooks/useScrollStep";
import { ActionLink, Eyebrow, HairlineGrid, Reveal, Section } from "@/ui";
import { MembershipDeck } from "./MembershipDeck";
import { MembershipSteps } from "./MembershipSteps";

export function Membership({ id, content }) {
  const { eyebrow, title, titleMuted, actions, credential, pillarsLabel, pillars } = content;
  const headingId = `${id}-title`;
  const [trackRef, step, scrollToStep] = useScrollStep();

  return (
    <Section id={id} tone="stone" labelledBy={headingId}>
      <div ref={trackRef} className="membership-track" style={{ "--steps": credential.layers.length }}>
        <div className="membership-stage">
          <Reveal className="lg:col-span-5 lg:self-end">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="membership-title">
              {title}
              <span className="text-(--fg-subtle)"> {titleMuted}</span>
            </h2>
          </Reveal>

          <MembershipDeck
            layers={credential.layers}
            step={step}
            className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
          />

          <div className="lg:col-span-5 lg:row-start-2 lg:self-start">
            <MembershipSteps credential={credential} step={step} onSelect={scrollToStep} />
            <div className="actions-row mt-8">
              {actions.map(({ label, ...action }) => (
                <ActionLink key={label} {...action}>
                  {label}
                </ActionLink>
              ))}
            </div>
          </div>
        </div>

        {credential.layers.map(({ label }, index) => (
          <span key={label} data-step-marker aria-hidden="true" className="membership-step-marker" style={{ "--step": index }} />
        ))}
      </div>

      <div className="mt-20">
        <Eyebrow>{pillarsLabel}</Eyebrow>
        <HairlineGrid as="ul" className="mt-8" gridClassName="sm:grid-cols-3">
          {pillars.map(({ name, description }) => (
            <li key={name} className="hairline-cell">
              <p className="type-title">{name}</p>
              <p className="muted-copy-small mt-3">{description}</p>
            </li>
          ))}
        </HairlineGrid>
      </div>
    </Section>
  );
}
