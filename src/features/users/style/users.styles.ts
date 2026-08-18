export const usersStyles = {
  container: "flex flex-col gap-6 w-full -auto p-1 md:p-4 min-h-full",

  statCard:
    "flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md",

  roleBadgeBase:
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border",

  roleVariants: {
    Admin:
      "bg-purple-500/10 text-purple-700 dark:bg-purple-500/25 dark:text-purple-300 border-purple-500/20",
    Manager:
      "bg-sky-500/10 text-sky-700 dark:bg-sky-500/25 dark:text-sky-300 border-sky-500/20",
    Operator:
      "bg-amber-500/10 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 border-amber-500/20",
    Staff:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 border-emerald-500/20",
    Viewer:
      "bg-slate-500/10 text-slate-700 dark:bg-slate-500/25 dark:text-slate-300 border-slate-500/20",
    default:
      "bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8] border-[#0077be]/20",
  },

  contactBadge: "font-mono text-slate-600 dark:text-slate-300 text-xs font-medium",
};

export const getRoleBadgeStyle = (role: string): string => {
  const variantClass =
    usersStyles.roleVariants[
    role as keyof typeof usersStyles.roleVariants
    ] || usersStyles.roleVariants.default;

  return `${usersStyles.roleBadgeBase} ${variantClass}`;
};
