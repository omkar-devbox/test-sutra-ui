import React from "react";
import { Skeleton } from "./Skeleton";
import type { SkeletonTextProps } from "../types/skeleton.types";

/**
 * Pre-configured multi-line text skeleton loader with natural line length variation.
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  gap = "0.5rem",
  lastLineWidth,
  randomizeWidths = true,
  className,
  animation = "shimmer",
  height = "1em",
  style,
  ...restProps
}) => {
  // Pre-calculated natural width percentages for paragraph effect
  const defaultWidths = ["100%", "92%", "96%", "85%", "90%"];

  const getLineWidth = (index: number) => {
    const isLast = index === lines - 1;
    if (isLast && lastLineWidth !== undefined) {
      return lastLineWidth;
    }
    if (!randomizeWidths) {
      return "100%";
    }
    return defaultWidths[index % defaultWidths.length];
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{ gap, ...style }}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          animation={animation}
          height={height}
          width={getLineWidth(index)}
          className={className}
          {...restProps}
        />
      ))}
    </div>
  );
};
