import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import { Reveal } from "./Reveal";

export type HairlineGridProps = {
  as?: ElementType;
  className?: string;
  gridClassName?: string;
  children?: ReactNode;
};

export function HairlineGrid({ as: Tag = "div", className, gridClassName, children }: HairlineGridProps) {
  return (
    <Reveal className={clsx("hairline-frame", className)}>
      <Tag className={clsx("hairline-grid", gridClassName)}>{children}</Tag>
    </Reveal>
  );
}
