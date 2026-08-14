import type { ReactNode } from "react";
import type { Placement } from "@floating-ui/react";

// Available tooltip styles
export type TooltipVariant =
  | "dark"
  | "light"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface TooltipStyleConfig {
  bg?: string;
  text?: string;
  border?: string;
}

// Subcomponent: TooltipTrigger Props
export type TooltipTriggerProps = {
  children: ReactNode;
  setReference: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  className?: string;
};

// Subcomponent: TooltipContent Props
export type TooltipContentProps = {
  content: ReactNode;
  context: any;
  setFloating: (node: HTMLElement | null) => void;
  setArrowEl: (node: SVGSVGElement | null) => void;
  floatingStyles: React.CSSProperties;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  variant?: TooltipVariant;
  color?: string;
  textColor?: string;
  styleConfig?: TooltipStyleConfig;
  showArrow?: boolean;
  className?: string;
  portal?: boolean | HTMLElement;
};

// Props for Tooltip component
export type TooltipProps = {
  children: ReactNode; // element that triggers tooltip
  content?: ReactNode; // tooltip text/content

  placement?: Placement; // tooltip position (top, bottom, etc.)
  offset?: number; // gap between trigger and tooltip

  className?: string; // custom class for tooltip
  variant?: TooltipVariant; // predefined style variant

  // Backward compatibility & direct overrides
  color?: string; // custom background override
  textColor?: string; // custom text color override

  // Flexible styling
  styleConfig?: TooltipStyleConfig;

  showArrow?: boolean; // toggle arrow visibility
  delay?: number | { open?: number; close?: number }; // open/close delay

  // Portal flexibility
  portal?: boolean | HTMLElement;
};
