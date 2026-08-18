import { type FC, memo } from "react";
import { cn } from "@/shared/lib/utils";
import type { BottomNavItemButtonProps } from "../types/bottomNav.types";
import { navItemButtonStyles } from "../styles/bottomNav.styles";

export const BottomNavItemButton: FC<BottomNavItemButtonProps> = memo(
  ({ item, isActive, onClick }) => {
    const Icon = item.icon;

    return (
      <button
        onClick={onClick}
        aria-label={item.label}
        className={navItemButtonStyles(isActive)}
      >
        {/* Active Pill Bar Indicator */}
        {isActive && (
          <span className="absolute -top-1.5 w-7 h-1 bg-[#0077be] rounded-full animate-in fade-in zoom-in-75 duration-200 shadow-sm shadow-[#0077be]/50" />
        )}

        <div className="relative flex items-center justify-center">
          <Icon
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isActive ? "scale-110 text-[#0077be]" : "scale-100 opacity-90"
            )}
          />

          {/* Badge Indicator */}
          {item.badge && (
            <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0077be] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0077be] ring-2 ring-white dark:ring-[#00263e]" />
            </span>
          )}
        </div>

        <span
          className={cn(
            "text-[10px] mt-1 leading-none tracking-tight transition-colors select-none",
            isActive
              ? "text-[#0077be] font-bold"
              : "text-[#004066]/70 dark:text-[#ebf7ff]/70"
          )}
        >
          {item.label}
        </span>
      </button>
    );
  }
);

BottomNavItemButton.displayName = "BottomNavItemButton";
