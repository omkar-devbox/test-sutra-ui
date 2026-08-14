import { useState, memo, type FC } from "react";
import { Bell } from "lucide-react";
import type { TopNavNotificationsProps } from "../types/types";
import { notificationStyles } from "../styles/topNav.styles";

export const TopNavNotifications: FC<TopNavNotificationsProps> = memo(
  ({ hasUnread = true, onNotificationClick, styleConfig }) => {
    const [hasUnreadNotifications, setHasUnreadNotifications] =
      useState(hasUnread);

    const handleClick = () => {
      setHasUnreadNotifications(false);
      if (onNotificationClick) {
        onNotificationClick();
      }
    };

    return (
      <div className={notificationStyles.container}>
        <button
          type="button"
          onClick={handleClick}
          className={notificationStyles.button(styleConfig)}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {hasUnreadNotifications && (
            <>
              <span className={notificationStyles.indicatorPing(styleConfig)} />
              <span className={notificationStyles.indicatorDot(styleConfig)} />
            </>
          )}
        </button>
      </div>
    );
  },
);

TopNavNotifications.displayName = "TopNavNotifications";
