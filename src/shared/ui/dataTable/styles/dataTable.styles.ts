export const dataTableStyles = {
  // 🔹 Container
  container:
    "w-full flex flex-col overflow-hidden relative rounded-xl border border-[#004066]/20 dark:border-[#003352] bg-[#ebf7ff] dark:bg-[#001929] shadow-xs isolate",

  // 🔹 Table
  table: "w-max min-w-full border-separate border-spacing-0 table",

  // 🔹 Header
  head: "sticky top-0 z-[100] bg-[#004066] text-white border-b border-[#003352]",

  headerRow: "flex",

  headerCell: (
    isPinned: boolean,
    isMenuOpen: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isMainCol?: boolean,
  ) => {
    return [
      "flex items-center px-4 h-[44px] bg-[#004066] text-white box-border border-b border-[#003352]",
      align === "center"
        ? "justify-center text-center"
        : align === "right"
          ? "justify-end text-right"
          : "justify-between text-left",
      "text-[11px] font-bold uppercase tracking-wider text-[#ebf7ff]/90 select-none",
      isPinned ? "sticky" : "relative",
      isMainCol
        ? "flex-1 border-r border-[#003352]"
        : isLast
          ? "border-r-0"
          : "border-r border-[#003352]",
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
    "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10 transition-colors duration-200 hover:bg-[#0077be]",

  // 🔹 Body
  body: "block",

  row: (isSelected: boolean) => {
    return [
      "flex border-b border-[#004066]/10 dark:border-[#003352]/60 transition-colors duration-150 cursor-pointer dt-row",
      isSelected
        ? "bg-[#0077be]/20 hover:bg-[#0077be]/30"
        : "bg-white dark:bg-[#00263e] hover:bg-[#ebf7ff]/70 dark:hover:bg-[#003352]/60",
    ].join(" ");
  },

  cell: (
    isPinned: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isMainCol?: boolean,
    isSelected?: boolean,
  ) => {
    return [
      "flex items-center px-4 min-h-[52px] box-border text-[13px] text-[#004066] dark:text-[#ebf7ff] font-medium",
      isPinned ? "sticky z-[1]" : "relative z-0",
      isSelected
        ? "bg-[#0077be]/20"
        : isPinned
          ? "bg-white dark:bg-[#00263e]"
          : "bg-transparent",
      "dt-cell",
      isMainCol
        ? "flex-1 border-r-transparent"
        : isLast
          ? "border-r-0"
          : isPinned
            ? "border-r border-[#004066]/20 dark:border-[#003352]"
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
    "sticky bottom-0 z-[100] bg-[#004066] text-white border-t border-[#003352]",

  footerRow: "flex",

  footerCell: (
    isPinned: boolean,
    isLast: boolean,
    align?: "left" | "center" | "right",
    isMainCol?: boolean,
  ) => {
    return [
      "flex items-center px-4 h-[40px] bg-[#004066] text-white box-border text-[12px] font-semibold",
      isPinned ? "sticky z-[2] bg-[#004066]" : "relative z-[1]",
      isMainCol
        ? "flex-1 border-r-transparent"
        : isLast
          ? "border-r-0"
          : isPinned
            ? "border-r border-[#003352]"
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
        ? "bg-[#0077be] text-white font-semibold"
        : "text-[#004066] dark:text-[#ebf7ff] hover:bg-[#ebf7ff] dark:hover:bg-[#003352]",
    ].join(" ");
  },

  // 🔹 Toolbar
  toolbar:
    "flex items-center justify-between px-4 py-3 bg-white dark:bg-[#00263e] border-b border-[#004066]/20 dark:border-[#003352] gap-4 flex-wrap text-[#004066] dark:text-[#ebf7ff]",

  toolbarActionContainer:
    "flex items-center bg-[#ebf7ff] dark:bg-[#001929] p-1 rounded-xl border border-[#004066]/20 dark:border-[#003352]",

  toolbarActionBtn: (isActive: boolean) => {
    return [
      "flex items-center justify-center w-[34px] h-[32px] rounded-lg transition-all duration-200 border-none cursor-pointer text-xs font-semibold",
      isActive
        ? "bg-[#0077be] text-white shadow-xs"
        : "bg-transparent text-[#004066]/70 dark:text-[#ebf7ff]/70 hover:text-[#0077be]",
    ].join(" ");
  },

  toolbarResetBtn:
    "flex items-center justify-center h-[38px] rounded-xl border border-[#004066]/30 bg-white dark:bg-[#00263e] cursor-pointer transition-all duration-200 text-[#004066] dark:text-[#ebf7ff] gap-2 text-[13px] font-semibold px-3.5 hover:border-[#0077be] hover:text-[#0077be] shadow-2xs",

  // 🔹 Pagination
  pagination:
    "flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white dark:bg-[#00263e] border-t border-[#004066]/20 dark:border-[#003352] text-[12px] text-[#004066]/80 dark:text-[#ebf7ff]/80 font-medium gap-3",

  paginationGroup: "flex items-center gap-5 flex-wrap",

  paginationSelect:
    "px-2.5 py-1 rounded-lg border border-[#004066]/30 outline-none cursor-pointer bg-white dark:bg-[#001929] text-[#004066] dark:text-[#ebf7ff] text-[12px] hover:border-[#0077be] focus:border-[#0077be] focus:ring-2 focus:ring-[#0077be]/20 transition-all font-medium shadow-2xs",

  paginationText: "text-[#004066] dark:text-white font-bold",

  paginationInputContainer: "relative flex items-center",

  paginationInput:
    "w-14 pl-2.5 pr-6 py-1 rounded-lg border border-[#004066]/30 outline-none bg-white dark:bg-[#001929] text-[#004066] dark:text-[#ebf7ff] text-[12px] hover:border-[#0077be] focus:border-[#0077be] focus:ring-2 focus:ring-[#0077be]/20 transition-all font-medium text-center shadow-2xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",

  paginationInputClear:
    "absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-[#ebf7ff] dark:hover:bg-[#003352] transition-colors text-[#004066]/60 hover:text-[#0077be] cursor-pointer",

  paginationActions: "flex items-center gap-1.5",

  paginationButton: (disabled: boolean) => {
    return [
      "flex items-center justify-center w-7 h-7 rounded-lg border border-[#004066]/30 transition-all duration-150 text-[12px]",
      disabled
        ? "bg-[#ebf7ff]/50 dark:bg-[#001929]/50 text-[#004066]/30 dark:text-[#ebf7ff]/30 cursor-not-allowed border-[#004066]/10"
        : "bg-white dark:bg-[#00263e] text-[#004066] dark:text-[#ebf7ff] cursor-pointer hover:bg-[#0077be] hover:text-white hover:border-[#0077be] shadow-2xs font-semibold",
    ].join(" ");
  },

  // 🔹 States
  loadingRow:
    "flex border-b border-[#004066]/10 dark:border-[#003352] h-[64px] items-center px-4",

  emptyRow: "flex h-[200px] items-center justify-center",

  emptyContent: "text-[#004066]/70 dark:text-[#ebf7ff]/70 text-center",

  // 🔹 MENU
  menu: `
    bg-white dark:bg-[#00263e]
    rounded-2xl
    border border-[#004066]/30 dark:border-[#003352]
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
      "p-6 bg-[#ebf7ff] dark:bg-[#001929] gap-4",
      orientation === "horizontal"
        ? "flex flex-col w-full"
        : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
    ].join(" "),

  card: (isSelected: boolean, orientation: "vertical" | "horizontal") =>
    [
      "bg-white dark:bg-[#00263e] rounded-2xl border border-[#004066]/20 dark:border-[#003352] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex",
      orientation === "horizontal" ? "w-full flex-row" : "flex-col",
      isSelected
        ? "ring-2 ring-[#0077be] border-transparent shadow-[#0077be]/20"
        : "hover:border-[#0077be]",
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
    "text-[10px] font-bold text-[#004066]/60 dark:text-[#ebf7ff]/60 uppercase tracking-wider",
  cardValue: "text-[14px] text-[#004066] dark:text-white font-medium",
};
