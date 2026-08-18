import { type FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import type { TopNavProps } from "./types/types";
import { headerContainerStyles } from "./styles/topNav.styles";
import { TopNavTitle } from "./items/TopNavTitle";
import { TopNavThemeDropdown } from "./items/TopNavThemeDropdown";
import { TopNavNotifications } from "./items/TopNavNotifications";
import { TopNavUserProfile } from "./items/TopNavUserProfile";
import { TopHorizontalMenu } from "./items/TopHorizontalMenu";

export const TopNav: FC<TopNavProps> = memo(
  ({
    title = "Dashboard",
    subtitle,
    user = {
      name: "John Doe",
      email: "",
      role: "System Admin",
    },
    onLogout,
    className,
    styleConfig,
  }) => {
    const navigate = useNavigate();

    return (
      <header className={headerContainerStyles(className, styleConfig)}>
        {/* Left Side: Brand Logo & Horizontal Navigation Menu */}
        <div className="flex items-center gap-3 md:gap-6">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="h-9 w-9 bg-gradient-to-br from-[#0077be] via-[#005c94] to-[#004066] rounded-xl flex items-center justify-center shadow-md shadow-[#0077be]/30 text-white font-bold text-base transition-transform group-hover:scale-105">
              S
            </div>
            <span className="font-extrabold text-base text-white tracking-tight hidden sm:inline-block">
              Sutra<span className="text-[#0077be] dark:text-[#ebf7ff]">Test</span>
            </span>
          </div>

          <div className="h-5 w-px bg-[#005280]/60 hidden md:block" />

          {/* Center/Left: Desktop Top Horizontal Menu with Dropdowns */}
          <div className="hidden md:flex items-center">
            <TopHorizontalMenu />
          </div>
        </div>

        {/* Right Side: Page Title/Subtitle & User Tools */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Page Title & Subtitle moved to Right Side */}
          <div className="border-r border-[#005280]/60 pr-3">
            <TopNavTitle
              title={title}
              subtitle={subtitle}
              styleConfig={styleConfig}
            />
          </div>

          {/* Theme Selector */}
          <TopNavThemeDropdown styleConfig={styleConfig} />

          {/* Notifications Button */}
          <TopNavNotifications styleConfig={styleConfig} />

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-[#005280]/60 mx-0.5" />

          {/* User Profile */}
          <TopNavUserProfile
            user={user}
            onLogout={onLogout}
            styleConfig={styleConfig}
          />
        </div>
      </header>
    );
  },
);

TopNav.displayName = "TopNav";
