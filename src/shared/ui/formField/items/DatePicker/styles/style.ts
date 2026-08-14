/* ============================================================
 *  FormField — Reusable Style Sheet
 *  All class strings live here so FormField.tsx stays logic-only.
 * ============================================================ */

export const datePickerStyles = {
  /** Input wrapper (simulated input) */
  inputWrapper:
    "flex w-full items-center min-h-[42px] justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-sm font-normal text-slate-900 dark:text-slate-100 transition-all duration-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:outline-none shadow-2xs",
  inputDisabled:
    "cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-75 border-slate-200 dark:border-slate-800 pr-10",
  inputError:
    "!border-rose-500 focus-within:!border-rose-500 focus-within:!ring-rose-500/10 bg-white dark:bg-slate-900/60",

  /** Popover container */
  popover:
    "z-[9999] w-[288px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xl shadow-slate-900/10 focus:outline-none overflow-hidden backdrop-blur-md",

  /** Grid containers */
  dayGrid: "grid grid-cols-7 gap-y-0.5",
  monthYearGrid: "grid grid-cols-3 gap-1.5",
  dayNamesGrid: "grid grid-cols-7 mb-1",
  dayName:
    "flex h-8 items-center justify-center text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none",

  /** Header styles */
  header:
    "flex items-center justify-between px-3 py-2 border-b border-border",
  headerBtn:
    "p-1.5 rounded-lg hover:bg-neutral-surface text-text-muted transition-colors",
  headerLabelBtn:
    "px-1 py-0.5 rounded hover:bg-neutral-surface transition-colors font-semibold text-text",

  /** Cell/Item base */
  cellBase:
    "flex cursor-pointer select-none items-center justify-center transition-all duration-150 focus:outline-none",
  dayCell: "h-8 w-8 rounded-full text-sm font-medium",
  monthYearCell: "h-10 rounded-md text-sm font-medium",

  /** State modifiers */
  selected:
    "bg-[var(--ff-activeBorder,var(--primary))] text-white shadow-sm hover:opacity-90 ring-2 ring-[color:var(--ff-activeBorder,var(--primary))]/30",
  today:
    "border border-[color:var(--ff-activeBorder,var(--primary))] text-[var(--ff-activeBorder,var(--primary))] hover:bg-[var(--ff-activeBorder,var(--primary))]/10",
  focused: "bg-neutral-surface text-text",
  disabled: "cursor-not-allowed text-text-muted/50",

  /** Footer styles */
  footer:
    "flex flex-col border-t border-border px-3 py-2 gap-2",
  shortcutBtn:
    "text-xs font-semibold text-[color:var(--ff-activeBorder,var(--primary))] hover:opacity-80 transition-colors",
  applyBtn:
    "inline-flex items-center justify-center rounded-lg bg-[var(--ff-activeBorder,var(--primary))] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--ff-activeBorder,var(--primary))]/50 focus:ring-offset-2 transition-all active:scale-95",
  clearBtn:
    "text-xs font-semibold text-text-muted hover:text-error transition-colors",

  /** TimePicker specific */
  timeContainer:
    "relative flex h-32 w-full items-center justify-center overflow-hidden border-b border-border -mt-2 mb-2 bg-neutral-surface/30",
  timeHighlight:
    "absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 border-y border-[color:var(--ff-activeBorder,var(--primary))]/20 bg-[var(--ff-activeBorder,var(--primary))]/5 pointer-events-none",
  timeColumn: "w-16 overflow-y-auto scrollbar-hide py-12 snap-y snap-mandatory",
  timeBtn: "text-[13px] text-text-muted transition-all duration-200 outline-none hover:text-text",
  timeBtnSelected: "text-[color:var(--ff-activeBorder,var(--primary))] font-bold scale-125",
  timeDivider: "flex items-center text-[color:var(--ff-activeBorder,var(--primary))]/40 font-bold mx-2 pb-1",
} as const;
