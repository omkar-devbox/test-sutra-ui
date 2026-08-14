import { useState, memo, type FC } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/shared/theme";
import type { TopNavThemeDropdownProps } from "../types/types";
import { themeDropdownStyles } from "../styles/topNav.styles";

export const TopNavThemeDropdown: FC<TopNavThemeDropdownProps> = memo(
  ({ styleConfig }) => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={themeDropdownStyles.container}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={themeDropdownStyles.button(styleConfig)}
          aria-label="Select Theme"
          aria-expanded={isOpen}
          title={`Current Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
        >
          {resolvedTheme === "dark" ? (
            <Moon size={18} className="text-indigo-400" />
          ) : (
            <Sun size={18} className="text-amber-500" />
          )}
        </button>

        {isOpen && (
          <>
            <div
              className={themeDropdownStyles.backdrop}
              onClick={() => setIsOpen(false)}
            />
            <div className={themeDropdownStyles.dropdownMenu(styleConfig)}>
              <div className={themeDropdownStyles.headerLabel}>Appearance</div>

              <button
                type="button"
                onClick={() => {
                  setTheme("light");
                  setIsOpen(false);
                }}
                className={themeDropdownStyles.item(theme === "light", styleConfig)}
              >
                <span className="flex items-center gap-2.5">
                  <Sun size={15} className="text-amber-500" />
                  Light
                </span>
                {theme === "light" && (
                  <Check size={14} className="text-indigo-500" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTheme("dark");
                  setIsOpen(false);
                }}
                className={themeDropdownStyles.item(theme === "dark", styleConfig)}
              >
                <span className="flex items-center gap-2.5">
                  <Moon size={15} className="text-indigo-400" />
                  Dark
                </span>
                {theme === "dark" && (
                  <Check size={14} className="text-indigo-500" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTheme("system");
                  setIsOpen(false);
                }}
                className={themeDropdownStyles.item(theme === "system", styleConfig)}
              >
                <span className="flex items-center gap-2.5">
                  <Monitor size={15} className="text-slate-400" />
                  System
                </span>
                {theme === "system" && (
                  <Check size={14} className="text-indigo-500" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    );
  },
);

TopNavThemeDropdown.displayName = "TopNavThemeDropdown";
