import React from "react";
import { cn } from "@/shared/lib/utils";
import { skeletonVariants } from "../styles/skeleton.styles";
import type { SkeletonProps } from "../types/skeleton.types";

/**
 * Enhanced Skeleton loader component with support for staggered shimmer delays,
 * customizable variants, smooth dark mode transitions, and full accessibility.
 */
export const Skeleton: React.FC<SkeletonProps & { staggerIndex?: number }> = ({
  className,
  variant = "rect",
  animation = "shimmer",
  width,
  height,
  borderRadius,
  count = 1,
  staggerIndex,
  style,
  styleConfig,
  ariaLabel = "Loading...",
  children,
  ...restProps
}) => {
  const isCircle = variant === "circle";
  const isSquare = variant === "square";
  const isText = variant === "text";

  const getAnimationDelay = (index: number) => {
    const idx = staggerIndex ?? index;
    return idx > 0 ? `${idx * 100}ms` : undefined;
  };

  const customStyle = (index: number = 0): React.CSSProperties => ({
    width: width ?? (isText ? "100%" : undefined),
    height: height ?? (isText ? "1em" : isSquare || isCircle ? width : undefined),
    borderRadius: styleConfig?.borderRadius ?? borderRadius ?? undefined,
    backgroundColor: styleConfig?.baseColor,
    aspectRatio: styleConfig?.aspectRatio,
    animationDelay: getAnimationDelay(index),
    // Dynamic CSS variables for shimmer styling
    ["--shimmer-highlight" as string]: styleConfig?.highlightColor,
    ["--shimmer-duration" as string]: styleConfig?.duration ? `${styleConfig.duration}s` : undefined,
    ...style,
  });

  const renderSingleSkeleton = (index: number = 0) => (
    <div
      key={index}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn(skeletonVariants({ variant, animation, className }))}
      style={customStyle(index)}
      {...restProps}
    >
      <span className="sr-only">{ariaLabel}</span>
      {children}
    </div>
  );

  if (count > 1) {
    return (
      <div className="flex flex-col gap-2.5 w-full">
        {Array.from({ length: count }).map((_, index) => renderSingleSkeleton(index))}
      </div>
    );
  }

  return renderSingleSkeleton();
};

/**
 * Composite fallback skeleton preview demonstrating profile and content placeholder layouts.
 * Preserved for seamless backward compatibility.
 */
export const ContentSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-5 rounded-xl border border-neutral-200/70 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-sm">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton variant="rect" height={180} className="w-full rounded-lg" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton variant="square" className="w-full h-24" staggerIndex={1} />
          <Skeleton variant="square" className="w-full h-24" staggerIndex={2} />
          <Skeleton variant="square" className="w-full h-24" staggerIndex={3} />
        </div>
        <Skeleton count={3} variant="text" />
      </div>
    </div>
  );
};
