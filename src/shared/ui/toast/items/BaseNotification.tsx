import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { ToastVariant, BaseNotificationProps } from "../types/toast.types";
import {
  notificationVariants,
  NOTIFICATION_CONFIG,
  NOTIFICATION_UI,
} from "../styles/toast.styles";
import {
  useThemeVariables,
  THEME_VAR_CLASSES,
} from "../hooks/useThemeVariables";

interface LocalBaseNotificationProps extends BaseNotificationProps {
  variant?: ToastVariant;
  onClose?: () => void;
  showProgress?: boolean;
  progressPercentage?: number;
  exiting?: boolean;
  className?: string;
}

export function BaseNotification({
  variant = "info",
  title,
  description,
  content,
  icon,
  action,
  onClose,
  showProgress = false,
  progressPercentage = 100,
  theme,
  exiting = false,
  dismissible = true,
  className,
}: LocalBaseNotificationProps) {
  const config = NOTIFICATION_CONFIG[variant];
  const Icon = config.icon;
  const styleVariables = useThemeVariables(theme);

  const body = content ?? description;

  return (
    <div
      className={cn(
        notificationVariants({ exiting }),
        theme && THEME_VAR_CLASSES.container,
        className,
      )}
      style={styleVariables}
    >
      {/* Icon Badge */}
      <div
        className={cn(
          NOTIFICATION_UI.iconBadgeContainer,
          config.badgeBgClass,
          config.badgeTextClass,
          theme?.iconBg && "bg-[var(--toast-icon-bg)]",
          theme?.iconText && "text-[var(--toast-icon-text)]",
        )}
      >
        {icon || (
          <Icon className={cn("size-4 stroke-[2.2px]", config.animate)} />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 pr-1">
            {title && (
              <div className="font-semibold text-sm leading-tight text-foreground">
                {title}
              </div>
            )}
            {body && (
              <div
                className={cn(
                  "text-xs leading-relaxed text-muted-foreground break-words",
                  title && "mt-0.5",
                )}
              >
                {body}
              </div>
            )}
            {action && (
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    action.onClick(e);
                    if (onClose) onClose();
                  }}
                  className={NOTIFICATION_UI.actionButton}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && onClose && (
            <button
              type="button"
              onClick={onClose}
              className={NOTIFICATION_UI.closeButton}
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Smooth Timer Progress Bar */}
      {showProgress && variant !== "loading" && (
        <div className={NOTIFICATION_UI.progressBarTrack}>
          <div
            className={cn(
              NOTIFICATION_UI.progressBar,
              config.progressClass,
              theme?.progress && THEME_VAR_CLASSES.progress,
            )}
            style={{
              transform: `scaleX(${Math.max(0, Math.min(100, progressPercentage)) / 100})`,
            }}
          />
        </div>
      )}
    </div>
  );
}
