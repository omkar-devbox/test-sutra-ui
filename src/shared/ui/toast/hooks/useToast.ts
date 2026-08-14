import { useSyncExternalStore, isValidElement, type ReactNode } from "react";
import {
  MAX_TOASTS_LIMIT,
  type ToastItemData,
  type ToastVariant,
  type ToastOptions,
  type ToastInput,
  type ToastPosition,
  type ToastPromiseMessages,
} from "../types/toast.types";

let toasts: ToastItemData[] = [];
let currentPosition: ToastPosition = "top-right";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => toasts;

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const resolveInput = (
  input: ToastInput,
  variant: ToastVariant,
): Omit<ToastItemData, "id" | "createdAt"> => {
  if (isValidElement(input)) {
    return { variant, content: input };
  }

  if (typeof input === "object" && input !== null) {
    return { variant, ...(input as ToastOptions) };
  }

  return { variant, content: input as ReactNode };
};

const isAuthTokenError = (m: ToastInput): boolean => {
  if (!m) return false;
  let text = "";
  if (typeof m === "string") {
    text = m;
  } else if (typeof m === "object" && "description" in m) {
    text = String(m.description || "");
  } else if (typeof m === "object" && "title" in m) {
    text = String(m.title || "");
  }

  return (
    text.includes("Invalid or expired authentication token") ||
    text.includes("Invalid or expired refresh token") ||
    text.includes("Refresh token expired or invalid")
  );
};

export const toast = {
  add: (input: ToastInput, variant: ToastVariant = "info"): string => {
    const id = crypto.randomUUID();
    const itemData = resolveInput(input, variant);
    const newItem: ToastItemData = {
      id,
      createdAt: Date.now(),
      ...itemData,
    };

    // Enforce max toasts limit by dropping oldest
    const nextToasts = [...toasts, newItem];
    if (nextToasts.length > MAX_TOASTS_LIMIT) {
      toasts = nextToasts.slice(nextToasts.length - MAX_TOASTS_LIMIT);
    } else {
      toasts = nextToasts;
    }

    emitChange();
    return id;
  },

  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  },

  dismiss: (id?: string) => {
    if (id) {
      toast.remove(id);
    } else {
      toasts = [];
      emitChange();
    }
  },

  update: (id: string, options: Partial<ToastOptions> & { variant?: ToastVariant }) => {
    toasts = toasts.map((t) => {
      if (t.id !== id) return t;
      return {
        ...t,
        ...options,
        variant: options.variant || t.variant,
      };
    });
    emitChange();
  },

  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>,
  ): Promise<T> => {
    const id = toast.loading(messages.loading);

    const p = typeof promise === "function" ? promise() : promise;

    return p
      .then((data) => {
        const succMsg =
          typeof messages.success === "function"
            ? messages.success(data)
            : messages.success;
        const itemData = resolveInput(succMsg, "success");
        toast.update(id, {
          ...itemData,
          variant: "success",
          duration: itemData.duration ?? 4000,
        });
        return data;
      })
      .catch((err) => {
        const errorMsg =
          typeof messages.error === "function"
            ? messages.error(err)
            : messages.error;
        const itemData = resolveInput(errorMsg, "error");
        toast.update(id, {
          ...itemData,
          variant: "error",
          duration: itemData.duration ?? 5000,
        });
        throw err;
      });
  },

  success: (m: ToastInput) => toast.add(m, "success"),
  error: (m: ToastInput) => {
    if (isAuthTokenError(m)) {
      return "";
    }
    return toast.add(m, "error");
  },
  warning: (m: ToastInput) => toast.add(m, "warning"),
  info: (m: ToastInput) => toast.add(m, "info"),
  loading: (m: ToastInput) => toast.add(m, "loading"),

  setPosition: (position: ToastPosition) => {
    currentPosition = position;
    emitChange();
  },
};

export const useToast = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const position = useSyncExternalStore(
    subscribe,
    () => currentPosition,
    () => currentPosition,
  );
  return {
    toasts: items,
    position,
    removeToast: toast.remove,
    dismissToast: toast.dismiss,
    updateToast: toast.update,
    setPosition: toast.setPosition,
  };
};
