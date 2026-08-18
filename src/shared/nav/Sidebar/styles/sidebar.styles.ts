import { cn } from "../../../lib/utils";

// Main Sidebar Container
export const asideStyles = (
  collapsed: boolean,
  resizable: boolean,
  isResizing: boolean,
  isMobileOpen: boolean,
  side: "left" | "right" = "left",
) =>
  cn(
    "h-screen bg-[#004066] dark:bg-[#00263e] text-white flex flex-col shrink-0 overflow-visible isolate select-none touch-pan-y relative transition-colors duration-200 transform-gpu",
    side === "left"
      ? "border-r border-[#003352] dark:border-[#001929]"
      : "border-l border-[#003352] dark:border-[#001929]",
    !isResizing && "transition-all duration-300 ease-in-out",
    "md:sticky md:top-0 md:z-30 md:translate-x-0",
    collapsed
      ? "md:w-[80px]"
      : resizable
        ? ""
        : "md:w-[270px]",
    "fixed top-0 z-50 w-72 md:w-auto max-w-[85vw]",
    side === "left" ? "left-0" : "right-0",
    isMobileOpen
      ? "translate-x-0 shadow-2xl"
      : side === "left"
        ? "-translate-x-full md:translate-x-0"
        : "translate-x-full md:translate-x-0",
  );

// Backdrop for mobile
export const backdropStyles =
  "fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300 animate-in fade-in cursor-pointer";

// Header Styles
export const headerStyles = {
  container: (collapsed: boolean) =>
    cn(
      "h-[64px] flex items-center relative bg-[#003352] dark:bg-[#001f33] text-white shrink-0 transition-all duration-200 border-b border-[#00263e]",
      collapsed ? "px-3 justify-center" : "px-4 justify-between",
    ),
  content: (collapsed: boolean, side: "left" | "right" = "left") =>
    cn(
      "flex items-center w-full",
      collapsed ? "justify-center" : "justify-between",
      !collapsed && side === "right" && "flex-row-reverse",
    ),
  logoArea: (collapsed: boolean, isHeaderHovered: boolean) =>
    cn(
      "flex items-center gap-3 transition-all duration-200 min-w-0",
      collapsed
        ? isHeaderHovered
          ? "opacity-0 invisible w-0"
          : "opacity-100 visible justify-center"
        : "flex-1 opacity-100 visible",
    ),
  logo: "h-9 w-9 bg-gradient-to-br from-[#0077be] via-[#005c94] to-[#004066] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0077be]/30 text-white font-bold text-base cursor-pointer overflow-hidden img-clear",
  companyName: (collapsed: boolean) =>
    cn(
      "font-bold text-[13.5px] text-white tracking-tight leading-tight transition-all duration-200 whitespace-pre-line break-words min-w-0",
      collapsed ? "w-0 opacity-0 invisible hidden" : "opacity-100 visible block",
    ),
  toggleButtonArea: (
    collapsed: boolean,
    isHeaderHovered: boolean,
    side: "left" | "right" = "left",
  ) =>
    cn(
      "transition-all duration-200 shrink-0",
      collapsed
        ? isHeaderHovered
          ? "opacity-100 visible absolute inset-0 flex items-center justify-center scale-100 bg-[#004066] rounded-xl"
          : "opacity-0 invisible absolute inset-0 flex items-center justify-center scale-75 pointer-events-none"
        : cn(
          "opacity-100 visible static scale-100",
          side === "left" ? "ml-1" : "mr-1",
        ),
    ),
  toggleButton:
    "p-2 rounded-xl text-[#ebf7ff]/70 hover:text-white hover:bg-[#004066] transition-all duration-150 cursor-pointer",
  mobileCloseButton:
    "md:hidden p-2 rounded-xl text-[#ebf7ff]/70 hover:text-red-400 hover:bg-red-950/40 transition-all duration-150 cursor-pointer",
};

