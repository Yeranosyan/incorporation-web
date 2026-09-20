import { ArrowRight, ArrowUp } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Crossfade, Meter, SpecList } from "@/ui";
import { RoleHeader } from "./RoleHeader";
import { RoleMetric } from "./RoleMetric";
import { roleKey } from "./roleIds";

const METER_ICONS = [ArrowRight, ArrowUp];

export function RolePanel({ id, labelledBy, roles, active, link }) {
  const [ref, inView] = useInView();
  const role = roles[active];

  return (
    <div
      ref={ref}
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      data-visible={inView}
      className="reveal role-panel mt-8"
    >
      <RoleHeader roles={roles} active={active} link={link} />

      <div className="role-panel-inset mt-6">
        <Crossfade items={roles} active={active} getKey={roleKey}>
          {(item) => <SpecList specs={item.specs} className="sm:grid-cols-4" />}
        </Crossfade>

        <div className="role-panel-metrics mt-10">
          <RoleMetric roles={roles} active={active} />
          <div>
            <Crossfade items={roles} active={active} getKey={roleKey} className="text-(--fg-muted)">
              {(item) => item.distributionLabel}
            </Crossfade>
            <div className="mt-6 space-y-7">
              {role.meters.map((meter, index) => (
                <Meter key={index} {...meter} icon={METER_ICONS[index]} active={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
