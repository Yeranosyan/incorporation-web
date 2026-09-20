import clsx from "clsx";

export function SystemNode({ name, caption, align = "start" }) {
  return (
    <p className={clsx("system-node", align === "end" ? "system-node-end" : "system-node-start")}>
      <span className="system-node-name">{name}</span>
      <span className="system-node-caption">{caption}</span>
    </p>
  );
}
