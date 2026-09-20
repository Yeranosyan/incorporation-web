import clsx from "clsx";
import { useInView } from "@/hooks/useInView";

export function Reveal({ as: Tag = "div", order = 0, fade = true, className, style, children, ...rest }) {
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
