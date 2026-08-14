import React from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "./Skeleton";
import type { SkeletonButtonProps } from "../types/skeleton.types";

const sizeStyles = {
  sm: "h-8 w-20 text-xs",
  md: "h-10 w-24 text-sm",
  lg: "h-12 w-32 text-base",
};

/**
 * Button loader skeleton pre-configured to match standard UI button proportions.
 */
export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = "md",
  fullWidth = false,
  className,
  animation = "shimmer",
  ...restProps
}) => {
  return (
    <Skeleton
      variant="button"
      animation={animation}
      className={cn(
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...restProps}
    />
  );
};
