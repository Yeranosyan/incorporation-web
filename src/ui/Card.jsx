import clsx from "clsx";
import { Reveal } from "./Reveal";

export function Card({ as = "div", order = 0, className, children }) {
  return (
    <Reveal as={as} order={order} className={clsx("glass-card", className)}>
      {children}
    </Reveal>
  );
}
