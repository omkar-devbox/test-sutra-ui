import { type FC, memo } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { Tooltip } from "@/shared/ui";
import { footerStyles } from "../styles/sidebar.styles";
import { cn } from "../../../lib/utils";
import type { SidebarFooterProps } from "../types/types";

export const SidebarFooter: FC<SidebarFooterProps> = memo(({
  collapsed,
  onLogout,
  user,
  side = "left",
}) => {
  const tooltipPlacement = side === "left" ? "right" : "left";

  const userAvatarNode = (
    <div className={footerStyles.avatar}>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover rounded-full img-clear"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        />
      ) : (
        <UserIcon size={18} />
      )}
    </div>
  );

  const logoutBtnNode = (
    <button
      type="button"
      onClick={onLogout}
      aria-label="Logout"
      className={cn(
        footerStyles.logoutButton(collapsed),
        !collapsed && side === "right" && "flex-row-reverse",
      )}
    >
      <LogOut size={20} className={footerStyles.logoutIcon(collapsed)} />
      {!collapsed && <span className="text-[14px] font-medium">Logout</span>}
    </button>
  );

  return (
    <div className={footerStyles.container(collapsed)}>
      {user && (
        <div className={footerStyles.userArea(collapsed, side)}>
          {collapsed ? (
            <Tooltip content={user.name} placement={tooltipPlacement} offset={16}>
              {userAvatarNode}
            </Tooltip>
          ) : (
            userAvatarNode
          )}

          {!collapsed && (
            <div
              className={footerStyles.userInfo}
              style={{ textAlign: side === "right" ? "right" : "left" }}
            >
              <p className={footerStyles.userName}>{user.name}</p>
              <p className={footerStyles.userEmail}>{user.email}</p>
              {user.organizationName && (
                <p className={footerStyles.userOrg}>{user.organizationName}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1 items-center w-full">
        {collapsed ? (
          <Tooltip content="Logout" placement={tooltipPlacement} offset={16}>
            {logoutBtnNode}
          </Tooltip>
        ) : (
          logoutBtnNode
        )}
      </div>
    </div>
  );
});

SidebarFooter.displayName = "SidebarFooter";
