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

export const buttonClassName = ({ variant = "primary", size = "md", className } = {}) =>
  clsx("group button-base", VARIANTS[variant], variant !== "text" && SIZES[size], className);
