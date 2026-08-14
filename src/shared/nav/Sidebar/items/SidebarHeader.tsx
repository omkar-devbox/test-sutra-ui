import { type FC, memo } from "react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Tooltip } from "@/shared/ui";
import { headerStyles } from "../styles/sidebar.styles";
import type { SidebarHeaderProps } from "../types/types";

export const SidebarHeader: FC<SidebarHeaderProps> = memo(({
  collapsed,
  isHeaderHovered,
  setIsHeaderHovered,
  onToggle,
  logo,
  companyName = "Company",
  side = "left",
  isMobileOpen = false,
  onCloseMobile,
}) => {
  return (
    <div
      className={headerStyles.container(collapsed)}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      <div className={headerStyles.content(collapsed, side)}>
        {/* Logo & Name Area */}
        <div className={headerStyles.logoArea(collapsed, isHeaderHovered)}>
          {logo ? (
            typeof logo === "string" ? (
              <img
                src={logo}
                alt={typeof companyName === "string" ? companyName.replace("\n", " ") : "Company Logo"}
                className="h-10 w-10 object-contain rounded-xl img-clear shrink-0"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
              />
            ) : (
              <div className="shrink-0 img-clear">{logo}</div>
            )
          ) : (
            <div className={headerStyles.logo}>
              <span className="text-white font-bold text-xl">
                {companyName.charAt(0)}
              </span>
            </div>
          )}
          <span className={headerStyles.companyName(collapsed)}>
            {companyName}
          </span>
        </div>

        {/* Action Buttons Area: Mobile Close vs Desktop Toggle */}
        <div className="flex items-center gap-1">
          {/* Mobile explicit close button */}
          {isMobileOpen && onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className={headerStyles.mobileCloseButton}
              aria-label="Close mobile sidebar"
              title="Close navigation"
            >
              <X size={20} />
            </button>
          )}

          {/* Desktop Toggle Button Area */}
          <div
            className={headerStyles.toggleButtonArea(collapsed, isHeaderHovered, side)}
          >
            <Tooltip
              content={collapsed ? "Show sidebar" : "Hide sidebar"}
              placement={side === "left" ? "right" : "left"}
              offset={collapsed ? 20 : 8}
            >
              <button
                type="button"
                onClick={onToggle}
                className={headerStyles.toggleButton}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <PanelLeftOpen size={20} />
                ) : (
                  <PanelLeftClose size={20} />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
});

SidebarHeader.displayName = "SidebarHeader";

