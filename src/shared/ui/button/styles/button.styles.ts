import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-medium transition-all
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 cursor-pointer
  bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)]
  hover:bg-[var(--btn-hoverBg)] hover:text-[var(--btn-hoverText)]
  active:scale-[0.98]
  disabled:bg-[var(--btn-disabledBg)] disabled:text-[var(--btn-disabledText)]
  data-[loading=true]:text-transparent data-[loading=true]:[&>svg:not(.loader)]:opacity-0`,
  {
    variants: {
      variant: {
        primary: "bg-[#0077be] text-white hover:bg-[#00629e] active:bg-[#004d7c] shadow-md shadow-[#0077be]/20 font-semibold",
        secondary: "bg-[#004066] text-white hover:bg-[#003352] active:bg-[#00263e] font-semibold",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        outline: "border border-[#004066]/30 bg-white text-[#004066] hover:bg-[#ebf7ff] hover:border-[#0077be] dark:bg-[#00263e] dark:text-[#ebf7ff] dark:border-[#005280]",
        ghost: "text-[#004066] hover:bg-[#ebf7ff] hover:text-[#0077be] dark:text-[#ebf7ff] dark:hover:bg-[#003352]",
      },
      size: {
        sm: "h-8 px-3 text-[12px]",
        md: "h-9 px-4",
        lg: "h-11 px-6 text-[14px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
