import clsx from "clsx";

export function Eyebrow({ className, children }) {
  return (
    <p className={clsx("eyebrow-label", className)}>
      <span aria-hidden="true" className="dot-marker bg-accent" />
      {children}
    </p>
  );
}
