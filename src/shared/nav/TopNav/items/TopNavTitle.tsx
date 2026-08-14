import { memo, type FC } from "react";
import { Menu } from "lucide-react";
import type { TopNavTitleProps } from "../types/types";
import { titleStyles } from "../styles/topNav.styles";

export const TopNavTitle: FC<TopNavTitleProps> = memo(
  ({
    title = "Dashboard",
    subtitle,
    onMobileMenuOpen,
    onToggleSidebar,
    styleConfig,
  }) => {
    return (
      <div className={titleStyles.container}>
        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={onMobileMenuOpen || onToggleSidebar}
          className={titleStyles.mobileButton}
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Title & Subtitle */}
        <div className={titleStyles.textContainer}>
          <h1 className={titleStyles.titleText(styleConfig)}>{title}</h1>
          {subtitle && (
            <span className={titleStyles.subtitleText(styleConfig)}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  },
);

TopNavTitle.displayName = "TopNavTitle";
