import clsx from "clsx";
import type { ReactNode } from "react";

export type EyebrowProps = { className?: string; children?: ReactNode };

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p className={clsx("eyebrow-label", className)}>
      <span aria-hidden="true" className="dot-marker bg-accent" />
      {children}
    </p>
  );
}
