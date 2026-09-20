import clsx from "clsx";
import type { ElementType, ReactNode } from "react";

export type ContainerProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={clsx("page-container", className)}>{children}</Tag>;
}
