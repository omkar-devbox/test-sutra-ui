# 📖 Complete Guide to `shared/TopNav`

> **Target Audience**: Developers & Senior Engineers alike. This document provides a **100% comprehensive breakdown** of the TopNav top bar navigation module, explaining *what* each file does, *how* to use it, and *how* to customize styles and types.

---

## 📌 Table of Contents

1. [🚀 Quick Start](#1--quick-start)
2. [🗺️ Module Architecture & File Map](#2--module-architecture--file-map)
3. [🧩 Section-by-Section Component Deep Dive](#3--section-by-section-component-deep-dive)
   - [Section 3.1: Core Container — `TopNav.tsx`](#section-31-core-container--topnavtsx)
   - [Section 3.2: Title & Mobile Toggle — `TopNavTitle.tsx`](#section-32-title--mobile-toggle--topnavtitletsx)
   - [Section 3.3: Theme Selector — `TopNavThemeDropdown.tsx`](#section-33-theme-selector--topnavthemedropdowntsx)
   - [Section 3.4: Notifications Bell — `TopNavNotifications.tsx`](#section-34-notifications-bell--topnavnotificationstsx)
   - [Section 3.5: User Profile & Menu — `TopNavUserProfile.tsx`](#section-35-user-profile--menu--topnavuserprofiletsx)
   - [Section 3.6: Styling Tokens — `topNav.styles.ts`](#section-36-styling-tokens--topnavstylests)
   - [Section 3.7: TypeScript Schema — `types.ts`](#section-37-typescript-schema--typests)
4. [💡 Real-World Copy-Paste Recipes](#4--real-world-copy-paste-recipes)
   - [Recipe 1: Full Main Layout Integration](#recipe-1-full-main-layout-integration)
   - [Recipe 2: Custom Theme & Style Overrides](#recipe-2-custom-theme--style-overrides)
   - [Recipe 3: Direct Item Subcomponent Composition](#recipe-3-direct-item-subcomponent-composition)

---

## 1. 🚀 Quick Start

### Step 1: Import TopNav Component

```tsx
import { TopNav } from "@/shared/nav/TopNav/TopNav";
```

### Step 2: Render in Your Page/Layout

```tsx
import React, { useState } from "react";
import { TopNav } from "@/shared/nav/TopNav/TopNav";

export function AppHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <TopNav
      title="Dashboard Overview"
      subtitle="Welcome back to your workspace"
      user={{
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: "System Admin",
      }}
      onMobileMenuOpen={() => setIsMobileOpen(true)}
      onLogout={() => console.log("Logout triggered")}
    />
  );
}
```

---

## 2. 🗺️ Module Architecture & File Map

```
src/shared/nav/TopNav/
├── TopNav.tsx                  # Core header orchestration component
├── items/
│   ├── TopNavTitle.tsx          # Mobile menu trigger + title & subtitle
│   ├── TopNavThemeDropdown.tsx  # Theme switcher (light, dark, system)
│   ├── TopNavNotifications.tsx  # Notification bell with badge
│   └── TopNavUserProfile.tsx    # User avatar, role badge, dropdown options
├── styles/
│   └── topNav.styles.ts        # Modular style definitions & custom style helpers
├── types/
│   └── types.ts                # TypeScript interfaces, props & style config schemas
└── README.md                   # Complete module documentation
```

---

## 3. 🧩 Section-by-Section Component Deep Dive

### Section 3.1: Core Container — `TopNav.tsx`

`TopNav.tsx` brings together title, theme selector, notification bell, and user profile subcomponents inside a sticky `header` container.

**Props (`TopNavProps`):**
| Prop | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Main header title (default: `"Dashboard"`) |
| `subtitle` | `string` | Optional text displayed below title |
| `user` | `TopNavUser` | Current user details (`name`, `email`, `avatar`, `role`) |
| `onToggleSidebar` | `() => void` | Sidebar collapse/expand toggle handler |
| `onMobileMenuOpen` | `() => void` | Mobile drawer trigger handler |
| `onLogout` | `() => void` | Sign-out action handler |
| `styleConfig` | `TopNavStyleConfig` | Optional custom style overrides |

---

### Section 3.2: Title & Mobile Toggle — `TopNavTitle.tsx`

Renders the left side of the top header. Shows the mobile hamburger menu icon on smaller screens and renders page title and subtitle.

---

### Section 3.3: Theme Selector — `TopNavThemeDropdown.tsx`

Integrates with the central `useTheme` hook (`@/shared/theme`) to toggle themes dynamically between **Light**, **Dark**, and **System**.

---

### Section 3.4: Notifications Bell — `TopNavNotifications.tsx`

Displays a notification bell icon with animated ping indicator for unread items. Clears unread badge state on click and triggers custom handlers.

---

### Section 3.5: User Profile & Menu — `TopNavUserProfile.tsx`

Displays user avatar/initials badge, user name, and user role. On click, opens a dropdown menu with profile links and sign-out option.

---

### Section 3.6: Styling Tokens — `topNav.styles.ts`

Contains organized style functions and class maps using `cn` utility. Supports customizable style configurations through `TopNavStyleConfig`.

---

### Section 3.7: TypeScript Schema — `types.ts`

Provides type-safe definitions for all props, user attributes, style configurations, and item options.

---

## 4. 💡 Real-World Copy-Paste Recipes

### Recipe 1: Full Main Layout Integration

```tsx
import React, { useState } from "react";
import { Sidebar } from "@/shared/nav/Sidebar/Sidebar";
import { TopNav } from "@/shared/nav/TopNav/TopNav";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNav
          title="Overview"
          subtitle="System Performance & Analytics"
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onMobileMenuOpen={() => setIsMobileOpen(true)}
          onLogout={() => console.log("Logout")}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```
