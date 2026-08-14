# 🔔 Toast Notification System (`@/shared/ui/toast`)

Welcome to the comprehensive documentation for the **Toast Notification System** in the `omkar-devbox` design system.

The Toast module provides an ultra-lightweight, zero-dependency notification system powered by React's `useSyncExternalStore`. It supports customizable alert popups, promise tracking (`toast.promise`), placement positioning, auto-dismiss timers, and dark-mode aesthetics.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Method Specification](#-exhaustive-api--method-specification)
   - [`toast` Imperative API](#toast-imperative-api)
   - [`<ToastContainer />` Component](#toastcontainer--component)
4. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Mounting Toast Container in Root Layout](#recipe-1-mounting-toast-container-in-root-layout)
   - [Recipe 2: Firing Basic Alert Notifications](#recipe-2-firing-basic-alert-notifications)
   - [Recipe 3: Handling Async Promises with `toast.promise`](#recipe-3-handling-async-promises-with-toastpromise)
5. [Design System Tokens & Customization](#-design-system-tokens--customization)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🚀 Overview & Core Architecture

The Toast module uses an external store pattern (`useSyncExternalStore`), allowing components anywhere in the application to trigger toasts imperatively without requiring wrapper context providers or heavy state re-renders.

### Key Capabilities:
- ⚡ **Zero Context Provider Overhead**: Trigger notifications imperatively via `toast.success()`, `toast.error()`, etc.
- ⏳ **Promise Resolution Tracking**: Automatically track async promises with loading, success, and error notification states.
- 🎯 **Flexible Screen Positions**: Configure placement (`top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`).
- 🎨 **Adaptive Dark Mode**: Tailwind dark mode styling with auto-dismiss progress indicators.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [index.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/index.ts)
- Toast Controller & Store: [hooks/useToast.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/hooks/useToast.ts)
- Viewport Container: [items/ToastContainer.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/items/ToastContainer.tsx)
- Individual Toast Card: [items/ToastItem.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/items/ToastItem.tsx)
- Base Alert Box: [items/Alert.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/items/Alert.tsx)
- Types & Interfaces: [types/toast.types.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/types/toast.types.ts)
- Styling Tokens: [styles/toast.styles.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/toast/styles/toast.styles.ts)

---

## 🛠 Exhaustive API & Method Specification

### `toast` Imperative Methods

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `toast.info(message, options?)` | `(ToastInput, ToastOptions?)` | `string` | Display an informative toast alert. |
| `toast.success(message, options?)` | `(ToastInput, ToastOptions?)` | `string` | Display a green success toast alert. |
| `toast.warning(message, options?)` | `(ToastInput, ToastOptions?)` | `string` | Display a yellow warning toast alert. |
| `toast.error(message, options?)` | `(ToastInput, ToastOptions?)` | `string` | Display a red danger/error toast alert. |
| `toast.promise(promise, messages, options?)` | `(Promise, ToastPromiseMessages, ToastOptions?)` | `Promise<T>` | Track an async operation through loading, success, and error states. |
| `toast.dismiss(id?)` | `(string?)` | `void` | Dismiss a specific toast by ID or clear all active toasts. |

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Mounting Toast Container in Root Layout

```tsx
import { ToastContainer } from "@/shared/ui/toast";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {children}
      {/* Mount container at root level */}
      <ToastContainer position="top-right" duration={4000} />
    </div>
  );
}
```

### Recipe 2: Handling Async Promises with `toast.promise`

```tsx
import { toast } from "@/shared/ui/toast";

async function saveUserProfile(data: UserData) {
  return toast.promise(
    api.post("/user/profile", data),
    {
      loading: "Saving user profile...",
      success: "Profile updated successfully!",
      error: "Failed to save profile. Please try again.",
    }
  );
}
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Where should `<ToastContainer />` be placed in the DOM tree?**
> Render `<ToastContainer />` once near the root of your application layout (e.g. inside `AppLayout` or `AppProviders`).

**Q: Can I change toast duration per alert?**
> Yes! Pass `{ duration: 10000 }` in the options object of any `toast` call.

---

Part of the **omkar-devbox UI Component Architecture**. Built with React, TypeScript, and Tailwind CSS.
