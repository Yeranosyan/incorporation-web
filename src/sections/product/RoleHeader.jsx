import { ArrowUpRight, Check } from "lucide-react";
import { linkTargetProps } from "@/lib/links";
import { Crossfade } from "@/ui";
import { QuoteSchematic } from "./QuoteSchematic";
import { roleKey } from "./roleIds";

export function RoleHeader({ roles, active, link }) {
  const { metric } = roles[active];

  return (
    <div className="role-header">
      <span aria-hidden="true" className="role-dot-column mt-10">
        <span className="dot-marker bg-(--fg-subtle)" />
        <span className="dot-marker bg-(--fg-subtle)" />
        <span className="dot-marker bg-(--fg-subtle)" />
      </span>

      <div className="relative shrink-0">
        <QuoteSchematic highlighted={metric.value} className="role-schematic" />
        <Crossfade
          items={roles}
          active={active}
          axis="y"
          getKey={roleKey}
          aria-hidden="true"
          className="role-index-slot"
        >
          {(item) => <span className="role-index-badge">{item.index}</span>}
        </Crossfade>
      </div>

      <Crossfade items={roles} active={active} getKey={roleKey} className="min-w-0 flex-1">
        {({ role: roleName, title, lines }) => (
          <>
            <p className="type-label text-(--fg-muted)">{roleName}</p>
            <h4 className="role-title mt-2">{title}</h4>
            <ul className="role-capabilities mt-5">
              {lines.map((line) => (
                <li key={line} className="role-capability">
                  <Check aria-hidden="true" className="check-icon size-4" />
                  {line}
                </li>
              ))}
            </ul>
          </>
        )}
      </Crossfade>

      <a
        href={link.href}
        aria-label={link.label}
        {...linkTargetProps({ external: true })}
        className="role-external-link"
      >
        <ArrowUpRight aria-hidden="true" className="size-5" />
      </a>
    </div>
  );
}
