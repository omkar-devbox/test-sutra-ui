import React from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "./Skeleton";
import { SkeletonAvatar } from "./SkeletonAvatar";
import { SkeletonText } from "./SkeletonText";
import { SkeletonButton } from "./SkeletonButton";
import type { SkeletonCardProps } from "../types/skeleton.types";

/**
 * Composite card skeleton component representing card headers, body media, text lines, and actions.
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className,
  hasAvatar = true,
  hasImage = false,
  lines = 3,
  hasActions = true,
  imageHeight = 160,
  animation = "shimmer",
}) => {
  return (
    <div
      className={cn(
        "p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800",
        "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm shadow-sm space-y-4",
        className
      )}
    >
      {/* Optional Media Image Banner */}
      {hasImage && (
        <Skeleton
          variant="rect"
          animation={animation}
          height={imageHeight}
          className="w-full rounded-lg"
        />
      )}

      {/* Header Section */}
      <div className="flex items-center space-x-3">
        {hasAvatar && <SkeletonAvatar size={42} animation={animation} />}
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" animation={animation} width="65%" height="1rem" />
          <Skeleton variant="text" animation={animation} width="40%" height="0.75rem" />
        </div>
      </div>

      {/* Content Lines */}
      <SkeletonText lines={lines} animation={animation} />

      {/* Action Footer */}
      {hasActions && (
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          <SkeletonButton size="sm" animation={animation} />
          <SkeletonButton size="sm" animation={animation} />
        </div>
      )}
    </div>
  );
};
