import { cn } from "@/shared/lib/utils";
import type { TopNavStyleConfig } from "../types/types";

// Main Header Container Styles
export const headerContainerStyles = (
  className?: string,
  styleConfig?: TopNavStyleConfig,
) =>
  cn(
    "h-[64px] w-full bg-[#004066] dark:bg-[#00263e] border-b border-[#003352] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-200 text-white shadow-md",
    styleConfig?.container?.bg,
    styleConfig?.container?.border,
    styleConfig?.container?.height,
    styleConfig?.container?.shadow,
    className,
  );

// Title & Subtitle Section Styles
export const titleStyles = {
  container: "flex items-center gap-3",
  mobileButton:
    "md:hidden p-2 rounded-xl text-[#ebf7ff]/70 hover:bg-[#003352] hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0077be]",
  textContainer: "flex flex-col gap-0.5",
  titleText: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "text-[15px] md:text-base font-bold text-white tracking-tight leading-tight",
      styleConfig?.title?.textColor,
    ),
  subtitleText: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "text-[11px] text-[#ebf7ff]/70 font-normal leading-none",
      styleConfig?.title?.subtitleColor,
    ),
};

// Theme Selector Dropdown Styles
export const themeDropdownStyles = {
  container: "relative",
  button: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "p-2 rounded-xl text-[#ebf7ff]/70 hover:bg-[#003352] hover:text-white transition-all duration-150 cursor-pointer flex items-center justify-center",
      styleConfig?.themeDropdown?.buttonHoverBg,
    ),
  backdrop: "fixed inset-0 z-40",
  dropdownMenu: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "absolute right-0 mt-2 w-44 rounded-2xl bg-[#003352] border border-[#00263e] text-white shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150",
      styleConfig?.themeDropdown?.dropdownBg,
      styleConfig?.themeDropdown?.dropdownBorder,
    ),
  headerLabel:
    "px-3 py-1.5 text-[11px] font-bold text-[#ebf7ff]/60 uppercase tracking-wider",
  item: (isActive: boolean, styleConfig?: TopNavStyleConfig) =>
    cn(
      "w-full px-3 py-2 text-xs font-medium flex items-center justify-between cursor-pointer transition-colors",
      isActive
        ? cn(
          "text-white bg-[#0077be] font-semibold",
          styleConfig?.themeDropdown?.activeItemBg,
          styleConfig?.themeDropdown?.activeItemText,
        )
        : cn(
          "text-[#ebf7ff]/90 hover:bg-[#004066]",
          styleConfig?.themeDropdown?.itemHoverBg,
        ),
    ),
};

// Notifications Button Styles
export const notificationStyles = {
  container: "relative",
  button: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "p-2 rounded-xl text-[#ebf7ff]/70 hover:bg-[#003352] hover:text-white transition-all duration-150 cursor-pointer relative",
      styleConfig?.notifications?.buttonHoverBg,
      styleConfig?.notifications?.iconColor,
    ),
  indicatorPing: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-[#0077be] ring-[1.5px] ring-[#004066] animate-ping",
      styleConfig?.notifications?.badgeColor,
    ),
  indicatorDot: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-[#0077be] ring-[1.5px] ring-[#004066]",
      styleConfig?.notifications?.badgeColor,
    ),
};

// User Profile Menu Styles
export const userProfileStyles = {
  container: "relative",
  button: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-[#003352] transition-all duration-150 cursor-pointer border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0077be]/40",
      styleConfig?.userProfile?.buttonHoverBg,
    ),
  avatarImg: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "w-8 h-8 rounded-full object-cover ring-2 ring-[#0077be] img-clear",
      styleConfig?.userProfile?.avatarRing,
    ),
  defaultAvatar:
    "w-8 h-8 rounded-full bg-gradient-to-br from-[#0077be] to-[#004066] text-white font-semibold text-xs flex items-center justify-center shadow-sm shadow-[#0077be]/25",
  userInfoText: "hidden md:flex flex-col text-left",
  userName: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "text-[13px] font-semibold text-white leading-tight",
      styleConfig?.userProfile?.nameColor,
    ),
  userRoleText: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "text-[10.5px] text-[#ebf7ff]/70 leading-tight",
      styleConfig?.userProfile?.roleColor,
    ),
  chevronIcon: (isOpen: boolean) =>
    cn(
      "text-[#ebf7ff]/60 transition-transform duration-200 hidden md:block",
      isOpen && "rotate-180 text-white",
    ),
  backdrop: "fixed inset-0 z-40",
  dropdownMenu: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "absolute right-0 mt-2 w-56 rounded-2xl bg-[#003352] border border-[#00263e] text-white shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150",
      styleConfig?.userProfile?.dropdownBg,
      styleConfig?.userProfile?.dropdownBorder,
    ),
  header: "px-4 py-2.5 border-b border-[#00263e]",
  headerName: "text-xs font-bold text-white",
  headerEmail: "text-[11px] text-[#ebf7ff]/70 truncate",
  roleBadge:
    "inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[10px] font-semibold text-white bg-[#0077be] rounded-md",
  itemGroup: "py-1",
  item: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "w-full px-4 py-2 text-xs font-medium text-[#ebf7ff]/90 hover:bg-[#004066] flex items-center gap-2.5 cursor-pointer transition-colors",
      styleConfig?.userProfile?.itemHoverBg,
    ),
  logoutDivider: "border-t border-[#00263e] pt-1",
  logoutItem: (styleConfig?: TopNavStyleConfig) =>
    cn(
      "w-full px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-950/40 flex items-center gap-2.5 cursor-pointer transition-colors",
      styleConfig?.userProfile?.logoutHoverBg,
      styleConfig?.userProfile?.logoutHoverText,
    ),
};

export const topNavStyles = {
  header: headerContainerStyles,
  title: titleStyles,
  themeDropdown: themeDropdownStyles,
  notifications: notificationStyles,
  userProfile: userProfileStyles,
};
