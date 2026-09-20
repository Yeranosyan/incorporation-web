import clsx from "clsx";

const VARIANTS = {
  primary: "button-variant-primary",
  white: "button-variant-white",
  secondary: "button-variant-secondary",
  text: "button-variant-text",
};

const SIZES = {
  md: "button-size-md",
  sm: "button-size-sm",
};

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;
export type ButtonStyle = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export const buttonClassName = ({ variant = "primary", size = "md", className }: ButtonStyle = {}) =>
  clsx("group button-base", VARIANTS[variant], variant !== "text" && SIZES[size], className);
