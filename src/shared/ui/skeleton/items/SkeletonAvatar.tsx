import React from "react";
import { Skeleton } from "./Skeleton";
import type { SkeletonAvatarProps } from "../types/skeleton.types";

/**
 * Avatar loader skeleton supporting circular and square avatar frames with optional status badges.
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 40,
  shape = "circle",
  hasBadge = false,
  className,
  animation = "shimmer",
  ...restProps
}) => {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <div className="relative inline-block shrink-0">
      <Skeleton
        variant={shape === "circle" ? "circle" : "square"}
        animation={animation}
        width={dimension}
        height={dimension}
        className={className}
        {...restProps}
      />
      {hasBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 z-10">
          <Skeleton
            variant="circle"
            animation={animation}
            width={typeof size === "number" ? Math.max(10, size * 0.3) : "12px"}
            height={typeof size === "number" ? Math.max(10, size * 0.3) : "12px"}
            className="ring-2 ring-white dark:ring-neutral-900"
          />
        </span>
      )}
    </div>
  );
};
