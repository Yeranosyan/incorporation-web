import { buttonClassName } from "./buttonStyles";

export function Button({ type = "button", variant, size, className, children, ...rest }) {
  return (
    <button type={type} className={buttonClassName({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
