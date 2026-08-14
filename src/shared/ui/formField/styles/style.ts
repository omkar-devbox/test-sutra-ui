/* ============================================================
 *  FormField — Reusable Style Sheet
 *  All class strings live here so FormField.tsx stays logic-only.
 * ============================================================ */

/* ── Shared base classes ───────────────────────────────────── */

export const formFieldBaseStyles = {
  /** Outer wrapper */
  wrapper: "flex flex-col gap-1.5 group",
  wrapperFull: "w-full",
  wrapperAuto: "w-auto",

  /** Top label (non-checkbox) */
  label:
    "text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200 transition-colors duration-200 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400",
  labelDisabled: "opacity-60 cursor-not-allowed",

  /** Inline label (checkbox / radio) */
  inlineLabel:
    "text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer transition-colors duration-200 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400",
  inlineLabelDisabled: "cursor-not-allowed opacity-60",

  /** Required asterisk */
  requiredMark: "ml-1 text-rose-500 font-semibold",
  hint: "cursor-help text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors",

  /** Helper / error text */
  helperText: "text-xs font-medium mt-1 text-slate-500 dark:text-slate-400",
  errorText: "text-xs font-medium mt-1 text-rose-500 dark:text-rose-400 flex items-center gap-1",

  /** Shared text / textarea / input styles */
  input:
    "block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-sm font-normal text-slate-900 dark:text-slate-100 transition-all duration-200 min-h-[42px] placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-2xs",
  inputDisabled: "cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-75 border-slate-200 dark:border-slate-800 pr-10",
  inputError: "!border-rose-500 focus:!border-rose-500 focus:!ring-rose-500/10 bg-white dark:bg-slate-900/60",
  inputPII: "pr-10",

  /** Checkbox / radio input */
  checkboxInput:
    "h-4.5 w-4.5 rounded-md border-slate-300 dark:border-slate-700 text-blue-600 transition-all focus:ring-4 focus:ring-blue-500/10 bg-white dark:bg-slate-900 cursor-pointer",
  checkboxInputError: "!border-rose-500 text-rose-500 focus:ring-rose-500/10",

  radioInput:
    "h-4.5 w-4.5 border-slate-300 dark:border-slate-700 text-blue-600 transition-all focus:ring-4 focus:ring-blue-500/10 cursor-pointer bg-white dark:bg-slate-900",
  radioInputError: "!border-rose-500 focus:ring-rose-500/10",

  /** Checkbox / radio row */
  toggleRow: "flex items-center gap-3 group",
  radioGroup: "flex flex-col gap-2",

  /** PII wrapper */
  piiWrapper: "relative w-full group",
  piiToggleButton:
    "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all",
  piiToggleButtonDisabled: "cursor-not-allowed opacity-50",
  piiIcon: "h-4 w-4",
} as const;
