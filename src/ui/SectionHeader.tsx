import clsx from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export type HeadingLevel = "h1" | "h2" | "h3";
export type HeadingSize = "display" | "headline";
export type SectionHeaderProps = {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleMuted?: ReactNode;
  lede?: ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  titleMuted,
  lede,
  level = "h2",
  size = "headline",
  className,
}: SectionHeaderProps) {
  const Heading = level;

  return (
    <Reveal className={clsx("max-w-4xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className={clsx("mt-6", size === "display" ? "type-display" : "type-headline")}>
        {title}
        {titleMuted && <span className="text-(--fg-subtle)"> {titleMuted}</span>}
      </Heading>
      {lede && <p className="muted-body max-w-2xl mt-6">{lede}</p>}
    </Reveal>
  );
}
