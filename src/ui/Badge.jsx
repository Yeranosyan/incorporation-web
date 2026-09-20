import clsx from "clsx";

export function Badge({ className, children }) {
  return <span className={clsx("bg-white text-ink badge", className)}>{children}</span>;
}
