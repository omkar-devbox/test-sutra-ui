export const customersStyles = {
  container: "flex flex-col gap-6 w-full mx-auto p-1 md:p-4 min-h-full",

  statCard:
    "flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md",

  statusBadgeBase:
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border",

  statusVariants: {
    Active:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 border-emerald-500/20",
    Inactive:
      "bg-slate-500/10 text-slate-700 dark:bg-slate-500/25 dark:text-slate-300 border-slate-500/20",
    default:
      "bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8] border-[#0077be]/20",
  },

  contactBadge: "font-mono text-slate-600 dark:text-slate-300 text-xs font-medium",
};

export const getStatusBadgeStyle = (status: string): string => {
  const variantClass =
    customersStyles.statusVariants[
    status as keyof typeof customersStyles.statusVariants
    ] || customersStyles.statusVariants.default;

  return `${customersStyles.statusBadgeBase} ${variantClass}`;
};
