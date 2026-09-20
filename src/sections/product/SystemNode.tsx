import clsx from "clsx";

export type SystemNodeAlign = "start" | "end";
export type SystemNodeProps = { name: string; caption: string; align?: SystemNodeAlign };

export function SystemNode({ name, caption, align = "start" }: SystemNodeProps) {
  return (
    <p className={clsx("system-node", align === "end" ? "system-node-end" : "system-node-start")}>
      <span className="system-node-name">{name}</span>
      <span className="system-node-caption">{caption}</span>
    </p>
  );
}
