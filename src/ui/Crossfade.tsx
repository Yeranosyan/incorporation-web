import clsx from "clsx";
import type { ComponentProps, Key, ReactNode } from "react";

export type CrossfadeAxis = "x" | "y";
export type CrossfadeProps<T> = Omit<ComponentProps<"div">, "children"> & {
  items: readonly T[];
  active: number;
  axis?: CrossfadeAxis;
  getKey?: (item: T, index: number) => Key;
  children: (item: T, index: number) => ReactNode;
};

export function Crossfade<T>({
  items,
  active,
  axis = "x",
  getKey = (_, index) => index,
  className,
  children,
  ...rest
}: CrossfadeProps<T>) {
  return (
    <div className={clsx("grid", className)} {...rest}>
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <div
            key={getKey(item, index)}
            data-active={isActive}
            data-axis={axis}
            aria-hidden={isActive ? undefined : true}
            inert={!isActive}
            className="crossfade-item"
            style={{ "--offset": Math.sign(index - active) }}
          >
            {children(item, index)}
          </div>
        );
      })}
    </div>
  );
}
