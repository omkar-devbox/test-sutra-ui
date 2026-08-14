# 🏷️ Comprehensive Badge Component Documentation

Welcome to the complete guide for the **Badge UI Component** located at `@/shared/ui/Badge`.

This document explains everything you need to know about the `<Badge />` component in simple, easy-to-understand language. Whether you are a beginner or an experienced developer, this guide provides clear visual examples, practical code snippets, and complete API specifications.

---

## 📚 Table of Contents
1. [Overview & What is a Badge?](#-overview--what-is-a-badge)
2. [Key Features](#-key-features)
3. [Directory & Architectural Structure](#-directory--architectural-structure)
4. [Exhaustive API Reference](#-exhaustive-api-reference)
   - [Props Summary Table](#props-summary-table)
   - [Variants (`variant`)](#variants-variant)
   - [Sizes (`size`)](#sizes-size)
5. [In-Depth Code Recipes & Practical Examples](#-in-depth-code-recipes--practical-examples)
   - [Recipe 1: Standard Color Variants](#recipe-1-standard-color-variants)
   - [Recipe 2: Sizing Options (`sm`, `md`, `lg`)](#recipe-2-sizing-options-sm-md-lg)
   - [Recipe 3: Pill Shape vs Rounded Rectangle (`rounded`)](#recipe-3-pill-shape-vs-rounded-rectangle-rounded)
   - [Recipe 4: Notification Counters & Overflows (`count` & `maxCount`)](#recipe-4-notification-counters--overflows-count--maxcount)
   - [Recipe 5: Zero Counter Handling (`showZero`)](#recipe-5-zero-counter-handling-showzero)
   - [Recipe 6: Live Status Indicators (`dot` & `pulse`)](#recipe-6-live-status-indicators-dot--pulse)
   - [Recipe 7: Badges with Icons](#recipe-7-badges-with-icons)
   - [Recipe 8: Custom Theme Overrides (`theme`)](#recipe-8-custom-theme-overrides-theme)
   - [Recipe 9: Interactive Clickable Filter Tags](#recipe-9-interactive-clickable-filter-tags)
6. [Design System Tokens & Customization](#-design-system-tokens--customization)
7. [Best Practices & Accessibility](#-best-practices--accessibility)
8. [Troubleshooting & Frequently Asked Questions (FAQ)](#-troubleshooting--frequently-asked-questions-faq)

---

## 🌟 Overview & What is a Badge?

A **Badge** is a small visual label used to display short status updates, notification counts, tags, or state indicators. Badges help draw attention to specific items without cluttering the screen.

### Common Uses:
- 📩 **Notification Counter**: Displaying unread messages or notifications (e.g. `99+`).
- 🟢 **Live Status Dot**: Showing online/offline user status or service health.
- 🏷️ **Category Tags**: Labeling items as "New", "Pro", "Draft", or "Verified".
- ⚠️ **Alert Banners**: Highlighting success, danger, warning, or informative messages.

---

## ✨ Key Features

- 🎨 **5 Built-in Color Variants**: `default`, `success`, `danger`, `warning`, `info`.
- 📐 **3 Sizes**: Small (`sm`), Medium (`md`), Large (`lg`).
- 🔢 **Smart Notification Counter**: Automatic overflow formatting (`99+`) and zero-value hiding logic.
- 🔴 **Live Pulse Dot**: Pulsing ping animation for real-time alerts.
- 🎯 **Icon Support**: Supports leading React icons with smart spacing.
- 🌙 **Dark Mode Support**: Pre-configured Tailwind dark mode styling.
- 🖌️ **Theme Customization**: Easily override styles with the `theme` prop or Tailwind CSS classes.

---

## 📁 Directory & Architectural Structure

The Badge component follows a clean separation of concerns within `src/shared/ui/Badge`:

```text
src/shared/ui/Badge/
├── index.ts           # Central public export barrel
├── README.md          # Easy-to-understand documentation (this file)
├── items/
│   └── Badge.tsx      # Main React component implementation & logic
└── style/
    └── style.ts       # Shared Tailwind CSS style definitions and variant mappings
```

---

## 📋 Exhaustive API Reference

### Import:
```tsx
import { Badge } from "@/shared/ui/Badge";
```

### Props Summary Table:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'default' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'default'` | Determines the background and text color scheme. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls font size, padding, and minimum dimensions. |
| `rounded` | `boolean` | `false` | If `true`, applies `rounded-full` (pill shape). If `false`, applies `rounded-md`. |
| `dot` | `boolean` | `false` | Renders a small colored dot on the left side of the badge. |
| `pulse` | `boolean` | `false` | Adds an animated ping effect behind the dot indicator (requires `dot={true}`). |
| `count` | `number` | `undefined` | Displays a number inside the badge. Automatically hides when `0` unless `showZero` is true. |
| `maxCount` | `number` | `99` | Maximum number to display before truncating to `${maxCount}+`. |
| `showZero` | `boolean` | `false` | Forces the badge to show even when `count={0}`. |
| `icon` | `React.ReactNode` | `undefined` | Optional icon element rendered inside the badge. |
| `theme` | `Partial<Record<BadgeVariant, string>>` | `{}` | Custom Tailwind class overrides per variant. |
| `className` | `string` | `undefined` | Custom CSS class names merged into the root element. |
| `children` | `React.ReactNode` | `undefined` | Custom text label or content rendered inside the badge. |

---

### Variants (`variant`)

| Variant | Best Used For | Text / Background Scheme |
| :--- | :--- | :--- |
| `default` | General labels, neutral tags | Neutral grey border & dark text |
| `success` | Active, published, completed tasks | Soft green background & vibrant green text |
| `danger` | High priority, errors, failed states | Light red background & dark red text |
| `warning` | Pending, review required, warnings | Soft amber background & warm amber text |
| `info` | News, tips, system info | Soft blue background & primary blue text |

---

### Sizes (`size`)

| Size | Minimum Dimensions | Font Size | Padding |
| :--- | :--- | :--- | :--- |
| `sm` | `18px × 18px` | `10px` | `px-1.5 py-0.5` |
| `md` | `22px × 22px` | `12px` (`text-xs`) | `px-2 py-1` |
| `lg` | `26px × 26px` | `14px` (`text-sm`) | `px-2.5 py-1.5` |

---

## 💡 In-Depth Code Recipes & Practical Examples

### Recipe 1: Standard Color Variants

Use color variants to express different states:

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const StatusBadgeDemo = () => {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="info">New Feature</Badge>
    </div>
  );
};
```

---

### Recipe 2: Sizing Options (`sm`, `md`, `lg`)

Adjust badge size depending on where it is used (e.g. table rows vs page headers):

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const SizeDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <Badge size="sm" variant="info">Small (18px)</Badge>
      <Badge size="md" variant="info">Medium (22px)</Badge>
      <Badge size="lg" variant="info">Large (26px)</Badge>
    </div>
  );
};
```

---

### Recipe 3: Pill Shape vs Rounded Rectangle (`rounded`)

Toggle between rounded corners (`rounded-md`) and fully rounded pills (`rounded-full`):

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const ShapeDemo = () => {
  return (
    <div className="flex gap-3">
      <Badge rounded={false} variant="success">Standard Box</Badge>
      <Badge rounded={true} variant="success">Rounded Pill</Badge>
    </div>
  );
};
```

---

### Recipe 4: Notification Counters & Overflows (`count` & `maxCount`)

Use `count` to display numerical notifications. High numbers automatically show overflow formatting (`99+` by default):

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const NotificationDemo = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Displays: 5 */}
      <Badge count={5} variant="danger" rounded />

      {/* Displays: 99+ (because count exceeds default maxCount of 99) */}
      <Badge count={120} variant="danger" rounded />

      {/* Displays: 10+ (custom maxCount of 10) */}
      <Badge count={25} maxCount={10} variant="danger" rounded />
    </div>
  );
};
```

---

### Recipe 5: Zero Counter Handling (`showZero`)

By default, when `count={0}`, the Badge will **not render anything** (returns `null`). Set `showZero={true}` if you want `0` to stay visible:

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const ZeroCountDemo = () => {
  return (
    <div className="flex gap-4">
      {/* Renders nothing */}
      <Badge count={0} variant="default" />

      {/* Renders badge with "0" */}
      <Badge count={0} showZero variant="default" />
    </div>
  );
};
```

---

### Recipe 6: Live Status Indicators (`dot` & `pulse`)

Display real-time system status indicators. Set `pulse={true}` to show a live animated radar ping effect:

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const StatusIndicatorDemo = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Static Green Dot */}
      <Badge dot variant="success">Online</Badge>

      {/* Pulsing Red Warning Dot */}
      <Badge dot pulse variant="danger">Live Alert</Badge>

      {/* Standalone Dot (No Text Label) */}
      <Badge dot pulse variant="warning" rounded />
    </div>
  );
};
```

---

### Recipe 7: Badges with Icons

Pass an icon to the `icon` prop to add visual context:

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export const IconBadgeDemo = () => {
  return (
    <div className="flex gap-3">
      <Badge variant="success" icon={<CheckCircle className="w-3.5 h-3.5" />}>
        Verified
      </Badge>

      <Badge variant="warning" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
        Needs Review
      </Badge>

      {/* Icon Only Badge */}
      <Badge variant="info" icon={<ShieldCheck className="w-4 h-4" />} />
    </div>
  );
};
```

---

### Recipe 8: Custom Theme Overrides (`theme`)

Override variant styles on specific instances without altering global style files:

```tsx
import React from "react";
import { Badge } from "@/shared/ui/Badge";

export const CustomThemeDemo = () => {
  return (
    <Badge
      variant="info"
      theme={{
        info: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      }}
    >
      Custom Purple Badge
    </Badge>
  );
};
```

---

### Recipe 9: Interactive Clickable Filter Tags

Add standard HTML attributes like `onClick` to create selectable tag filters:

```tsx
import React, { useState } from "react";
import { Badge } from "@/shared/ui/Badge";

export const TagFilterDemo = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const tags = ["All", "React", "TypeScript", "Tailwind", "Next.js"];

  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTag === tag ? "info" : "default"}
          rounded
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setSelectedTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
```

---

## 🎨 Design System Tokens & Customization

All default Tailwind CSS classes are stored cleanly inside `src/shared/ui/Badge/style/style.ts`.

```typescript
export type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export const badgeVariantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-border text-text-primary dark:bg-neutral-bg dark:text-text-primary',
  success: 'bg-success-light text-success dark:bg-success/20 dark:text-success-light',
  danger:  'bg-error-bg text-error dark:bg-error/20 dark:text-error-bg',
  warning: 'bg-warning-light text-warning dark:bg-warning/20 dark:text-warning-light',
  info:    'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90',
};
```

If you need to change project-wide badge colors, edit `style.ts` directly.

---

## ♿ Best Practices & Accessibility

1. **Accessibility (`aria-label`)**: When using the `count` prop, the Badge automatically attaches `aria-label="${count} notifications"` to support screen readers.
2. **Color Contrast**: Always choose badge colors that maintain high contrast against their background.
3. **Keep Text Concise**: Badges work best with short 1-2 word status labels or single numbers.
4. **Use `dot` for Live States**: Combine `dot` and `pulse` for active live alerts (e.g. system status, live streams).

---

## ❓ Troubleshooting & Frequently Asked Questions (FAQ)

### Q1: Why is my badge not showing when `count={0}`?
**Answer**: By default, `count={0}` hides the badge to avoid cluttering notification icons. If you want `0` to display, pass `showZero={true}`:
```tsx
<Badge count={0} showZero />
```

### Q2: How do I change the overflow limit from `99+` to `9+`?
**Answer**: Set the `maxCount` prop:
```tsx
<Badge count={15} maxCount={9} /> {/* Displays: 9+ */}
```

### Q3: How do I make the badge round like a pill?
**Answer**: Pass the `rounded` boolean prop:
```tsx
<Badge rounded>Pill Badge</Badge>
```

### Q4: Can I use custom CSS classes?
**Answer**: Yes! Pass any standard Tailwind CSS class using `className`:
```tsx
<Badge className="shadow-lg border border-indigo-200">Custom Styled</Badge>
```

---

## 📄 License & System Info
Part of the **CVForge UI Component Architecture**. Built with React, TypeScript, and Tailwind CSS.
