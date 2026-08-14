import type { TooltipTriggerProps } from "../types/tooltip.types";
import { tooltipBaseStyles } from "../styles/tooltip.styles";
import { cn } from "@/shared/lib/utils";

/**
 * TooltipTrigger Component
 * Wraps the trigger element with Floating UI reference node and interaction handlers.
 */
export function TooltipTrigger({
  children,
  setReference,
  getReferenceProps,
  className,
}: TooltipTriggerProps) {
  return (
    <div
      ref={setReference}
      className={cn(tooltipBaseStyles.triggerWrapper, className)}
      {...getReferenceProps()}
    >
      {children}
    </div>
  );
}
