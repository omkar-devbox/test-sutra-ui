import type { AlertProps } from "../types/toast.types";
import { BaseNotification } from "./BaseNotification";

export function Alert({
  variant = "info",
  onClose,
  title,
  description,
  content,
  action,
  dismissible = false,
  theme,
  icon,
}: AlertProps) {
  return (
    <BaseNotification
      variant={variant}
      title={title}
      description={description}
      content={content}
      action={action}
      dismissible={dismissible}
      onClose={onClose}
      theme={theme}
      icon={icon}
      className="shadow-sm w-full max-w-full rounded-xl"
    />
  );
}
