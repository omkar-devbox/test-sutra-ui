export const paperTypesStyles = {
  container: "flex flex-col gap-6 w-full p-1 md:p-2",

  statCard:
    "flex items-center justify-between bg-white/70 dark:bg-[#00253d]/70 backdrop-blur-md border border-[#0077be]/20 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md",

  categoryBadgeBase:
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border",

  categoryVariants: {
    Cardstock:
      "bg-purple-500/10 text-purple-700 dark:bg-purple-500/25 dark:text-purple-300 border-purple-500/20",
    "Vinyl Flex":
      "bg-sky-500/10 text-sky-700 dark:bg-sky-500/25 dark:text-sky-300 border-sky-500/20",
    Glossy:
      "bg-amber-500/10 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 border-amber-500/20",
    Matte:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 border-emerald-500/20",
    "Bond Paper":
      "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/25 dark:text-indigo-300 border-indigo-500/20",
    Specialty:
      "bg-pink-500/10 text-pink-700 dark:bg-pink-500/25 dark:text-pink-300 border-pink-500/20",
    default:
      "bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#38bdf8] border-[#0077be]/20",
  },

  priceBadge: "font-mono font-bold text-[#0077be] dark:text-[#38bdf8]",
};

export const getCategoryBadgeStyle = (category: string): string => {
  const variantClass =
    paperTypesStyles.categoryVariants[
      category as keyof typeof paperTypesStyles.categoryVariants
    ] || paperTypesStyles.categoryVariants.default;

  return `${paperTypesStyles.categoryBadgeBase} ${variantClass}`;
};
