import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  arrow,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react";
import { TooltipTrigger } from "./items/TooltipTrigger";
import { TooltipContent } from "./items/TooltipContent";
import type { TooltipProps } from "./types/tooltip.types";

const DEFAULT_DELAY = { open: 200, close: 0 };

/**
 * Tooltip Component
 * Enterprise-grade, AI-ready tooltip with flexible portal and style systems.
 */
export function Tooltip({
  children,
  content,
  placement = "top",
  offset = 8,
  className,
  variant = "dark",
  color,
  textColor,
  styleConfig,
  showArrow = true,
  delay = DEFAULT_DELAY,
  portal = true,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState<SVGSVGElement | null>(null);

  // 1. Floating UI configuration
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware(offset),
      flip(),
      shift({ padding: 5 }),
      ...(showArrow ? [arrow({ element: arrowEl })] : []),
    ],
  });

  // 2. Interaction hooks
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: typeof delay === "number" ? { open: delay, close: 0 } : delay,
    }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);

  if (!content) return <>{children}</>;

  return (
    <>
      <TooltipTrigger
        setReference={refs.setReference}
        getReferenceProps={getReferenceProps}
      >
        {children}
      </TooltipTrigger>
      {open && (
        <TooltipContent
          content={content}
          context={context}
          setFloating={refs.setFloating}
          setArrowEl={setArrowEl}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
          variant={variant}
          color={color}
          textColor={textColor}
          styleConfig={styleConfig}
          showArrow={showArrow}
          className={className}
          portal={portal}
        />
      )}
    </>
  );
}
