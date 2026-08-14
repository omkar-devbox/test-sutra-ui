import { useMemo } from "react";
import { FloatingPortal, FloatingArrow } from "@floating-ui/react";
import { cn } from "@/shared/lib/utils";
import { tooltipBaseStyles, tooltipVariants } from "../styles/tooltip.styles";
import type { TooltipContentProps } from "../types/tooltip.types";

/**
 * TooltipContent Component
 * Renders floating tooltip panel with SVG arrow and portal handling.
 */
export function TooltipContent({
  content,
  context,
  setFloating,
  setArrowEl,
  floatingStyles,
  getFloatingProps,
  variant = "dark",
  color,
  textColor,
  styleConfig,
  showArrow = true,
  className,
  portal = true,
}: TooltipContentProps) {
  // 1. Style Resolution (Priority: variant < styleConfig < direct props)
  const resolvedStyles = useMemo(() => {
    return {
      "--tt-bg": color || styleConfig?.bg,
      "--tt-text": textColor || styleConfig?.text,
      "--tt-border": styleConfig?.border,
    } as React.CSSProperties;
  }, [color, textColor, styleConfig]);

  if (!content) return null;

  // 2. Tooltip Content Panel
  const tooltipPanel = (
    <div
      ref={setFloating}
      style={{ ...floatingStyles, ...resolvedStyles }}
      {...getFloatingProps()}
      className={cn(
        tooltipBaseStyles.panel,
        tooltipVariants[variant].panel,
        className,
      )}
      data-variant={variant}
    >
      {content}

      {showArrow && (
        <FloatingArrow
          ref={setArrowEl}
          context={context}
          className={tooltipVariants[variant].arrow}
          fill="var(--tt-bg, currentColor)"
          style={{
            fill: (color || styleConfig?.bg) ? "var(--tt-bg)" : undefined,
          }}
        />
      )}
    </div>
  );

  // 3. Portal Resolution
  if (portal === false) {
    return tooltipPanel;
  }

  return (
    <FloatingPortal root={portal instanceof HTMLElement ? portal : undefined}>
      {tooltipPanel}
    </FloatingPortal>
  );
}