// Navigation Styles
export const navStyles = {
  container: (collapsed: boolean) =>
    cn(
      "flex-grow overflow-y-auto scrollbar-thin focus:outline-none transition-all duration-200 overscroll-contain",
      collapsed ? "px-2 py-3 space-y-1" : "px-3 py-3 space-y-0.5",
    ),
};

// Section Styles
export const sectionStyles = {
  container: (collapsed: boolean) =>
    cn(
      "transition-all duration-200",
      collapsed ? "mb-3" : "mb-4",
    ),
  label:
    "px-2.5 mb-1.5 text-[10.5px] font-semibold text-[#ebf7ff]/60 tracking-[0.08em] uppercase select-none letter-spacing",
  items: "space-y-0.5",
  divider: (collapsed: boolean) =>
    cn(
      "mx-auto h-px bg-[#005280]/50 transition-all duration-200",
      collapsed ? "my-2 w-7" : "mt-3 mb-2 w-full",
    ),
};

// Item Styles - Polished, Spacious & Modern
export const itemStyles = {
  wrapper: "w-full outline-none",
  collapsedItem: (isActive: boolean) =>
    cn(
      "flex items-center justify-center h-11 w-11 rounded-xl transition-all duration-150 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-[#0077be] focus-visible:outline-none mx-auto cursor-pointer",
      isActive
        ? "bg-[#0077be] text-white shadow-md shadow-[#0077be]/25 font-semibold"
        : "text-[#ebf7ff]/80 hover:bg-[#003352] hover:text-white",
    ),
  item: (isActive: boolean, hasChildren: boolean, depth: number) => {
    const getPaddingClass = (d: number) => {
      switch (d) {
        case 0:
          return "px-3";
        case 1:
          return "pl-10 pr-3";
        case 2:
          return "pl-14 pr-3";
        default:
          return "pl-16 pr-3";
      }
    };
    return cn(
      "flex items-center gap-2.5 py-2.5 rounded-xl transition-all duration-150 group cursor-pointer relative focus-visible:ring-2 focus-visible:ring-[#0077be] focus-visible:outline-none select-none text-sm overflow-hidden border-none shadow-none w-full",
      isActive
        ? "bg-[#0077be] text-white font-semibold shadow-md shadow-[#0077be]/25"
        : "text-[#ebf7ff]/80 hover:bg-[#003352] hover:text-white font-medium",
      getPaddingClass(depth),
    );
  },
  icon: (isActive: boolean) =>
    cn(
      "flex-shrink-0 transition-colors duration-150",
      isActive
        ? "text-white"
        : "text-[#ebf7ff]/70 group-hover:text-[#0077be]",
    ),
  dot: (isActive: boolean) =>
    cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-200 flex-shrink-0",
      isActive
        ? "bg-white scale-110"
        : "bg-[#005280] group-hover:bg-[#0077be]",
    ),
  label: (depth: number) =>
    cn(
      "flex-grow whitespace-nowrap overflow-hidden text-ellipsis transition-all leading-none",
      depth === 0 ? "text-[13.5px]" : "text-[12.5px]",
    ),
  chevron: (isOpen: boolean) =>
    cn(
      "transition-transform duration-200 text-[#ebf7ff]/60 shrink-0",
      isOpen && "rotate-180 text-white",
    ),
  submenu: "flex flex-col relative transition-all duration-200 ease-in-out mt-0.5 mb-0.5 space-y-0.5",
  submenuLine: (depth: number, side: "left" | "right" = "left") =>
    cn(
      "absolute top-0 bottom-1 w-px bg-[#005280]/60",
      side === "left"
        ? depth === 0
          ? "left-[22px]"
          : depth === 1
            ? "left-[36px]"
            : "left-[48px]"
        : depth === 0
          ? "right-[22px]"
          : depth === 1
            ? "right-[36px]"
            : "right-[48px]",
    ),
};

