import React from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "./Skeleton";
import type { SkeletonTableProps } from "../types/skeleton.types";

/**
 * Tabular grid loading skeleton for data table placeholders.
 */
export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  className,
  rows = 5,
  cols = 4,
  showHeader = true,
  animation = "shimmer",
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800",
        "bg-white/60 dark:bg-neutral-900/60 overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Header Row */}
      {showHeader && (
        <div className="flex items-center px-4 py-3 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 gap-4">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div key={`header-${colIdx}`} className="flex-1">
              <Skeleton
                variant="text"
                animation={animation}
                height="0.875rem"
                width={colIdx === 0 ? "40%" : "70%"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Body Rows */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex items-center px-4 py-3.5 gap-4">
            {Array.from({ length: cols }).map((_, colIdx) => (
              <div key={`cell-${rowIdx}-${colIdx}`} className="flex-1 items-center">
                {colIdx === 0 ? (
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circle" width={28} height={28} animation={animation} />
                    <Skeleton variant="text" width="60%" animation={animation} />
                  </div>
                ) : (
                  <Skeleton
                    variant="text"
                    width={colIdx === cols - 1 ? "45%" : "80%"}
                    animation={animation}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
