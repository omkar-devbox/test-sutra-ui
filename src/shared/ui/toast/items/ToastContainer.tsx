import { cn } from "@/shared/lib/utils";
import type { ToastContainerProps } from "../types/toast.types";
import { useToast } from "../hooks/useToast";
import { ToastItem } from "./ToastItem";
import { POSITION_MAP } from "../styles/toast.styles";

export function ToastContainer({ className, limit }: ToastContainerProps) {
  const { toasts, position, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const visibleToasts = limit ? toasts.slice(-limit) : toasts;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed z-[100] flex flex-col gap-2.5 p-4 max-h-screen overflow-hidden pointer-events-none transition-all duration-300",
        POSITION_MAP[position],
        className,
      )}
    >
      {visibleToasts.map((toast) => (
        <ToastItem key={toast.id} item={toast} onClose={removeToast} />
      ))}
    </div>
  );
}