// Footer Styles
export const footerStyles = {
  container: (collapsed: boolean) =>
    cn(
      "border-t border-[#00263e] bg-[#003352] text-white transition-all duration-200 shrink-0",
      collapsed ? "p-2.5 space-y-2" : "px-3 py-3 space-y-1.5",
    ),
  userArea: (collapsed: boolean, side: "left" | "right" = "left") =>
    cn(
      "flex items-center gap-3 rounded-xl transition-all duration-150 cursor-pointer hover:bg-[#004066] border-none shadow-none group",
      collapsed
        ? "justify-center p-1.5"
        : side === "right"
          ? "p-2.5 flex-row-reverse"
          : "p-2.5",
    ),
  avatar:
    "h-8 w-8 rounded-full bg-gradient-to-br from-[#0077be] to-[#004066] text-white flex items-center justify-center flex-shrink-0 overflow-hidden font-semibold text-xs shrink-0 img-clear shadow-sm shadow-[#0077be]/30",
  userInfo: "flex-grow min-w-0",
  userName:
    "text-[13px] font-semibold text-white truncate leading-snug",
  userEmail:
    "text-[11px] text-[#ebf7ff]/70 truncate leading-none mt-0.5",
  userOrg:
    "text-[10.5px] text-[#ebf7ff]/90 font-medium truncate mt-0.5",
  logoutButton: (collapsed: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-xl text-[#ebf7ff]/70 hover:bg-red-950/40 hover:text-red-400 transition-all duration-150 cursor-pointer border-none shadow-none",
      collapsed ? "justify-center h-9 w-9 p-0 mx-auto" : "w-full py-2.5 px-3",
    ),
  logoutIcon: (collapsed: boolean) => cn(collapsed ? "mx-auto" : "ml-0.5"),
};

// Resize Handle Styles
export const resizeStyles = {
  handle: (isResizing: boolean, side: "left" | "right" = "left") =>
    cn(
      "absolute top-0 bottom-0 w-1 cursor-col-resize z-40 group hidden md:flex items-center justify-center select-none touch-none focus:outline-none transition-colors duration-150",
      side === "left" ? "-right-0.5" : "-left-0.5",
      isResizing
        ? "bg-[#0077be]/50"
        : "bg-transparent hover:bg-[#0077be]/30",
    ),
  indicator: (isResizing: boolean, side: "left" | "right" = "left") =>
    cn(
      "w-[2px] rounded-full transition-all duration-200 pointer-events-none",
      isResizing
        ? "h-full bg-[#0077be] opacity-100"
        : "h-8 bg-[#0077be] opacity-0 group-hover:opacity-100 group-hover:h-14",
    ),
};

export const sidebarStyles = {
  aside: asideStyles,
  backdrop: backdropStyles,
  header: headerStyles.container,
  headerContent: headerStyles.content,
  logoArea: headerStyles.logoArea,
  logo: headerStyles.logo,
  companyName: headerStyles.companyName,
  toggleButtonArea: headerStyles.toggleButtonArea,
  toggleButton: headerStyles.toggleButton,
  nav: navStyles.container,
  section: sectionStyles.container,
  sectionLabel: sectionStyles.label,
  sectionItems: sectionStyles.items,
  sectionDivider: sectionStyles.divider,
  itemWrapper: itemStyles.wrapper,
  collapsedItem: itemStyles.collapsedItem,
  item: itemStyles.item,
  itemIcon: itemStyles.icon,
  itemDot: itemStyles.dot,
  itemLabel: itemStyles.label,
  itemChevron: itemStyles.chevron,
  submenu: itemStyles.submenu,
  submenuLine: itemStyles.submenuLine,
  footer: footerStyles.container,
  userArea: footerStyles.userArea,
  avatar: footerStyles.avatar,
  userInfo: footerStyles.userInfo,
  userName: footerStyles.userName,
  userEmail: footerStyles.userEmail,
  userOrg: footerStyles.userOrg,
  logoutButton: footerStyles.logoutButton,
  logoutIcon: footerStyles.logoutIcon,
  resizeHandle: resizeStyles.handle,
  resizeIndicator: resizeStyles.indicator,
};
