import type { ComponentProps } from "react";
import { buttonClassName } from "./buttonStyles";
import type { ButtonSize, ButtonVariant } from "./buttonStyles";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ type = "button", variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClassName({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
