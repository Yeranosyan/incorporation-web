import clsx from "clsx";

export type CpqLogoProps = { src: string; label?: string; className?: string };

export function CpqLogo({ src, label = "CPQ Teams", className }: CpqLogoProps) {
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
