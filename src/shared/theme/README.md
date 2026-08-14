# 🌓 Theme Context & Dark Mode Engine (`@/shared/theme`)

Welcome to the comprehensive documentation for the **Theme Context & Dark Mode Engine** in the `Sutra-ui` application.

This module provides system color scheme detection, zero-flicker HTML class synchronization, localStorage persistence, and smooth View Transitions API crossfading when switching themes.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Hook Specification](#-exhaustive-api--hook-specification)
   - [`<ThemeProvider />`](#themeprovider-)
   - [`useTheme()` Hook](#usetheme-hook)
4. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Application Provider Setup](#recipe-1-application-provider-setup)
   - [Recipe 2: Theme Toggle Button](#recipe-2-theme-toggle-button)
   - [Recipe 3: Explicit Theme Selection Dropdown](#recipe-3-explicit-theme-selection-dropdown)
5. [Storage Key & Persistence](#-storage-key--persistence)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🚀 Overview & Core Architecture

The Theme module manages color modes (`light`, `dark`, `system`). It automatically detects operating system dark mode preferences using `window.matchMedia("(prefers-color-scheme: dark)")` and syncs changes directly onto `document.documentElement` (`classList.add("dark")`).

### Key Capabilities:
- ⚡ **Zero-Flicker Mounting**: Anti-FOUC (Flash of Unstyled Content) initialization.
- 🎨 **View Transitions API Integration**: Native fluid crossfade animation on supported browsers.
- 💾 **Automatic Storage Persistence**: Remembers theme preference under storage key `sutra_ui_theme`.
- 💻 **OS Preference Listener**: Dynamically responds when operating system toggles light/dark mode.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [index.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/theme/index.ts)
- Context & Hook Provider: [ThemeContext.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/theme/ThemeContext.tsx)

---

## 🛠 Exhaustive API & Hook Specification

### `<ThemeProvider />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Default initial theme when no stored theme exists. |
| `storageKey` | `string` | `"sutra_ui_theme"` | LocalStorage key name used for persistence. |
| `children` | `ReactNode` | **Required** | Application tree wrapped by provider. |

---

### `useTheme()` Hook Return Values

```tsx
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

| Return Value | Type | Description |
| :--- | :--- | :--- |
| `theme` | `"light" \| "dark" \| "system"` | Current active theme mode setting. |
| `resolvedTheme` | `"light" \| "dark"` | Evaluated actual theme state (`system` resolves to `light` or `dark`). |
| `setTheme` | `(theme: Theme) => void` | Setter function to change theme explicitly. |
| `toggleTheme` | `() => void` | Helper function to quickly toggle between light and dark mode. |

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Application Provider Setup

```tsx
import { ThemeProvider } from "@/shared/theme";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sutra_ui_theme">
      {children}
    </ThemeProvider>
  );
}
```

### Recipe 2: Theme Toggle Button

```tsx
import { useTheme } from "@/shared/theme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
```

---

## 💾 Storage Key & Persistence

The active user theme selection is serialized into browser `localStorage` under the key:
`sutra_ui_theme`

To reset theme state programmatically:

```javascript
localStorage.removeItem("sutra_ui_theme");
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Why does the system default to system preferences?**
> `defaultTheme="system"` guarantees that first-time visitors automatically get their native desktop or mobile OS theme setting.

---

Part of the **Sutra-ui Architecture**. Built with React, TypeScript, and Tailwind CSS.
