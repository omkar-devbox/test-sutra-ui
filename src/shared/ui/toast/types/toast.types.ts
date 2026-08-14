import type { ReactNode, MouseEvent } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-center";

export const DEFAULT_TOAST_DURATION = 4000;
export const MAX_TOASTS_LIMIT = 5;

export interface ToastAction {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface BaseStyle {
  bg?: string;
  text?: string;
  border?: string;
}

export interface ToastTheme extends BaseStyle {
  iconBg?: string;
  iconText?: string;
  progress?: string;
}

export interface BaseNotificationProps {
  title?: string;
  description?: string;
  content?: ReactNode;
  duration?: number;
  theme?: ToastTheme;
  icon?: ReactNode;
  action?: ToastAction;
  dismissible?: boolean;
}

export type ToastOptions = BaseNotificationProps;

export type ToastInput = ReactNode | ToastOptions;

export interface ToastItemData extends BaseNotificationProps {
  id: string;
  variant: ToastVariant;
  createdAt: number;
}

export interface ToastItemProps {
  item: ToastItemData;
  onClose: (id: string) => void;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  limit?: number;
  className?: string;
}

export interface AlertProps extends BaseNotificationProps {
  variant?: ToastVariant;
  onClose?: () => void;
}

export type ToastPromiseMessages<T = unknown> = {
  loading: ToastInput;
  success: ReactNode | ((data: T) => ToastInput);
  error: ReactNode | ((err: unknown) => ToastInput);
};
