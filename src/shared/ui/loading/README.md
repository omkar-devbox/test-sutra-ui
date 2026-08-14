# ⏳ Comprehensive Loading & Lazy UI System Documentation

Welcome to the complete, in-depth architectural and usage guide for the **Loading & Lazy Component System** located at `@/shared/ui/loading`.

This system provides smooth, animated, versatile loading feedback components and React Suspense integration utilities powered by **Framer Motion**, **React Suspense**, and **Tailwind CSS**.

---

## 📚 Table of Contents
1. [Overview & Features](#-overview--features)
2. [Directory & Architectural Structure](#-directory--architectural-structure)
3. [Core Technical Architecture](#-core-technical-architecture)
   - [1. Full-Screen vs Inline Modes](#1-full-screen-vs-inline-modes)
   - [2. Determinate Progress vs Indeterminate Animation](#2-determinate-progress-vs-indeterminate-animation)
   - [3. Spinner vs Skeleton Variants](#3-spinner-vs-skeleton-variants)
   - [4. React Suspense & Code Splitting (`Lazy` & `withLazy`)](#4-react-suspense--code-splitting-lazy--withlazy)
4. [Exhaustive API Reference](#-exhaustive-api-reference)
   - [`<Loading />` Component](#1-loading-component)
   - [`<Lazy />` Component](#2-lazy-component)
   - [`withLazy()` Higher-Order Component](#3-withlazy-higher-order-component)
   - [`loadingBaseStyles` Design Tokens](#4-loadingbasestyles-design-tokens)
5. [In-Depth Code Recipes & Practical Examples](#-in-depth-code-recipes--practical-examples)
   - [Recipe 1: Default Full-Screen Application Loader](#recipe-1-default-full-screen-application-loader)
   - [Recipe 2: Inline Box Container Loader](#recipe-2-inline-box-container-loader)
   - [Recipe 3: Progress Bar Loader (File Upload / PDF Generation)](#recipe-3-progress-bar-loader-file-upload--pdf-generation)
   - [Recipe 4: Content Skeleton Loading Variant](#recipe-4-content-skeleton-loading-variant)
   - [Recipe 5: Lazy Loading Route Pages with `withLazy` HOC](#recipe-5-lazy-loading-route-pages-with-withlazy-hoc)
   - [Recipe 6: Wrapping Async Children with `<Lazy />`](#recipe-6-wrapping-async-children-with-lazy)
   - [Recipe 7: Custom Fallback View with `<Lazy />`](#recipe-7-custom-fallback-view-with-lazy)
6. [Best Practices & Performance Optimization](#-best-practices--performance-optimization)
7. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview & Features

The Loading UI system handles user feedback during asynchronous operations, initial application bootstraps, route code-splitting, and background data fetching:

- 🚀 **Full-Screen & Inline Support**: Seamlessly transitions between occupying the entire viewport (`fixed inset-0`) or fitting inside a parent container card.
- 📊 **Determinate & Indeterminate Progress Bar**: Supports both continuous sliding loading animation and explicit percentage progress bars (`0% - 100%`).
- 🎨 **Dual Display Variants**: Switch between branded spinner loading card layout and structural skeleton placeholders (`variant="spinner"` | `"skeleton"`).
- ⚡ **React Suspense & Code Splitting**: Includes `withLazy()` HOC and `<Lazy />` wrapper component to handle dynamic imports effortlessly.
- ✨ **Framer Motion Micro-Animations**: Smooth opacity fading, logo scale spring transitions, and animated width bars.
- 🎯 **Centralized Design System Tokens**: Pure Tailwind CSS class configurations defined in `style/style.ts`.

---

## 📁 Directory & Architectural Structure

The Loading package is organized within `src/shared/ui/loading`:

```text
src/shared/ui/loading/
├── index.ts              # Central public API exports barrel
├── README.md             # In-depth usage documentation (this file)
├── items/
│   ├── Loading.tsx       # Core visual loading component (Spinner & Skeleton)
│   └── Lazy.tsx          # React Suspense HOC and wrapper component
└── style/
    └── style.ts          # Centralized style tokens and utility classes
```

---

## ⚙️ Core Technical Architecture

### 1. Full-Screen vs Inline Modes
The `<Loading />` component adjusts positioning based on the `fullScreen` prop:
- **`fullScreen={true}` (Default)**: Uses `fixed inset-0 z-[10000]` overlay to cover the whole window. Perfect for initial app bootstrap or major blocking navigation.
- **`fullScreen={false}`**: Uses `w-full h-full min-h-[400px] rounded-3xl border border-gray-100` to fill a parent container card or dashboard panel.

### 2. Determinate Progress vs Indeterminate Animation
The progress bar dynamically changes behavior based on the `progress` prop:
- **Indeterminate (`progress === undefined`)**: Runs an infinite Framer Motion sequence translating horizontal position `x: ["-100%", "250%"]` continuously.
- **Determinate (`typeof progress === 'number'`)**: Animates width explicitly to `${progress}%` over `0.4s`.

### 3. Spinner vs Skeleton Variants
- **`variant="spinner"` (Default)**: Renders the branded loader card featuring the logo badge, loading bar, and status message text.
- **`variant="skeleton"`**: Delegates rendering to `<ContentSkeleton />` inside a max-width wrapper, useful for content placeholder loading states.

### 4. React Suspense & Code Splitting (`Lazy` & `withLazy`)
Provides functional primitives to wrap async dynamic imports:
- **`withLazy(importFn, loadingProps)`**: Wraps dynamic `import()` calls into a React component enclosed within `<Suspense fallback={<Loading />} />`.
- **`<Lazy />`**: A JSX wrapper component that encapsulates `children` in standard `<Suspense>` with built-in `<Loading />` fallback defaults.

---

## 📋 Exhaustive API Reference

### 1. `<Loading />` Component

The primary visual loader component.

#### Import:
```tsx
import { Loading } from '@/shared/ui/loading';
```

#### Props:
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fullScreen` | `boolean` | `true` | If `true`, covers the entire viewport with a fixed overlay. If `false`, occupies parent container dimensions. |
| `text` | `string` | `"LOADING"` | Uppercase message displayed below the animated loader bar. |
| `className` | `string` | `undefined` | Custom CSS class names merged into the root wrapper container. |
| `variant` | `'spinner' \| 'skeleton'` | `'spinner'` | Display style: `'spinner'` for branded logo & bar, `'skeleton'` for layout skeleton structure. |
| `progress` | `number` | `undefined` | Optional progress percentage (`0` to `100`). When supplied, turns the indeterminate bar into a determinate progress gauge. |

---

### 2. `<Lazy />` Component

A React Suspense boundary component pre-configured with `<Loading />` fallback.

#### Import:
```tsx
import { Lazy } from '@/shared/ui/loading';
```

#### Props:
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Required** | The async component tree wrapped by Suspense. |
| `fallback` | `ReactNode` | `undefined` | Custom fallback JSX element. If omitted, defaults to `<Loading />`. |
| `fullScreen` | `boolean` | `undefined` | Forwarded to default `<Loading />` fallback. |
| `text` | `string` | `undefined` | Forwarded to default `<Loading />` fallback. |
| `variant` | `'spinner' \| 'skeleton'` | `undefined` | Forwarded to default `<Loading />` fallback. |

---

### 3. `withLazy()` Higher-Order Component

A utility function to transform dynamic imports into Suspense-ready components.

#### Import:
```tsx
import { withLazy } from '@/shared/ui/loading';
```

#### Signature:
```typescript
function withLazy<T extends object>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  loadingProps?: LazyProps
): (props: T) => JSX.Element
```

#### Parameters:
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `importFn` | `() => Promise<{ default: ComponentType<T> }>` | Dynamic import function (e.g. `() => import('./MyPage')`). |
| `loadingProps` | `{ fullScreen?: boolean; text?: string; variant?: 'spinner' \| 'skeleton' }` | Options passed directly to the fallback `<Loading />` component. |

---

### 4. `loadingBaseStyles` Design Tokens

Located at `src/shared/ui/loading/style/style.ts`:

```typescript
export const loadingBaseStyles = {
  wrapper: "flex flex-col items-center justify-center bg-white transition-all duration-300",
  fullScreen: "fixed inset-0 z-[10000]",
  inline: "w-full h-full min-h-[400px] rounded-3xl border border-gray-100",
  card: "flex flex-col items-center gap-[18px]",
  logo: "w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-xl shadow-[0_6px_18px_rgba(99,102,241,0.25)]",
  loader: "w-[110px] h-[3px] rounded-[10px] bg-[#e5e7eb] overflow-hidden relative",
  loaderBar: "absolute inset-y-0 w-[35%] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] animate-move",
  text: "text-[11px] font-medium tracking-[0.18em] text-[#6b7280] uppercase",
  skeletonWrapper: "p-8 w-full max-w-7xl mx-auto",
} as const;
```

---

## 💡 In-Depth Code Recipes & Practical Examples

### Recipe 1: Default Full-Screen Application Loader

Use full-screen loading for global app initialization or authentication checking.

```tsx
import React, { useState, useEffect } from 'react';
import { Loading } from '@/shared/ui/loading';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <Loading fullScreen text="INITIALIZING SYSTEM..." />;
  }

  return <>{children}</>;
};
```

---

### Recipe 2: Inline Box Container Loader

Render inline loaders inside dashboard cards, widgets, or tab panels without blocking the entire page.

```tsx
import React from 'react';
import { Loading } from '@/shared/ui/loading';

export const AnalyticsWidget: React.FC<{ isLoading: boolean; data?: any }> = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <div className="h-[450px] w-full">
        <Loading fullScreen={false} text="FETCHING METRICS" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-3xl border border-gray-100">
      <h3 className="text-lg font-bold">Analytics Overview</h3>
      {/* Widget Content */}
    </div>
  );
};
```

---

### Recipe 3: Progress Bar Loader (File Upload / PDF Generation)

Show precise completion percentages during multi-stage actions such as resume parsing or PDF generation.

```tsx
import React, { useState } from 'react';
import { Loading } from '@/shared/ui/loading';

export const PdfExportButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = () => {
    setIsExporting(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExporting(false), 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <>
      <button 
        onClick={handleExport}
        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
      >
        Export CV as PDF
      </button>

      {isExporting && (
        <Loading 
          fullScreen 
          text={`GENERATING PDF (${progress}%)`} 
          progress={progress} 
        />
      )}
    </>
  );
};
```

---

### Recipe 4: Content Skeleton Loading Variant

Switch the variant prop to `"skeleton"` for placeholder structural loading.

```tsx
import React from 'react';
import { Loading } from '@/shared/ui/loading';

export const ResumeFeed: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return <Loading variant="skeleton" className="my-4" />;
  }

  return (
    <div className="space-y-4">
      {/* Real Feed Content */}
    </div>
  );
};
```

---

### Recipe 5: Lazy Loading Route Pages with `withLazy` HOC

Streamline code-splitting across React Router views using `withLazy()`.

```tsx
import { withLazy } from '@/shared/ui/loading';

// Dynamic Import with withLazy HOC
export const DashboardPage = withLazy(
  () => import('@/pages/dashboard/DashboardPage'),
  { fullScreen: true, text: 'LOADING DASHBOARD' }
);

export const EditorPage = withLazy(
  () => import('@/pages/editor/EditorPage'),
  { fullScreen: true, text: 'LOADING EDITOR' }
);
```

---

### Recipe 6: Wrapping Async Children with `<Lazy />`

Wrap dynamically loaded components directly inside JSX with `<Lazy />`.

```tsx
import React, { lazy } from 'react';
import { Lazy } from '@/shared/ui/loading';

const HeavyChartComponent = lazy(() => import('./HeavyChartComponent'));

export const AnalyticsTab = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Performance Report</h2>
      
      <Lazy fullScreen={false} text="LOADING CHARTS" variant="spinner">
        <HeavyChartComponent />
      </Lazy>
    </div>
  );
};
```

---

### Recipe 7: Custom Fallback View with `<Lazy />`

Provide a custom fallback element to `<Lazy />` when standard loading UI is not desired.

```tsx
import React, { lazy } from 'react';
import { Lazy } from '@/shared/ui/loading';

const CommentsSection = lazy(() => import('./CommentsSection'));

export const ArticlePage = () => {
  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1>Article Title</h1>
      <p>Content goes here...</p>

      {/* Custom fallback spinner */}
      <Lazy fallback={<div className="p-4 text-center text-gray-400">Loading comments...</div>}>
        <CommentsSection />
      </Lazy>
    </article>
  );
};
```

---

## ♿ Best Practices & Performance Optimization

1. **Use `fullScreen={false}` for Component Boundaries**: Avoid using full-screen loaders for background actions or localized panel refetches; inline loaders provide a smoother user experience.
2. **Combine `progress` for Long Async Tasks**: When an operation takes longer than 2 seconds (e.g. AI resume scoring or PDF rendering), supply a `progress` value to give users visual feedback.
3. **Preload Lazy Routes**: When leveraging `withLazy()`, consider preloading key dynamic imports on hover or focus to eliminate noticeable fallback delays.
4. **Use Skeletons for Feed / Card Layouts**: Set `variant="skeleton"` when loading structured lists or dashboard grids to avoid layout shifts.

---

## ❓ Troubleshooting & FAQ

### Q1: The full-screen loader appears behind another modal or dropdown.
**Solution**: `<Loading fullScreen />` uses `z-[10000]`. Ensure parent elements do not establish lower isolated stacking contexts or custom `z-index` bounds.

### Q2: How do I change the text under the loading bar?
**Solution**: Pass the desired string to the `text` prop:
```tsx
<Loading text="SAVING CHANGES..." />
```

### Q3: How do I implement a smooth progress transition?
**Solution**: Pass a number between `0` and `100` to the `progress` prop. Framer Motion will automatically interpolate width adjustments over `0.4s`.

---

## 📄 License & Attribution
Part of the **Sutra-ui UI Component Architecture**. Built with React, Framer Motion, Tailwind CSS, and Lucide.
