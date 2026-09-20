import clsx from "clsx";

const TONES = {
  lime: "bg-lime",
  accent: "bg-accent",
};

export function Meter({ label, value, total, tone = "accent", icon: Icon, active = true }) {
  const ratio = active ? value / total : 0;

  return (
    <div>
      <div className="spread-row items-center">
        <span key={label} className="animate-fade-in text-[0.9375rem] text-(--fg-muted)">
          {label}
        </span>
        <span className="meter-readout">
          <span key={`${value}/${total}`} className="animate-fade-in">
            {value} / {total}
          </span>
          {Icon && <Icon aria-hidden="true" className="size-4 text-(--fg-subtle)" />}
        </span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
        className="meter-track mt-3"
      >
        <div
          data-meter-fill=""
          className={clsx("meter-fill", TONES[tone])}
          style={{ clipPath: `inset(0 ${(1 - ratio) * 100}% 0 0 round 9999px)` }}
        />
        <div aria-hidden="true" className="meter-thumb-carrier" style={{ translate: `${ratio * 100}% 0` }}>
          <span className={clsx("meter-thumb", TONES[tone])} />
        </div>
      </div>
    </div>
  );
}
