import { padNumber } from "@/lib/format";
import { Crossfade } from "@/ui";

const TICKS_PER_STEP = 12;

const layerKey = ({ label }) => label;

export function MembershipSteps({ credential, step, onSelect }) {
  const { label, layers } = credential;
  const tickCount = layers.length * TICKS_PER_STEP;

  return (
    <>
      <dl aria-label={label} className="sr-only">
        {layers.map(({ label: term, value, description }) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5">
        <div aria-hidden="true" className="membership-hud-readout">
          <p className="membership-hud-count">
            <span className="digit-window">
              <span className="digit-reel" style={{ "--digit": step }}>
                {layers.map((layer, index) => (
                  <span key={layer.label}>{padNumber(index + 1, 2)}</span>
                ))}
              </span>
            </span>
            <span className="text-sm tracking-[0.08em] text-(--fg-subtle)">/ {padNumber(layers.length, 2)}</span>
          </p>
          <Crossfade items={layers} active={step} axis="y" getKey={layerKey} className="membership-hud-label">
            {({ label: term }) => term}
          </Crossfade>
        </div>

        <div className="membership-gauge" style={{ "--ticks-per-step": TICKS_PER_STEP }}>
          {Array.from({ length: tickCount }, (_, tick) => (
            <span
              key={tick}
              aria-hidden="true"
              data-major={tick % TICKS_PER_STEP === 0 || tick === tickCount - 1 || undefined}
              className="membership-gauge-tick"
              style={{ "--tick": tick }}
            />
          ))}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${layers.length}, minmax(0, 1fr))` }}>
            {layers.map(({ label: term }, index) => (
              <button
                key={term}
                type="button"
                aria-label={term}
                aria-current={index === step ? "step" : undefined}
                onClick={() => onSelect(index)}
                className="cursor-pointer rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
