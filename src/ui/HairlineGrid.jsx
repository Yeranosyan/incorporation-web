import clsx from "clsx";
import { Reveal } from "./Reveal";

export function HairlineGrid({ as: Tag = "div", className, gridClassName, children }) {
  return (
    <Reveal className={clsx("hairline-frame", className)}>
      <Tag className={clsx("hairline-grid", gridClassName)}>{children}</Tag>
    </Reveal>
  );
}
