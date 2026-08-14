export const dataTableStyles = {
  // 🔹 Container
  container:
    "w-full flex flex-col overflow-hidden relative rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs isolate",

  // 🔹 Table
  table: "w-max min-w-full border-separate border-spacing-0 table",

  // 🔹 Header
  head: "sticky top-0 z-[100] bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800",

  headerRow: "flex",

  headerCell: (
    isPinned: boolean,
    isMenuOpen: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isSecondToLast?: boolean,
  ) => {
    return [
      "flex items-center px-4 h-[44px] bg-slate-50/90 dark:bg-slate-900/90 box-border border-b border-slate-200/80 dark:border-slate-800",
      align === "center"
        ? "justify-center text-center"
        : align === "right"
          ? "justify-end text-right"
          : "justify-between text-left",
      "text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none",
      isPinned ? "sticky" : "relative",
      isSecondToLast
        ? "flex-1 border-r border-slate-200/80 dark:border-slate-800"
        : isLast
          ? "border-r-0"
          : "border-r border-slate-200/80 dark:border-slate-800",
      isMenuOpen ? "z-[110]" : isPinned ? "z-[2]" : "z-[1]",
    ].join(" ");
  },

  headerLabelContainer: (align?: "left" | "center" | "right") => {
    return [
      "flex items-center gap-2 flex-1 overflow-hidden",
      align === "center"
        ? "justify-center"
        : align === "right"
          ? "justify-end"
          : "justify-start",
    ].join(" ");
  },

  headerLabel: "truncate whitespace-nowrap",

  // 🔹 Resizer
  resizer:
    "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10 transition-colors duration-200 hover:bg-blue-500",

  // 🔹 Body
  body: "block",

  row: (isSelected: boolean) => {
    return [
      "flex border-b border-slate-100 dark:border-slate-800/60 transition-colors duration-150 cursor-pointer dt-row",
      isSelected
        ? "bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50/60 dark:hover:bg-blue-950/50"
        : "bg-white dark:bg-slate-900 hover:bg-slate-50/60 dark:hover:bg-slate-800/40",
    ].join(" ");
  },

  cell: (
    isPinned: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isSecondToLast?: boolean,
    isSelected?: boolean,
  ) => {
    return [
      "flex items-center px-4 min-h-[52px] box-border text-[13px] text-slate-700 dark:text-slate-300 font-medium",
      isPinned ? "sticky z-[1]" : "relative z-0",
      isSelected
        ? "bg-blue-50/40 dark:bg-blue-950/30"
        : isPinned
          ? "bg-white dark:bg-slate-900"
          : "bg-transparent",
      "dt-cell",
      isSecondToLast
        ? "flex-1 border-r-transparent"
        : isLast
          ? "border-r-0"
          : isPinned
            ? "border-r border-slate-200/80 dark:border-slate-800"
            : "border-r-transparent",
      align === "center"
        ? "justify-center"
        : align === "right"
          ? "justify-end"
          : "justify-start",
    ].join(" ");
  },

  cellContent: (align?: "left" | "center" | "right") => {
    return [
      "w-auto max-w-full py-2 whitespace-normal break-words",
      align === "center"
        ? "text-center"
        : align === "right"
          ? "text-right"
          : "text-left",
    ].join(" ");
  },

  // 🔹 Footer
  footer:
    "sticky bottom-0 z-[100] bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800",

  footerRow: "flex",

  footerCell: (
    isPinned: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isSecondToLast?: boolean,
  ) => {
    return [
      "flex items-center px-4 h-[40px] bg-slate-50/80 dark:bg-slate-900/80 box-border text-[12px] font-semibold text-slate-700 dark:text-slate-300",
      isPinned ? "sticky z-[2] bg-slate-50/80 dark:bg-slate-900/80" : "relative z-[1]",
      isSecondToLast
        ? "flex-1 border-r-transparent"
        : isLast
          ? "border-r-0"
          : isPinned
            ? "border-r border-slate-200/80 dark:border-slate-800"
            : "border-r-transparent",
      align === "center"
        ? "justify-center"
        : align === "right"
          ? "justify-end"
          : "justify-start",
    ].join(" ");
  },

  // 🔹 Menu Item
  menuItem: (active?: boolean) => {
    return [
      "flex items-center gap-3 px-3 py-2 cursor-pointer text-[13px] transition-colors duration-150 rounded-lg",
      active
        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    ].join(" ");
  },

  // 🔹 Toolbar
  toolbar:
    "flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 gap-4 flex-wrap text-slate-700 dark:text-slate-300",

  toolbarActionContainer:
    "flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700",

  toolbarActionBtn: (isActive: boolean) => {
    return [
      "flex items-center justify-center w-[34px] h-[32px] rounded-lg transition-all duration-200 border-none cursor-pointer text-xs font-semibold",
      isActive
        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
        : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200",
    ].join(" ");
  },

  toolbarResetBtn:
    "flex items-center justify-center h-[38px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer transition-all duration-200 text-slate-600 dark:text-slate-400 gap-2 text-[13px] font-semibold px-3.5 hover:border-blue-500 hover:text-blue-600 shadow-2xs",

  // 🔹 Pagination
  pagination:
    "flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-[12px] text-slate-500 dark:text-slate-400 font-medium gap-3",

  paginationGroup: "flex items-center gap-5 flex-wrap",

  paginationSelect:
    "px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 outline-none cursor-pointer bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium shadow-2xs",

  paginationText: "text-slate-800 dark:text-slate-200 font-bold",

  paginationInputContainer: "relative flex items-center",

  paginationInput:
    "w-14 pl-2.5 pr-6 py-1 rounded-lg border border-slate-200 dark:border-slate-800 outline-none bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[12px] hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-center shadow-2xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",

  paginationInputClear:
    "absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer",

  paginationActions: "flex items-center gap-1.5",

  paginationButton: (disabled: boolean) => {
    return [
      "flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 transition-all duration-150 text-[12px]",
      disabled
        ? "bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-700 cursor-not-allowed border-slate-100 dark:border-slate-800/50"
        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs",
    ].join(" ");
  },

  // 🔹 States
  loadingRow:
    "flex border-b border-slate-100 dark:border-slate-800 h-[64px] items-center px-4",

  emptyRow: "flex h-[200px] items-center justify-center",

  emptyContent: "text-slate-500 dark:text-slate-400 text-center",

  // 🔹 MENU
  menu: `
    bg-white dark:bg-slate-900
    rounded-2xl
    border border-slate-200 dark:border-slate-800
    ring-1 ring-black/5
    w-[280px]
    shadow-xl
    z-[999]
    will-change-transform
    p-1.5
  `,

  // 🔹 Card View
  cardGrid: (orientation: "vertical" | "horizontal") =>
    [
      "p-6 bg-slate-50/50 dark:bg-slate-950 gap-4",
      orientation === "horizontal"
        ? "flex flex-col w-full"
        : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
    ].join(" "),

  card: (isSelected: boolean, orientation: "vertical" | "horizontal") =>
    [
      "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex",
      orientation === "horizontal" ? "w-full flex-row" : "flex-col",
      isSelected
        ? "ring-2 ring-blue-500 border-transparent shadow-blue-500/10"
        : "hover:border-slate-300 dark:hover:border-slate-700",
    ].join(" "),

  cardContent: (orientation: "vertical" | "horizontal") =>
    [
      "p-5 space-y-4 flex-1",
      orientation === "horizontal"
        ? "flex flex-row items-center gap-6 space-y-0 flex-wrap"
        : "",
    ].join(" "),

  cardItem: (orientation: "vertical" | "horizontal") =>
    [
      "flex flex-col gap-1.5",
      orientation === "horizontal" ? "min-w-[120px] flex-1" : "",
    ].join(" "),

  cardLabel:
    "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider",
  cardValue: "text-[14px] text-slate-800 dark:text-slate-200 font-medium",
};
