/* ============================================================
 *  CustomSelect — Reusable Style Sheet
 *  All class strings live here for better maintainability.
 * ============================================================ */

export const selectStyles = {
  /** Main control container */
  control:
    "flex w-full items-center min-h-[42px] justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-sm font-normal text-slate-900 dark:text-slate-100 transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:outline-none shadow-2xs",

  /** Disabled state for control */
  disabled:
    "cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-75 border-slate-200 dark:border-slate-800 pr-10",

  /** Error state for control */
  error:
    "!border-rose-500 focus-within:!border-rose-500 focus-within:!ring-rose-500/10 bg-white dark:bg-slate-900/60",

  /** Inner content area */
  contentArea:
    "flex flex-wrap items-center gap-1.5 flex-1 min-w-0 py-0.5 relative",

  /** Multi-select badge */
  badge:
    "flex items-center gap-1 rounded-lg tracking-wide bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 shrink-0",
  badgeIcon: "h-3 w-3 cursor-pointer hover:opacity-70 text-blue-600 dark:text-blue-400",

  /** Selected label (single select) */
  selectedLabel:
    "flex-1 truncate text-sm font-normal text-slate-900 dark:text-slate-100 leading-5 pointer-events-none",

  /** Placeholder */
  placeholder:
    "absolute inset-y-0 left-0 flex items-center text-sm font-normal text-slate-400 dark:text-slate-500 leading-5 pointer-events-none truncate max-w-full",

  /** Search input */
  input:
    "bg-transparent outline-none p-0 text-slate-900 dark:text-slate-100 text-sm leading-5 min-w-0 placeholder:text-slate-400",

  /** Right indicators container */
  indicators: "flex items-center gap-1.5 ml-2 text-slate-400 dark:text-slate-500 shrink-0",

  /** Dropdown menu */
  menu: "absolute z-[9999] left-0 mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl shadow-slate-900/10 focus:outline-none backdrop-blur-md",

  /** Individual option */
  option:
    "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
  optionSelected: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold",
  optionHighlighted:
    "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
  optionDefault: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",

  /** Messages (loading/no options) */
  message: "px-3 py-2 text-sm text-slate-400 dark:text-slate-500",
} as const;
