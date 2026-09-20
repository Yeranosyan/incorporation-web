import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeader({ id, eyebrow, title, titleMuted, lede, level = "h2", size = "headline", className }) {
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
