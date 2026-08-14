import React from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "./Skeleton";
import type { SkeletonWrapperProps } from "../types/skeleton.types";

/**
 * Higher-order conditional loader component (`loading={true|false}`) that seamlessly
 * crossfades between the skeleton placeholder and loaded real content.
 */
export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  loading,
  fallback,
  children,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn("w-full transition-opacity duration-300 opacity-100", className)}>
        {fallback || <Skeleton variant="rect" height={100} className="w-full" />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full transition-all duration-300 ease-out",
        "animate-in fade-in-50 zoom-in-[0.99]",
        className
      )}
    >
      {children}
    </div>
  );
};
