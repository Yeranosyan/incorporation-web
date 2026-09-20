import clsx from "clsx";
import type { ComponentProps, ElementType } from "react";
import { useInView } from "@/hooks/useInView";

export type RevealProps = ComponentProps<"div"> & {
  as?: ElementType;
  order?: number;
  fade?: boolean;
};

export function Reveal({ as: Tag = "div", order = 0, fade = true, className, style, children, ...rest }: RevealProps) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      className={clsx(fade && "reveal", className)}
      style={{ "--order": order, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
