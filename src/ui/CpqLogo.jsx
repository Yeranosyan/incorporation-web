import clsx from "clsx";

export function CpqLogo({ src, label = "CPQ Teams", className }) {
  return (
    <img
      src={src}
      alt={label}
      width="256"
      height="256"
      decoding="async"
      className={clsx("shrink-0", className)}
    />
  );
}
