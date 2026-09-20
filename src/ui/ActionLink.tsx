import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { linkTargetProps } from "@/lib/links";
import { buttonClassName } from "./buttonStyles";
import type { ButtonSize, ButtonVariant } from "./buttonStyles";

export type ActionTarget = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
};

export type ActionLinkProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
};

export function ActionLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...rest
}: ActionLinkProps) {
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
