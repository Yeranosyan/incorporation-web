import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "@/ui";
import { linkTargetProps } from "@/lib/links";

export function PlatformList({ label, platforms }) {
  return (
    <div className="mt-20">
      <Eyebrow>{label}</Eyebrow>
      <Reveal as="ul" className="platform-list mt-8">
        {platforms.map(({ name, description, href }) => (
          <li key={name}>
            <a href={href} {...linkTargetProps({ external: true })} className="group spread-row-top platform-link">
              <span>
                <span className="platform-name">{name}</span>
                <span className="platform-description mt-2">{description}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="platform-link-arrow" />
            </a>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
