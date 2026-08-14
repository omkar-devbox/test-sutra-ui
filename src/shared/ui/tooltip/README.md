# 📖 Complete Guide to `shared/ui/tooltip`

> **Target Audience**: Engineers & Designers alike. This document provides a **100% comprehensive, file-by-file, prop-by-prop breakdown** of the `Tooltip` component module, detailing how to use, customize, and extend it without prior codebase context.

---

## 📌 Table of Contents

1. [🚀 Quick Start](#1--quick-start)
2. [🗺️ Module Architecture & Directory Map](#2--module-architecture--directory-map)
3. [🧩 Section-by-Section File Breakdown](#3--section-by-section-file-breakdown)
   - [3.1 Main Orchestrator — `Tooltip.tsx`](#31-main-orchestrator--tooltiptsx)
   - [3.2 Trigger Subcomponent — `items/TooltipTrigger.tsx`](#32-trigger-subcomponent--itemstooltiptriggertsx)
   - [3.3 Content Subcomponent — `items/TooltipContent.tsx`](#33-content-subcomponent--itemstooltipcontenttsx)
   - [3.4 Style Tokens & Variants — `styles/tooltip.styles.ts`](#34-style-tokens--variants--stylestooltipstylests)
   - [3.5 Type Definitions — `types/tooltip.types.ts`](#35-type-definitions--typestooltiptypests)
4. [🛠️ API & Props Reference](#4%EF%B8%8F%E2%83%93-api--props-reference)
5. [🎨 Built-In Visual Variants & Custom Styling](#5%EF%B8%8F%E2%83%93-built-in-visual-variants--custom-styling)
6. [💡 Real-World Copy-Paste Recipes](#6%EF%B8%8F%E2%83%93-real-world-copy-paste-recipes)
7. [♿ Accessibility & Floating UI Features](#7%EF%B8%8F%E2%83%93-accessibility--floating-ui-features)

---

## 1. 🚀 Quick Start

Import `Tooltip` directly from `@/shared/ui` (or from `@/shared/ui/tooltip/Tooltip`).

```tsx
import { Tooltip } from "@/shared/ui";

export function Example() {
  return (
    <Tooltip content="Save your changes" placement="top">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </Tooltip>
  );
}
```

---

## 2. 🗺️ Module Architecture & Directory Map

The module is housed under `src/shared/ui/tooltip/`. Subcomponents are separated into `items/`, styles into `styles/`, and type contracts into `types/`.

```
src/shared/ui/tooltip/
├── Tooltip.tsx                 <-- 1. Main orchestrator component (Floating UI state)
├── items/                      <-- Subcomponents
│   ├── TooltipTrigger.tsx      <-- 2. Trigger wrapper & event binder
│   └── TooltipContent.tsx      <-- 3. Floating panel, arrow & portal renderer
├── styles/
│   └── tooltip.styles.ts       <-- 4. Variant classes & base styling tokens
├── types/
│   └── tooltip.types.ts        <-- 5. TypeScript prop interfaces & style contracts
└── README.md                   <-- 6. Complete module documentation
```

---

## 3. 🧩 Section-by-Section File Breakdown

### 3.1 Main Orchestrator — `Tooltip.tsx`

[Tooltip.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend/src/shared/ui/tooltip/Tooltip.tsx) is the entry-point component. It connects `@floating-ui/react` state hooks with the trigger and content components.

**Responsibilities:**
- Manages tooltip `open` state and `arrowEl` reference.
- Configures `useFloating` with middleware (`offsetMiddleware`, `flip`, `shift`, `arrow`, `autoUpdate`).
- Configures `useInteractions` with interaction hooks (`useHover`, `useFocus`, `useDismiss`, `useRole`).
- Evaluates early exit if `content` is missing (`!content => <>{children}</>`).
- Renders `<TooltipTrigger>` and conditional `<TooltipContent>`.

---

### 3.2 Trigger Subcomponent — `items/TooltipTrigger.tsx`

[TooltipTrigger.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend/src/shared/ui/tooltip/items/TooltipTrigger.tsx) wraps the target element (`children`) that triggers the tooltip on hover/focus.

**Props (`TooltipTriggerProps`):**
| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | The trigger element |
| `setReference` | `(node: HTMLElement \| null) => void` | Floating UI reference setter ref |
| `getReferenceProps` | `(userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>` | Interaction event attributes getter |
| `className` | `string` | Optional wrapper class override |

---

### 3.3 Content Subcomponent — `items/TooltipContent.tsx`

[TooltipContent.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend/src/shared/ui/tooltip/items/TooltipContent.tsx) renders the floating tooltip card using `FloatingPortal` and `@floating-ui/react`'s `FloatingArrow`.

**Key Capabilities:**
- Computes inline CSS custom variables (`--tt-bg`, `--tt-text`, `--tt-border`) via `resolvedStyles`.
- Applies base classes (`tooltipBaseStyles.panel`) and variant-specific styles (`tooltipVariants[variant].panel`).
- Renders `FloatingArrow` with matching SVG fill color when `showArrow` is `true`.
- Supports DOM portal rendering via `FloatingPortal` (can target specific `HTMLElement` or `document.body`).

---

### 3.4 Style Tokens & Variants — `styles/tooltip.styles.ts`

[tooltip.styles.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend/src/shared/ui/tooltip/styles/tooltip.styles.ts) provides centralized design system tokens and predefined visual variants.

**Available Variants (`TooltipVariant`):**
- `dark` *(default)*: Neutral dark background with white text.
- `light`: Clean white background with neutral border and shadow.
- `primary`: Uses primary theme tokens (`bg-primary text-primary-foreground`).
- `success`: Emerald green notification/status theme (`bg-emerald-600`).
- `warning`: Amber warning theme (`bg-amber-500`).
- `danger`: Destructive theme (`bg-destructive text-destructive-foreground`).
- `info`: Sky blue information theme (`bg-sky-500`).

---

### 3.5 Type Definitions — `types/tooltip.types.ts`

[tooltip.types.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend/src/shared/ui/tooltip/types/tooltip.types.ts) defines all TypeScript interfaces and props contracts.

```ts
export type TooltipVariant =
  | "dark"
  | "light"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface TooltipStyleConfig {
  bg?: string;
  text?: string;
  border?: string;
}
```

---

## 4. 🛠️ API & Props Reference

### `TooltipProps`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | *(Required)* | Trigger element that wraps tooltip target |
| `content` | `ReactNode` | `undefined` | Tooltip body text or React element |
| `placement` | `Placement` | `"top"` | Tooltip placement relative to trigger (`"top"`, `"bottom"`, `"left"`, `"right"`, `"top-start"`, etc.) |
| `offset` | `number` | `8` | Gap in pixels between trigger and tooltip panel |
| `variant` | `TooltipVariant` | `"dark"` | Color scheme (`"dark"`, `"light"`, `"primary"`, `"success"`, `"warning"`, `"danger"`, `"info"`) |
| `showArrow` | `boolean` | `true` | Toggles Floating UI SVG arrow indicator |
| `delay` | `number \| { open?: number; close?: number }` | `{ open: 200, close: 0 }` | Hover delay in ms before showing/hiding |
| `portal` | `boolean \| HTMLElement` | `true` | When `true`, renders via `FloatingPortal`. Specify custom `HTMLElement` root if needed. |
| `className` | `string` | `undefined` | Additional Tailwind CSS classes for the tooltip panel |
| `color` | `string` | `undefined` | Direct background color override (e.g. `#1e293b` or `var(--custom-color)`) |
| `textColor` | `string` | `undefined` | Direct text color override |
| `styleConfig` | `TooltipStyleConfig` | `undefined` | Fine-grained object to configure `{ bg, text, border }` |

---

## 5. 🎨 Built-In Visual Variants & Custom Styling

### Built-in Variants
```tsx
<Tooltip content="Dark theme" variant="dark"><button>Dark</button></Tooltip>
<Tooltip content="Light theme" variant="light"><button>Light</button></Tooltip>
<Tooltip content="Primary theme" variant="primary"><button>Primary</button></Tooltip>
<Tooltip content="Success theme" variant="success"><button>Success</button></Tooltip>
<Tooltip content="Warning theme" variant="warning"><button>Warning</button></Tooltip>
<Tooltip content="Danger theme" variant="danger"><button>Danger</button></Tooltip>
<Tooltip content="Info theme" variant="info"><button>Info</button></Tooltip>
```

### Custom Color Overrides
You can supply custom colors via direct props or `styleConfig`:

```tsx
// Direct prop override
<Tooltip content="Custom Purple" color="#7c3aed" textColor="#ffffff">
  <button>Custom</button>
</Tooltip>

// Using styleConfig
<Tooltip
  content="Configured Tooltip"
  styleConfig={{ bg: "#0f172a", text: "#38bdf8", border: "#1e293b" }}
>
  <button>Configured</button>
</Tooltip>
```

---

## 6. 💡 Real-World Copy-Paste Recipes

### Recipe 1: Icon Button Tooltip
```tsx
import { Tooltip } from "@/shared/ui";
import { Info } from "lucide-react";

export function InfoHelp() {
  return (
    <Tooltip content="Click here for detailed module guidelines" placement="right">
      <button className="p-2 text-slate-500 hover:text-slate-700">
        <Info className="w-5 h-5" />
      </button>
    </Tooltip>
  );
}
```

### Recipe 2: Custom HTML & Component Tooltip Content
```tsx
import { Tooltip } from "@/shared/ui";

export function RichContentTooltip() {
  const content = (
    <div className="flex flex-col gap-1 p-1">
      <p className="font-bold text-xs text-emerald-400">Pro Tip</p>
      <p className="text-xs text-slate-200">
        Use <kbd className="bg-slate-700 px-1 rounded">Ctrl + S</kbd> to save anytime.
      </p>
    </div>
  );

  return (
    <Tooltip content={content} variant="dark" offset={12}>
      <span className="cursor-pointer underline">Keyboard Shortcuts</span>
    </Tooltip>
  );
}
```

### Recipe 3: Non-Portal Inline Tooltip (Inside Modal/Scroll Containers)
```tsx
import { Tooltip } from "@/shared/ui";

export function InlineTooltip() {
  return (
    <Tooltip content="Positioned inside parent DOM node" portal={false}>
      <button>Inline Tooltip</button>
    </Tooltip>
  );
}
```

---

## 7. ♿ Accessibility & Floating UI Features

- **Keyboard Focus**: Automatically triggers on keyboard `focus` and closes on `blur`.
- **Keyboard Dismiss**: Closes automatically when pressing the `Escape` key (`useDismiss`).
- **Role Attributes**: Attaches `role="tooltip"` and ARIA accessibility properties (`useRole`).
- **Auto Positioning**: Automatically flips (`flip`) and shifts (`shift`) positions to avoid screen overflow.
- **Portalled Rendering**: Prevents parent overflow clipping (`overflow: hidden`) by rendering outside target hierarchies into `FloatingPortal`.
