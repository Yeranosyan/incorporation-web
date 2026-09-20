import clsx from "clsx";

export function Crossfade({ items, active, axis = "x", getKey = (_, index) => index, className, children, ...rest }) {
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
