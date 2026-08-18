import { cn } from "@/shared/lib/utils";

export const bottomNavContainerStyles = (className?: string) =>
  cn(
    "fixed bottom-0 left-0 right-0 z-40 md:hidden",
    "bg-white/95 dark:bg-[#00263e]/95 backdrop-blur-xl",
    "border-t border-[#004066]/15 dark:border-[#003352]",
    "px-3 py-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]",
    "flex items-center justify-around",
    "shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-all duration-200",
    className
  );

export const navItemButtonStyles = (isActive: boolean) =>
  cn(
    "flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all duration-200 relative cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-[#0077be]",
    isActive
      ? "text-[#0077be] font-bold scale-[1.02]"
      : "text-[#004066]/70 dark:text-[#ebf7ff]/70 hover:text-[#0077be] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
  );

export const fabButtonStyles = (className?: string) =>
  cn(
    "relative -mt-6 h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#005c94] via-[#0077be] to-[#0099f0]",
    "text-white shadow-[0_8px_20px_rgba(0,119,190,0.4)] border-4 border-white dark:border-[#00263e]",
    "flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077be]",
    className
  );
