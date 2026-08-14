# 🔘 Comprehensive Button Component Documentation

Welcome to the complete, step-by-step guide for the **Button UI Component** located at `@/shared/ui/button`.

This document explains how to use the `<Button />` component in simple, clear language with beginner-friendly explanations, visual recipes, and comprehensive technical specifications.

---

## 📚 Table of Contents
1. [Overview & What is the Button Component?](#-overview--what-is-the-button-component)
2. [Key Features](#-key-features)
3. [Directory & Architectural Structure](#-directory--architectural-structure)
4. [Exhaustive API Reference](#-exhaustive-api-reference)
   - [Button Props Summary Table](#button-props-summary-table)
   - [Variants (`variant`)](#variants-variant)
   - [Sizes (`size`)](#sizes-size)
   - [Dynamic Style Configuration (`styleConfig`)](#dynamic-style-configuration-styleconfig)
5. [In-Depth Code Recipes & Practical Examples](#-in-depth-code-recipes--practical-examples)
   - [Recipe 1: Standard Visual Variants](#recipe-1-standard-visual-variants)
   - [Recipe 2: Sizing Options (`sm`, `md`, `lg`)](#recipe-2-sizing-options-sm-md-lg)
   - [Recipe 3: Adding Icons (`leftIcon` & `rightIcon`)](#recipe-3-adding-icons-lefticon--righticon)
   - [Recipe 4: Async Loading State (`isLoading`)](#recipe-4-async-loading-state-isloading)
   - [Recipe 5: Full Width Buttons (`fullWidth`)](#recipe-5-full-width-buttons-fullwidth)
   - [Recipe 6: Polymorphic Link Button using `asChild`](#recipe-6-polymorphic-link-button-using-aschild)
   - [Recipe 7: Custom Dynamic Styling with `styleConfig`](#recipe-7-custom-dynamic-styling-with-styleconfig)
   - [Recipe 8: Form Submission with Loading Feedback](#recipe-8-form-submission-with-loading-feedback)
6. [Design System Tokens & CVA Integration](#-design-system-tokens--cva-integration)
7. [Best Practices & Accessibility](#-best-practices--accessibility)
8. [Troubleshooting & Frequently Asked Questions (FAQ)](#-troubleshooting--frequently-asked-questions-faq)

---

## 🌟 Overview & What is the Button Component?

The **Button** component is the core interactive element used throughout the application to trigger actions, submit forms, open dialogs, or navigate between pages.

It is built with **Class Variance Authority (CVA)** for performant style variants, **Radix UI Slot** for flexible component polymorphism, and **Lucide React** for animated loading spinners.

### Common Uses:
- 🚀 **Primary Actions**: Main calls-to-action such as "Save CV", "Publish", or "Create Project".
- 🗑️ **Destructive Actions**: Irreversible commands like "Delete Account" or "Remove Item".
- 🔍 **Secondary & Ghost Actions**: Subdued buttons for "Cancel", "Back", or "Filter".
- 🔗 **Polymorphic Navigation Links**: Rendering buttons visually as links using React Router or native `<a>` tags.
- ⏳ **Async Feedback**: Showing loading state spinners while network calls are in progress.

---

## ✨ Key Features

- 🎨 **5 Visual Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- 📐 **3 Sizes**: Small (`sm`), Medium (`md`), Large (`lg`).
- ↔️ **Full Width Support**: Easily make buttons expand to `100%` container width.
- ⏳ **Integrated Spinner Loader**: Built-in `isLoading` prop automatically disables clicks, hides button text cleanly, and displays a centered spinning loader.
- ⬅️ ➡️ **Left & Right Icon Slots**: Dedicated `leftIcon` and `rightIcon` props with automatic spacing and scaling.
- 🔗 **Polymorphic Rendering (`asChild`)**: Render as an `<a>` tag or React Router `<Link>` while retaining full button styling via `@radix-ui/react-slot`.
- 🎨 **CSS Variable Theme Injection (`styleConfig`)**: Pass dynamic inline styles for custom background, hover, active, border, and text colors.
- ♿ **Keyboard & Focus Accessible**: Native focus ring highlights (`focus-visible:ring-2`) and automatic `aria-disabled` management.

---

## 📁 Directory & Architectural Structure

The Button package is modularly organized inside `src/shared/ui/button`:

```text
src/shared/ui/button/
├── index.ts                 # Central public API exports barrel
├── README.md                # In-depth usage documentation (this file)
├── Button.tsx               # Main React forwardRef & memoized component logic
├── styles/
│   └── button.styles.ts     # CVA variant definitions & Tailwind CSS class strings
└── types/
    └── button.types.ts      # TypeScript interfaces (ButtonProps & ButtonStyleConfig)
```

---

## 📋 Exhaustive API Reference

### Import:
```tsx
import { Button, type ButtonProps, type ButtonStyleConfig } from "@/shared/ui/button";
```

### Button Props Summary Table:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style scheme of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height, horizontal padding, and font size. |
| `fullWidth` | `boolean` | `false` | If `true`, button expands to occupy `100%` width of parent container (`w-full`). |
| `isLoading` | `boolean` | `false` | Shows centered spinning loader, hides text/icons, and disables user interaction. |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon element rendered before the button label text. |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon element rendered after the button label text. |
| `asChild` | `boolean` | `false` | Merges button styles and props onto its direct child element (e.g. Radix Slot). |
| `disabled` | `boolean` | `false` | Disables user interaction and lowers opacity. |
| `styleConfig` | `ButtonStyleConfig` | `undefined` | Object mapping custom CSS variables to override colors dynamically. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native HTML button type attribute. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes merged into the root element. |
| `children` | `React.ReactNode` | `undefined` | Button content/label. |

---

### Variants (`variant`)

| Variant | Appearance | Recommended Usage |
| :--- | :--- | :--- |
| `primary` | Solid brand blue with subtle shadow | Main primary action on a page (e.g. "Save", "Submit"). |
| `secondary` | Light zinc grey background | Secondary supporting actions (e.g. "Cancel", "Back"). |
| `outline` | Bordered white container | Alternative neutral actions (e.g. "Export", "Download"). |
| `ghost` | Transparent background, subtle hover | Low priority actions or toolbar icons (e.g. "Close", "More"). |
| `danger` | Solid red background | Destructive operations (e.g. "Delete", "Revoke"). |

---

### Sizes (`size`)

| Size | Height | Horizontal Padding | Font Size | Icon Size |
| :--- | :--- | :--- | :--- | :--- |
| `sm` | `32px` (`h-8`) | `12px` (`px-3`) | `12px` | `14px` |
| `md` | `36px` (`h-9`) | `16px` (`px-4`) | `13px` | `14px` |
| `lg` | `44px` (`h-11`) | `24px` (`px-6`) | `14px` | `14px` |

---

### Dynamic Style Configuration (`styleConfig`)

The `styleConfig` prop allows passing dynamic color overrides via CSS custom properties:

```typescript
export interface ButtonStyleConfig {
  bg?: string;           // Maps to --btn-bg
  text?: string;         // Maps to --btn-text
  border?: string;       // Maps to --btn-border
  hoverBg?: string;      // Maps to --btn-hoverBg
  hoverText?: string;    // Maps to --btn-hoverText
  activeBg?: string;     // Maps to --btn-activeBg
  disabledBg?: string;   // Maps to --btn-disabledBg
  disabledText?: string; // Maps to --btn-disabledText
}
```

---

## 💡 In-Depth Code Recipes & Practical Examples

### Recipe 1: Standard Visual Variants

Render all built-in button styles:

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";

export const VariantsDemo = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete Item</Button>
    </div>
  );
};
```

---

### Recipe 2: Sizing Options (`sm`, `md`, `lg`)

Adjust button heights according to context (e.g., tight toolbar vs hero section):

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";

export const SizeDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (36px)</Button>
      <Button size="lg">Large (44px)</Button>
    </div>
  );
};
```

---

### Recipe 3: Adding Icons (`leftIcon` & `rightIcon`)

Enhance clarity by attaching Lucide React icons:

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";
import { Plus, ArrowRight, Download } from "lucide-react";

export const IconDemo = () => {
  return (
    <div className="flex gap-3">
      {/* Icon on the left */}
      <Button leftIcon={<Plus />}>New Project</Button>

      {/* Icon on the right */}
      <Button rightIcon={<ArrowRight />}>Continue</Button>

      {/* Both Icons */}
      <Button variant="outline" leftIcon={<Download />} rightIcon={<ArrowRight />}>
        Export Data
      </Button>
    </div>
  );
};
```

---

### Recipe 4: Async Loading State (`isLoading`)

When performing asynchronous data fetching or form submissions, set `isLoading={true}`. The button will automatically hide its content, disable clicks, and display a spinning loader icon:

```tsx
import React, { useState } from "react";
import { Button } from "@/shared/ui/button";

export const LoadingDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button isLoading={loading} onClick={handleClick} variant="primary">
      Save Changes
    </Button>
  );
};
```

---

### Recipe 5: Full Width Buttons (`fullWidth`)

Expand buttons to match the parent container's width (ideal for mobile screens or card footers):

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";

export const FullWidthDemo = () => {
  return (
    <div className="max-w-sm p-4 border rounded-xl space-y-3">
      <h3 className="font-bold">Sign In to Sutra-ui</h3>
      <Button fullWidth variant="primary">
        Continue with Email
      </Button>
      <Button fullWidth variant="outline">
        Continue with Google
      </Button>
    </div>
  );
};
```

---

### Recipe 6: Polymorphic Link Button using `asChild`

When you want a link (`<a>` or React Router `<Link>`) to look like a button, set `asChild={true}` and wrap your link inside:

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

export const PolymorphicDemo = () => {
  return (
    <div className="flex gap-3">
      {/* Rendered as React Router <Link> */}
      <Button asChild variant="primary">
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>

      {/* Rendered as external <a> tag */}
      <Button asChild variant="outline">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          View GitHub Repository
        </a>
      </Button>
    </div>
  );
};
```

---

### Recipe 7: Custom Dynamic Styling with `styleConfig`

Inject custom colors on-the-fly without defining new CSS classes:

```tsx
import React from "react";
import { Button } from "@/shared/ui/button";

export const CustomStyleConfigDemo = () => {
  return (
    <Button
      styleConfig={{
        bg: "#8b5cf6",
        text: "#ffffff",
        hoverBg: "#7c3aed",
        activeBg: "#6d28d9",
      }}
    >
      Custom Purple Accent Button
    </Button>
  );
};
```

---

### Recipe 8: Form Submission with Loading Feedback

Use inside standard HTML forms with `type="submit"`:

```tsx
import React, { useState } from "react";
import { Button } from "@/shared/ui/button";

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xs">
      <input
        type="email"
        placeholder="Enter your email"
        required
        className="w-full p-2 border rounded-md"
      />
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Submit Login
      </Button>
    </form>
  );
};
```

---

## 🎨 Design System Tokens & CVA Integration

Button styles are defined using `class-variance-authority` (CVA) inside `src/shared/ui/button/styles/button.styles.ts`:

```typescript
export const buttonVariants = cva(
  `relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-medium transition-all
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 cursor-pointer
  bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)]
  hover:bg-[var(--btn-hoverBg)] hover:text-[var(--btn-hoverText)]
  active:scale-[0.98]
  disabled:bg-[var(--btn-disabledBg)] disabled:text-[var(--btn-disabledText)]
  data-[loading=true]:text-transparent data-[loading=true]:[&>svg:not(.loader)]:opacity-0`,
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white hover:bg-blue-600 dark:hover:bg-blue-500 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
        outline: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900",
        ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
      },
      size: {
        sm: "h-8 px-3 text-[12px]",
        md: "h-9 px-4",
        lg: "h-11 px-6 text-[14px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

---

## ♿ Best Practices & Accessibility

1. **Accessibility (`aria-disabled`)**: When `isLoading` or `disabled` is true, the button automatically receives `disabled={true}` and `aria-disabled="true"`.
2. **Keyboard Focus Ring**: Focus states are handled automatically via `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
3. **Loading Text Concealment**: When loading, text becomes transparent (`data-[loading=true]:text-transparent`) and icons vanish (`opacity-0`), maintaining identical dimensions so the UI doesn't shift unexpectedly.
4. **Use `asChild` for Links**: Always use `asChild` when rendering links as buttons rather than embedding onClick navigation handlers on a `<button>`.

---

## ❓ Troubleshooting & Frequently Asked Questions (FAQ)

### Q1: Why is my button click handler firing while loading?
**Answer**: When `isLoading={true}` is set, the button automatically receives `disabled={true}` and `disabled:pointer-events-none`, which prevents all click events.

### Q2: How do I render a button as a React Router `<Link>`?
**Answer**: Pass `asChild={true}` to `<Button>` and place your `<Link>` as the direct child:
```tsx
<Button asChild>
  <Link to="/home">Go Home</Link>
</Button>
```

### Q3: How do I change button height or custom padding?
**Answer**: Pass standard Tailwind utility classes using `className`:
```tsx
<Button className="h-12 px-8 text-base">Custom Size Button</Button>
```

### Q4: Can I use standard HTML attributes like `title` or `aria-label`?
**Answer**: Yes! `<Button />` extends native `HTMLButtonElement` attributes, so all standard HTML button props are fully supported.

---

## 📄 License & System Info
Part of the **Sutra-ui UI Component Architecture**. Built with React, Radix UI Slot, Class Variance Authority (CVA), and Lucide React.
