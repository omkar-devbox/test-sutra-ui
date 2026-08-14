import { type FC, memo } from "react";
import { SidebarSection } from "./SidebarSection";
import { navStyles } from "../styles/sidebar.styles";
import type { MenuSection } from "../types/types";

interface SidebarNavProps {
  menu: MenuSection[];
  collapsed: boolean;
  onExpand: () => void;
  side?: "left" | "right";
  onCloseMobile?: () => void;
}

export const SidebarNav: FC<SidebarNavProps> = memo(({
  menu,
  collapsed,
  onExpand,
  side = "left",
  onCloseMobile,
}) => {
  return (
    <div className={navStyles.container(collapsed)} role="navigation" aria-label="Main Navigation">
      {menu.map((section) => (
        <SidebarSection
          key={section.id}
          section={section}
          collapsed={collapsed}
          onExpand={onExpand}
          side={side}
          onCloseMobile={onCloseMobile}
        />
      ))}
    </div>
  );
});

SidebarNav.displayName = "SidebarNav";

