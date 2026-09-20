import clsx from "clsx";
import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { resolveKeyIndex } from "@/lib/keyboard";
import { rolePanelId, roleTabId } from "./roleIds";
import type { Role } from "./roleIds";

export type RoleTabsProps = {
  idPrefix: string;
  label: string;
  roles: Role[];
  active: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function RoleTabs({ idPrefix, label, roles, active, onSelect, className }: RoleTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = resolveKeyIndex(event.key, active, roles.length, { wrap: true, horizontalOnly: true });
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={clsx("role-tabs", className)}
      style={{ gridTemplateColumns: `repeat(${roles.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="role-tabs-indicator"
        style={{ width: `calc((100% - 0.5rem) / ${roles.length})`, translate: `${active * 100}% 0` }}
      />
      {roles.map(({ id, index, role, shortRole }, position) => (
        <button
          key={id}
          ref={(node) => {
            tabRefs.current[position] = node;
          }}
          type="button"
          role="tab"
          id={roleTabId(idPrefix, id)}
          aria-selected={position === active}
          aria-controls={rolePanelId(idPrefix)}
          tabIndex={position === active ? 0 : -1}
          onClick={() => onSelect(position)}
          className={clsx("role-tab", position === active ? "text-(--fg)" : "text-(--fg-muted) hover:text-(--fg)")}
        >
          <span className="type-label text-(--fg-subtle)">{index}</span>
          <span className="sm:hidden">{shortRole}</span>
          <span className="hidden sm:inline">{role}</span>
        </button>
      ))}
    </div>
  );
}
