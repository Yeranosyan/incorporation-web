import clsx from "clsx";
import type { ReactNode } from "react";

export type BadgeProps = { className?: string; children?: ReactNode };

export function Badge({ className, children }: BadgeProps) {
  return <span className={clsx("bg-white text-ink badge", className)}>{children}</span>;
}
