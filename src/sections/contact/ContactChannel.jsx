import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { linkTargetProps } from "@/lib/links";

export function ContactChannel({ label, value, href, external = false }) {
  const Row = href ? "a" : "div";
  const linkProps = href ? { href, ...linkTargetProps({ external }) } : {};

  return (
    <li className="border-b border-(--line)">
      <Row {...linkProps} className="channel-row group channel-row-layout">
        {href && <span aria-hidden="true" className="channel-fill absolute inset-0 bg-accent" />}
        <span className={clsx("channel-label", href && "channel-text-hover")}>{label}</span>
        <span className={clsx("channel-value", href && "channel-text-hover")}>{value}</span>
        {href && <ArrowUpRight aria-hidden="true" className="channel-arrow" />}
      </Row>
    </li>
  );
}
