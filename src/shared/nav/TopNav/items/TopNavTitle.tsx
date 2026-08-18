import { memo, type FC } from "react";
import type { TopNavTitleProps } from "../types/types";
import { titleStyles } from "../styles/topNav.styles";

export const TopNavTitle: FC<TopNavTitleProps> = memo(
  ({
    title = "Dashboard",
    subtitle,
    styleConfig,
  }) => {
    return (
      <div className={titleStyles.container}>
        {/* Page Title & Subtitle */}
        <div className="hidden lg:flex flex-col text-right items-end">
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
