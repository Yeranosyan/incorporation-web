import clsx from "clsx";
import type { ReactNode } from "react";
import { Container } from "./Container";

const SPACING = {
  default: "section-spacing-default",
  hero: "section-spacing-hero",
  compact: "section-spacing-compact",
};

export type SectionTone = "light" | "dark" | "stone";
export type SectionSpacing = keyof typeof SPACING;
export type SectionProps = {
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  labelledBy?: string;
  className?: string;
  children?: ReactNode;
};

export function Section({
  id,
  tone = "light",
  spacing = "default",
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={clsx("relative overflow-clip", SPACING[spacing], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
