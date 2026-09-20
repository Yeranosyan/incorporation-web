import { padNumber } from "@/lib/format";
import { Crossfade } from "@/ui";
import { QuoteSchematic } from "./QuoteSchematic";
import { roleKey } from "./roleIds";
import type { Role } from "./roleIds";

export type RoleMetricProps = { roles: Role[]; active: number };

export function RoleMetric({ roles, active }: RoleMetricProps) {
  return (
    <div className="flex items-stretch gap-5">
      <div className="min-w-0 flex-1">
        <Crossfade items={roles} active={active} getKey={roleKey} className="text-center text-sm text-(--fg-muted)">
          {(item) => item.metric.label}
        </Crossfade>
        <div aria-hidden="true" className="role-metric-ticks-x mt-2" />
        <div className="role-metric-stage mt-4">
          <QuoteSchematic className="role-metric-schematic" />
          <Crossfade
            items={roles}
            active={active}
            axis="y"
            getKey={roleKey}
            className="type-numeral relative [--crossfade-distance:0.45em]"
          >
            {(item) => padNumber(item.metric.value, 2)}
          </Crossfade>
        </div>
      </div>
      <div className="role-metric-axis">
        <div aria-hidden="true" className="role-metric-ticks-y" />
        <Crossfade items={roles} active={active} axis="y" getKey={roleKey} className="role-metric-axis-label">
          {(item) => item.metric.axis}
        </Crossfade>
      </div>
    </div>
  );
}
