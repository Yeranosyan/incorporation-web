import clsx from "clsx";
import { Container } from "./Container";

const SPACING = {
  default: "section-spacing-default",
  hero: "section-spacing-hero",
  compact: "section-spacing-compact",
};

export function Section({ id, tone = "light", spacing = "default", labelledBy, className, children }) {
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
