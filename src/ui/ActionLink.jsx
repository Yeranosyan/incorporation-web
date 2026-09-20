import { ArrowRight, ArrowUpRight } from "lucide-react";
import { linkTargetProps } from "@/lib/links";
import { buttonClassName } from "./buttonStyles";

export function ActionLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...rest
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={href}
      {...linkTargetProps({ external })}
      className={buttonClassName({ variant, size, className })}
      {...rest}
    >
      {children}
      <Icon aria-hidden="true" className="action-link-arrow" />
    </a>
  );
}
