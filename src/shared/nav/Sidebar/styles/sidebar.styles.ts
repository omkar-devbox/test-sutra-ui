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
    "h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col shrink-0 overflow-visible isolate select-none touch-pan-y relative transition-colors duration-200 transform-gpu",
    side === "left"
      ? "border-r border-slate-200/80 dark:border-slate-800/80"
      : "border-l border-slate-200/80 dark:border-slate-800/80",
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
      "h-[64px] flex items-center relative bg-white dark:bg-slate-900 shrink-0 transition-all duration-200 border-b border-slate-100 dark:border-slate-800/80",
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
  logo: "h-9 w-9 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/25 text-white font-bold text-base cursor-pointer overflow-hidden img-clear",
  companyName: (collapsed: boolean) =>
    cn(
      "font-bold text-[13.5px] text-slate-900 dark:text-white tracking-tight leading-tight transition-all duration-200 whitespace-pre-line break-words min-w-0",
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
          ? "opacity-100 visible absolute inset-0 flex items-center justify-center scale-100 bg-slate-50 dark:bg-slate-800/60 rounded-xl"
          : "opacity-0 invisible absolute inset-0 flex items-center justify-center scale-75 pointer-events-none"
        : cn(
          "opacity-100 visible static scale-100",
          side === "left" ? "ml-1" : "mr-1",
        ),
    ),
  toggleButton:
    "p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer",
  mobileCloseButton:
    "md:hidden p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150 cursor-pointer",
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
    "px-2.5 mb-1.5 text-[10.5px] font-semibold text-slate-400 dark:text-slate-500/80 tracking-[0.08em] uppercase select-none letter-spacing",
  items: "space-y-0.5",
  divider: (collapsed: boolean) =>
    cn(
      "mx-auto h-px bg-slate-200/70 dark:bg-slate-800/60 transition-all duration-200",
      collapsed ? "my-2 w-7" : "mt-3 mb-2 w-full",
    ),
};

// Item Styles - Polished, Spacious & Modern
export const itemStyles = {
  wrapper: "w-full outline-none",
  collapsedItem: (isActive: boolean) =>
    cn(
      "flex items-center justify-center h-11 w-11 rounded-xl transition-all duration-150 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none mx-auto cursor-pointer",
      isActive
        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-500/10"
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-800 dark:hover:text-slate-100",
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
      "flex items-center gap-2.5 py-2.5 rounded-xl transition-all duration-150 group cursor-pointer relative focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none select-none text-sm overflow-hidden border-none shadow-none w-full",
      isActive
        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm shadow-indigo-500/10"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 font-medium",
      getPaddingClass(depth),
    );
  },
  icon: (isActive: boolean) =>
    cn(
      "flex-shrink-0 transition-colors duration-150",
      isActive
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-slate-300",
    ),
  dot: (isActive: boolean) =>
    cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-200 flex-shrink-0",
      isActive
        ? "bg-indigo-500 dark:bg-indigo-400 scale-110"
        : "bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400",
    ),
  label: (depth: number) =>
    cn(
      "flex-grow whitespace-nowrap overflow-hidden text-ellipsis transition-all leading-none",
      depth === 0 ? "text-[13.5px]" : "text-[12.5px]",
    ),
  chevron: (isOpen: boolean) =>
    cn(
      "transition-transform duration-200 text-slate-400 dark:text-slate-600 shrink-0",
      isOpen && "rotate-180 text-indigo-500 dark:text-indigo-400",
    ),
  submenu: "flex flex-col relative transition-all duration-200 ease-in-out mt-0.5 mb-0.5 space-y-0.5",
  submenuLine: (depth: number, side: "left" | "right" = "left") =>
    cn(
      "absolute top-0 bottom-1 w-px bg-slate-200/80 dark:bg-slate-700/60",
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
      "border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-200 shrink-0",
      collapsed ? "p-2.5 space-y-2" : "px-3 py-3 space-y-1.5",
    ),
  userArea: (collapsed: boolean, side: "left" | "right" = "left") =>
    cn(
      "flex items-center gap-3 rounded-xl transition-all duration-150 cursor-pointer hover:bg-white dark:hover:bg-slate-800/70 border-none shadow-none group",
      collapsed
        ? "justify-center p-1.5"
        : side === "right"
          ? "p-2.5 flex-row-reverse"
          : "p-2.5",
    ),
  avatar:
    "h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 overflow-hidden font-semibold text-xs shrink-0 img-clear shadow-sm shadow-indigo-500/20",
  userInfo: "flex-grow min-w-0",
  userName:
    "text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate leading-snug",
  userEmail:
    "text-[11px] text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5",
  userOrg:
    "text-[10.5px] text-indigo-600 dark:text-indigo-400 font-medium truncate mt-0.5",
  logoutButton: (collapsed: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all duration-150 cursor-pointer border-none shadow-none",
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
        ? "bg-indigo-500/30"
        : "bg-transparent hover:bg-indigo-200/50 dark:hover:bg-indigo-900/40",
    ),
  indicator: (isResizing: boolean, side: "left" | "right" = "left") =>
    cn(
      "w-[2px] rounded-full transition-all duration-200 pointer-events-none",
      isResizing
        ? "h-full bg-indigo-500 dark:bg-indigo-400 opacity-100"
        : "h-8 bg-indigo-400 opacity-0 group-hover:opacity-100 group-hover:h-14",
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
