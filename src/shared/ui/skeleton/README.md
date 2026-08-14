# 🦴 In-Depth Skeleton UI System Architecture & Usage Guide

Welcome to the comprehensive, in-depth technical documentation for the **Skeleton UI Component System** located at `@/shared/ui/skeleton`.

This guide covers everything from beginner usage to advanced component composition, architectural design decisions, accessibility compliance, performance optimization, and API specifications.

---

## 📚 Table of Contents
1. [Overview & Philosophy](#-overview--philosophy)
2. [Directory & Architectural Structure](#-directory--architectural-structure)
3. [Key Concepts & Features](#-key-concepts--features)
   - [Animations Engine](#1-animation-engine)
   - [Staggered Delay Effects](#2-staggered-delay-effects)
   - [Accessibility & Reduced Motion](#3-accessibility--reduced-motion)
   - [Dark Mode & Theming](#4-dark-mode--theming)
4. [Exhaustive Component API Reference](#-exhaustive-component-api-reference)
   - [`<Skeleton />` (Base Primitive)](#1-skeleton-base-primitive)
   - [`<SkeletonText />`](#2-skeletontext)
   - [`<SkeletonAvatar />`](#3-skeletonavatar)
   - [`<SkeletonButton />`](#4-skeletonbutton)
   - [`<SkeletonCard />`](#5-skeletoncard)
   - [`<SkeletonTable />`](#6-skeletontable)
   - [`<SkeletonWrapper />`](#7-skeletonwrapper)
5. [In-Depth Code Recipes & Usage Examples](#-in-depth-code-recipes--usage-examples)
   - [Recipe 1: Simple Rectangles, Circles & Custom Shapes](#recipe-1-simple-rectangles-circles--custom-shapes)
   - [Recipe 2: Natural Paragraph Text Loading](#recipe-2-natural-paragraph-text-loading)
   - [Recipe 3: Profile Header Placeholder](#recipe-3-profile-header-placeholder)
   - [Recipe 4: Dashboard Metric Stat Cards](#recipe-4-dashboard-metric-stat-cards)
   - [Recipe 5: Data Table Grid Loader](#recipe-5-data-table-grid-loader)
   - [Recipe 6: Form Skeleton Loader](#recipe-6-form-skeleton-loader)
   - [Recipe 7: Conditional State Crossfade with SkeletonWrapper](#recipe-7-conditional-state-crossfade-with-skeletonwrapper)
   - [Recipe 8: Custom Colors & Shimmer Timing (styleConfig)](#recipe-8-custom-colors--shimmer-timing-styleconfig)
6. [Best Practices & CLS Optimization](#-best-practices--cls-optimization)
7. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview & Philosophy

Skeleton loaders replace traditional loading spinners by rendering a lightweight, shimmer-animated representation of the UI while asynchronous data is being fetched.

### Key Benefits:
- **Reduces Cumulative Layout Shift (CLS)**: Reserving layout space upfront prevents elements from hopping around as images and text load.
- **Improves Perceived Performance**: Users register the interface structure immediately, making network latency feel significantly lower.
- **Design System Integration**: Powered by `class-variance-authority` (cva) and Tailwind CSS for seamless design token alignment.

---

## 📁 Directory & Architectural Structure

The Skeleton module is organized inside `src/shared/ui/skeleton`:

```text
src/shared/ui/skeleton/
├── index.ts                     # Main entry export point
├── README.md                    # Comprehensive documentation (this file)
├── types/
│   └── skeleton.types.ts        # TypeScript interfaces and type definitions
├── styles/
│   └── skeleton.styles.ts       # CVA variant configuration & keyframe styles
└── items/
    ├── Skeleton.tsx             # Core base primitive & ContentSkeleton preview
    ├── SkeletonText.tsx         # Multi-line text paragraph preset
    ├── SkeletonAvatar.tsx       # Circular/square avatar preset with badge support
    ├── SkeletonButton.tsx       # Size-proportional button preset
    ├── SkeletonCard.tsx         # Composite media/user feed card preset
    ├── SkeletonTable.tsx        # Tabular data grid preset
    └── SkeletonWrapper.tsx      # High-order conditional loading wrapper
```

---

## ⚡ Key Concepts & Features

### 1. Animation Engine
The system supports four distinct animation states defined in `SkeletonAnimation`:

- **`shimmer`** *(Default)*: Smooth linear sweep gradient overlay moving left-to-right.
- **`pulse`**: Gentle opacity oscillation (`animate-pulse`). Ideal for subtle background updates.
- **`wave`**: Dynamic ease-in-out shimmer sweep with custom cubic-bezier timing.
- **`none`**: Static placeholder without animation (useful for low-power devices or offline states).

### 2. Staggered Delay Effects
When displaying multiple skeleton items in sequence (e.g., list items or grid cards), setting `staggerIndex` applies an incremental CSS `animationDelay`:
$$\text{delay} = \text{staggerIndex} \times 100\text{ms}$$
This produces a pleasant "wave" motion across the page rather than all items shimmering synchronously.

### 3. Accessibility & Reduced Motion
- **Screen Readers**: Renders `role="status"`, `aria-busy="true"`, `aria-live="polite"`, and an accessible hidden label (`<span className="sr-only">Loading...</span>`).
- **Motion Sensitivity**: Uses Tailwind's `motion-reduce:` variants (`motion-reduce:after:hidden motion-reduce:animate-pulse`) to automatically disable fast shimmer sweep animations for users who have requested reduced motion in their system settings.

### 4. Dark Mode & Theming
All variants are dark-mode ready out of the box using semi-transparent neutral colors:
- Light surface: `bg-neutral-200/70` with highlight `rgba(255, 255, 255, 0.45)`
- Dark surface: `dark:bg-neutral-800/70` with highlight `rgba(255, 255, 255, 0.07)`

---

## 📖 Exhaustive Component API Reference

### 1. `<Skeleton />` (Base Primitive)

The underlying component that powers all presets. Use this when custom dimensions or shapes are needed.

```tsx
import { Skeleton } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'rect' \| 'circle' \| 'text' \| 'square' \| 'button' \| 'badge'` | `'rect'` | Sets the base visual shape. |
| `animation` | `'shimmer' \| 'pulse' \| 'wave' \| 'none'` | `'shimmer'` | Animation style. |
| `width` | `string \| number` | `undefined` | Width in pixels (number) or CSS string (`'100%'`, `'4rem'`). |
| `height` | `string \| number` | `undefined` | Height in pixels (number) or CSS string (`'20px'`, `'100%'`). |
| `borderRadius` | `string \| number` | `undefined` | Shortcut to override border-radius (e.g. `8` or `'12px'`). |
| `count` | `number` | `1` | Renders $N$ stacked skeletons vertically inside a flex column with gap. |
| `staggerIndex` | `number` | `undefined` | Wave animation delay multiplier index ($N \times 100\text{ms}$). |
| `ariaLabel` | `string` | `"Loading..."` | Accessible label for screen readers. |
| `styleConfig` | `SkeletonStyleConfig` | `undefined` | Object specifying `baseColor`, `highlightColor`, `borderRadius`, `duration`, `aspectRatio`. |
| `className` | `string` | `""` | Additional Tailwind utility classes. |
| `style` | `React.CSSProperties` | `undefined` | Inline style overrides. |

---

### 2. `<SkeletonText />`

Renders realistic paragraph loading blocks with randomized or custom line lengths.

```tsx
import { SkeletonText } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonTextProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `lines` | `number` | `3` | Total number of text skeleton lines to render. |
| `gap` | `string \| number` | `'0.5rem'` | Vertical gap spacing between lines. |
| `lastLineWidth` | `string \| number` | `undefined` | Explicit width for the last line (e.g. `'40%'`). |
| `randomizeWidths` | `boolean` | `true` | Varies line lengths (`100%`, `92%`, `96%`, `85%`) for natural look. |
| `height` | `string \| number` | `'1em'` | Height of each text line. |
| `animation` | `SkeletonAnimation` | `'shimmer'` | Animation style. |

---

### 3. `<SkeletonAvatar />`

Avatar skeleton for user profiles and list items.

```tsx
import { SkeletonAvatar } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonAvatarProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `string \| number` | `40` | Diameter/size of avatar (px number or CSS string). |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape frame variant. |
| `hasBadge` | `boolean` | `false` | Renders a small circular badge placeholder at the bottom-right. |
| `animation` | `SkeletonAnimation` | `'shimmer'` | Animation style. |

---

### 4. `<SkeletonButton />`

Button loading placeholder proportioned to standard UI button sizes.

```tsx
import { SkeletonButton } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonButtonProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset: `sm` (h-8, w-20), `md` (h-10, w-24), `lg` (h-12, w-32). |
| `fullWidth` | `boolean` | `false` | Forces button width to `100%`. |
| `animation` | `SkeletonAnimation` | `'shimmer'` | Animation style. |

---

### 5. `<SkeletonCard />`

Pre-configured layout card containing header, optional image media, text paragraph, and action footer.

```tsx
import { SkeletonCard } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonCardProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `hasAvatar` | `boolean` | `true` | Renders avatar placeholder in header. |
| `hasImage` | `boolean` | `false` | Renders a media image container at the top. |
| `imageHeight` | `string \| number` | `160` | Height of top image container if `hasImage` is true. |
| `lines` | `number` | `3` | Number of content text lines. |
| `hasActions` | `boolean` | `true` | Renders bottom action button footer. |
| `animation` | `SkeletonAnimation` | `'shimmer'` | Animation style. |
| `className` | `string` | `""` | Outer container class overrides. |

---

### 6. `<SkeletonTable />`

Tabular grid loading placeholder simulating data table rows and columns.

```tsx
import { SkeletonTable } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonTableProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `rows` | `number` | `5` | Number of table body rows. |
| `cols` | `number` | `4` | Number of columns per row. |
| `showHeader` | `boolean` | `true` | Renders styled table header row. |
| `animation` | `SkeletonAnimation` | `'shimmer'` | Animation style. |
| `className` | `string` | `""` | Table container class overrides. |

---

### 7. `<SkeletonWrapper />`

Higher-order wrapper that manages crossfading between skeleton fallback and real content based on `loading`.

```tsx
import { SkeletonWrapper } from "@/shared/ui/skeleton";
```

#### Props Specification (`SkeletonWrapperProps`):

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `loading` | `boolean` | *(Required)* | Current loading state (`true` shows fallback, `false` shows children). |
| `fallback` | `React.ReactNode` | `undefined` | React node rendered when `loading` is true. |
| `children` | `React.ReactNode` | `undefined` | Real content node rendered when `loading` is false. |
| `className` | `string` | `""` | Outer wrapper container styling. |

---

## 💻 In-Depth Code Recipes & Usage Examples

### Recipe 1: Simple Rectangles, Circles & Custom Shapes

```tsx
import React from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const BasicShapesExample = () => (
  <div className="space-y-4 p-4">
    {/* Rectangular banner */}
    <Skeleton variant="rect" height={120} className="w-full rounded-xl" />

    {/* Circular icon */}
    <Skeleton variant="circle" width={64} height={64} />

    {/* Square aspect ratio block */}
    <Skeleton variant="square" width={100} />

    {/* Stacked sequence with count */}
    <Skeleton count={4} variant="text" />
  </div>
);
```

---

### Recipe 2: Natural Paragraph Text Loading

```tsx
import React from "react";
import { SkeletonText } from "@/shared/ui/skeleton";

export const ArticleTextSkeleton = () => (
  <div className="max-w-xl p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
    <h3 className="text-sm font-semibold mb-4 text-neutral-400">Loading Article...</h3>
    
    {/* 5-line paragraph with 40% final line width */}
    <SkeletonText 
      lines={5} 
      gap="0.75rem" 
      lastLineWidth="40%" 
      randomizeWidths={true} 
    />
  </div>
);
```

---

### Recipe 3: Profile Header Placeholder

```tsx
import React from "react";
import { SkeletonAvatar, Skeleton, SkeletonButton } from "@/shared/ui/skeleton";

export const ProfileHeaderSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
    <div className="flex items-center space-x-4">
      {/* Avatar with status badge dot */}
      <SkeletonAvatar size={56} shape="circle" hasBadge={true} />
      
      <div className="space-y-2">
        <Skeleton variant="text" width={160} height={18} />
        <Skeleton variant="text" width={100} height={14} />
      </div>
    </div>

    {/* Action button skeleton */}
    <SkeletonButton size="sm" />
  </div>
);
```

---

### Recipe 4: Dashboard Metric Stat Cards

```tsx
import React from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((item, index) => (
      <div 
        key={item} 
        className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3"
      >
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="50%" height={14} staggerIndex={index} />
          <Skeleton variant="circle" width={24} height={24} staggerIndex={index} />
        </div>
        <Skeleton variant="text" width="75%" height={32} staggerIndex={index} />
        <Skeleton variant="text" width="35%" height={12} staggerIndex={index} />
      </div>
    ))}
  </div>
);
```

---

### Recipe 5: Data Table Grid Loader

```tsx
import React from "react";
import { SkeletonTable } from "@/shared/ui/skeleton";

export const UsersTableSkeleton = () => (
  <div className="p-6">
    <h2 className="text-lg font-bold mb-4">Users Directory</h2>
    
    {/* Renders a 6-row, 5-column table skeleton with header */}
    <SkeletonTable rows={6} cols={5} showHeader={true} animation="shimmer" />
  </div>
);
```

---

### Recipe 6: Form Skeleton Loader

```tsx
import React from "react";
import { Skeleton, SkeletonButton } from "@/shared/ui/skeleton";

export const SettingsFormSkeleton = () => (
  <div className="max-w-md space-y-6 p-6 border rounded-xl bg-white dark:bg-neutral-900">
    <div className="space-y-2">
      <Skeleton variant="text" width="30%" height={14} />
      <Skeleton variant="rect" height={40} className="w-full rounded-lg" />
    </div>

    <div className="space-y-2">
      <Skeleton variant="text" width="40%" height={14} />
      <Skeleton variant="rect" height={40} className="w-full rounded-lg" />
    </div>

    <div className="space-y-2">
      <Skeleton variant="text" width="25%" height={14} />
      <Skeleton variant="rect" height={90} className="w-full rounded-lg" />
    </div>

    <div className="flex justify-end gap-3 pt-2">
      <SkeletonButton size="md" />
      <SkeletonButton size="md" />
    </div>
  </div>
);
```

---

### Recipe 7: Conditional State Crossfade with `SkeletonWrapper`

```tsx
import React, { useState, useEffect } from "react";
import { SkeletonWrapper, SkeletonCard } from "@/shared/ui/skeleton";

export const UserFeedItem = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        title: "Advanced Web Architecture",
        body: "Building high-performance UI systems with React, TypeScript, and Tailwind CSS."
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper
      loading={loading}
      fallback={<SkeletonCard hasImage={true} imageHeight={160} lines={3} />}
    >
      {/* Real Loaded Card */}
      <div className="p-5 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm space-y-3">
        <div className="h-40 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          Header Image
        </div>
        <h2 className="text-xl font-bold">{data?.title}</h2>
        <p className="text-neutral-600 dark:text-neutral-300">{data?.body}</p>
      </div>
    </SkeletonWrapper>
  );
};
```

---

### Recipe 8: Custom Colors & Shimmer Timing (`styleConfig`)

```tsx
import React from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const CustomStyledSkeleton = () => (
  <Skeleton
    variant="rect"
    width="100%"
    height={150}
    styleConfig={{
      baseColor: "#1e1b4b",          // Deep indigo background
      highlightColor: "#4f46e5",     // Bright indigo shimmer sweep
      borderRadius: "16px",
      duration: 1.2,                 // Faster 1.2 second shimmer sweep
      aspectRatio: "16/9",
    }}
  />
);
```

---

## 🎯 Best Practices & CLS Optimization

1. **Match Dimensions**: Ensure skeleton placeholders match the exact height and aspect ratios of the target content to eliminate Cumulative Layout Shift (CLS).
2. **Prefer Wrappers over Ternaries**: Use `<SkeletonWrapper loading={isLoading} fallback={...}>` instead of `isLoading ? <Skeleton /> : <Content />` for cleaner code and smooth crossfade transitions.
3. **Use Stagger Delays**: When rendering lists of cards, use `staggerIndex={index}` to produce natural wave animations.
4. **Keep Content Minimal**: Don't over-complicate skeletons with excessive detail; focus on key content boundaries (images, headings, text blocks, buttons).

---

## ❓ Troubleshooting & FAQ

### Q: Why isn't the shimmer animation visible?
- **Check Dark Mode**: Ensure container colors contrast properly against the base skeleton (`bg-neutral-200/70`).
- **Reduced Motion**: If your operating system settings have "Reduce Motion" enabled, the shimmer animation automatically disables itself for accessibility (`motion-reduce:after:hidden`).
- **Tailwind Config**: Verify that your Tailwind config contains keyframes for the `animate-shimmer` animation if customized.

### Q: How do I override default height/width using Tailwind?
Pass utility classes into `className`:
```tsx
<Skeleton className="w-full h-48 rounded-2xl" />
```

---

*Maintained by the Shared UI Engineering Team.*
