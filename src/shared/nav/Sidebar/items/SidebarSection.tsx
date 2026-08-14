import { type FC, memo } from "react";
import { SidebarItem } from "./SidebarItem";
import { sectionStyles } from "../styles/sidebar.styles";
import type { SidebarSectionProps } from "../types/types";

export const SidebarSection: FC<SidebarSectionProps> = memo(({
  section,
  collapsed,
  onExpand,
  side = "left",
  onCloseMobile,
}) => {
  return (
    <div className={sectionStyles.container(collapsed)} role="region" aria-label={section.label}>
      {!collapsed && (
        <h3 className={sectionStyles.label}>
          {section.label}
        </h3>
      )}
      <div className={sectionStyles.items}>
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            onExpand={onExpand}
            side={side}
            onCloseMobile={onCloseMobile}
          />
        ))}
      </div>
      {collapsed && (
        <div className={sectionStyles.divider(collapsed)} />
      )}
    </div>
  );
});

SidebarSection.displayName = "SidebarSection";

