import React from "react";

/**
 * Animation types supported by the Skeleton system.
 * - 'shimmer': Linear sweep gradient overlay animation (default).
 * - 'pulse': Gentle opacity oscillation.
 * - 'wave': Wave shimmer sweep effect.
 * - 'none': Static placeholder without animation.
 */
export type SkeletonAnimation = "shimmer" | "pulse" | "wave" | "none";

/**
 * Visual variant shapes for Skeleton placeholders.
 */
export type SkeletonVariant = "rect" | "circle" | "text" | "square" | "button" | "badge";

/**
 * Custom styling configuration for the Skeleton component.
 * Allows overriding colors, border radius, aspect ratios, and durations.
 */
export interface SkeletonStyleConfig {
  /** Base background color of the skeleton. */
  baseColor?: string;
  /** Color of the shimmer/highlight effect. */
  highlightColor?: string;
  /** Custom border radius for the skeleton. */
  borderRadius?: string | number;
  /** Custom animation duration in seconds. */
  duration?: number;
  /** Custom aspect ratio (e.g., '16/9', '4/3'). */
  aspectRatio?: string;
}

/**
 * Core props for the base Skeleton component.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional CSS class name for custom styling. */
  className?: string;
  /**
   * Visual variant shape of the skeleton.
   * Defaults to 'rect'.
   */
  variant?: SkeletonVariant;
  /**
   * Animation style for loading effect.
   * Defaults to 'shimmer'.
   */
  animation?: SkeletonAnimation;
  /** Explicit width (e.g., '100%', '50px', or number for pixels). */
  width?: string | number;
  /** Explicit height (e.g., '20px', '100%', or number for pixels). */
  height?: string | number;
  /** Custom border radius (shortcut for styleConfig.borderRadius). */
  borderRadius?: string | number;
  /** Number of skeleton instances to render in sequence. */
  count?: number;
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Detailed custom styling configuration object. */
  styleConfig?: SkeletonStyleConfig;
  /** Accessible label description for assistive technologies. */
  ariaLabel?: string;
  /** Optional child elements to wrap or measure. */
  children?: React.ReactNode;
}

/**
 * Props for the SkeletonText component.
 */
export interface SkeletonTextProps extends Omit<SkeletonProps, "variant"> {
  /** Number of text line skeletons to render. Defaults to 3. */
  lines?: number;
  /** Gap spacing between text lines in CSS format or Tailwind spacing. Defaults to '0.5rem'. */
  gap?: string | number;
  /** Specific width of the final line (e.g., '60%' or '40%'). */
  lastLineWidth?: string | number;
  /** Whether to randomize line widths for a natural paragraph appearance. Defaults to true. */
  randomizeWidths?: boolean;
}

/**
 * Props for the SkeletonAvatar component.
 */
export interface SkeletonAvatarProps extends Omit<SkeletonProps, "variant"> {
  /** Diameter/size of the avatar (e.g., 40, '40px', '3rem'). Defaults to 40. */
  size?: string | number;
  /** Avatar shape: 'circle' or 'square' (rounded box). Defaults to 'circle'. */
  shape?: "circle" | "square";
  /** Optional status indicator badge placeholder. */
  hasBadge?: boolean;
}

/**
 * Props for the SkeletonButton component.
 */
export interface SkeletonButtonProps extends Omit<SkeletonProps, "variant"> {
  /** Button size preset. Defaults to 'md'. */
  size?: "sm" | "md" | "lg";
  /** Whether the button takes up 100% parent width. Defaults to false. */
  fullWidth?: boolean;
}

/**
 * Props for the SkeletonCard component.
 */
export interface SkeletonCardProps {
  /** Class name for the outer card container. */
  className?: string;
  /** Whether to render an avatar in the card header. Defaults to true. */
  hasAvatar?: boolean;
  /** Whether to render a media image box at top of card. Defaults to false. */
  hasImage?: boolean;
  /** Number of content lines. Defaults to 3. */
  lines?: number;
  /** Whether to render footer action buttons. Defaults to true. */
  hasActions?: boolean;
  /** Height of media image box if hasImage is true. Defaults to 160. */
  imageHeight?: string | number;
  /** Skeleton animation type. */
  animation?: SkeletonAnimation;
}

/**
 * Props for the SkeletonTable component.
 */
export interface SkeletonTableProps {
  /** Class name for the table skeleton wrapper. */
  className?: string;
  /** Number of table data rows to simulate. Defaults to 5. */
  rows?: number;
  /** Number of table columns per row. Defaults to 4. */
  cols?: number;
  /** Whether to render table header row. Defaults to true. */
  showHeader?: boolean;
  /** Skeleton animation type. */
  animation?: SkeletonAnimation;
}

/**
 * Props for the SkeletonWrapper component.
 */
export interface SkeletonWrapperProps {
  /** Loading state condition. If true, displays fallback skeleton; otherwise displays children. */
  loading: boolean;
  /** Fallback node (e.g. `<SkeletonCard />` or `<SkeletonText />`) rendered when loading is true. */
  fallback?: React.ReactNode;
  /** Real content node rendered when loading is false. */
  children?: React.ReactNode;
  /** Optional class name for the wrapper container. */
  className?: string;
}
