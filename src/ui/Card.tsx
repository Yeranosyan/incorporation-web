import clsx from "clsx";
import type { ElementType, ReactNode } from "react";
import { Reveal } from "./Reveal";

export type CardProps = {
  as?: ElementType;
  order?: number;
  className?: string;
  children?: ReactNode;
};

export function Card({ as = "div", order = 0, className, children }: CardProps) {
  return (
    <Reveal as={as} order={order} className={clsx("glass-card", className)}>
      {children}
    </Reveal>
  );
}
