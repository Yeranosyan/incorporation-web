import { useState } from "react";
import { SectionHeader } from "@/ui";
import { RolePanel } from "./RolePanel";
import { RoleTabs } from "./RoleTabs";
import { rolePanelId, roleTabId } from "./roleIds";

const ID_PREFIX = "portal";

export function ProductPortals({ intro, portals }) {
  const { tabsLabel, link, ...header } = intro;
  const [active, setActive] = useState(0);

  return (
    <div className="mt-28">
      <div className="portals-header">
        <SectionHeader level="h3" {...header} />
        <RoleTabs
          idPrefix={ID_PREFIX}
          label={tabsLabel}
          roles={portals}
          active={active}
          onSelect={setActive}
          className="w-full lg:w-xl"
        />
      </div>
      <RolePanel
        id={rolePanelId(ID_PREFIX)}
        labelledBy={roleTabId(ID_PREFIX, portals[active].id)}
        roles={portals}
        active={active}
        link={link}
      />
    </div>
  );
}
