import clsx from "clsx";

export function Container({ as: Tag = "div", className, children }) {
  return <Tag className={clsx("page-container", className)}>{children}</Tag>;
}
