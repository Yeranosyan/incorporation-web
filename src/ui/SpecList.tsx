import clsx from "clsx";
import type { ReactNode } from "react";

const VALUE_SIZES = {
  md: "spec-value-md",
  sm: "spec-value-sm",
};

export type Spec = { label: string; value: ReactNode };
export type SpecSize = keyof typeof VALUE_SIZES;
export type SpecListProps = { specs: Spec[]; size?: SpecSize; className?: string };

export function SpecList({ specs, size = "md", className }: SpecListProps) {
  return (
    <dl className={clsx("spec-list grid-cols-2", className)}>
      {specs.map(({ label, value }, index) => (
        <div key={label} className="animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
          <dt className="spec-label">{label}</dt>
          <dd className={clsx("mt-3 tracking-[-0.01em]", VALUE_SIZES[size])}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
