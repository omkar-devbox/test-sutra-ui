# Shared Pages Module (`src/shared/pages`)

The `src/shared/pages` module provides core layout containers, dynamic page builders, and system feedback pages (error boundary, error state, 404 not found, 403 unauthorized).

---

## Directory Architecture

Each page component resides in its own subfolder and adheres strictly to the modular architectural layout:

```text
src/shared/pages/
├── Page/                      # Standard page layout wrapper
│   ├── Page.tsx               # Main component
│   ├── items/                 # Subcomponents (PageHeader, PageBreadcrumbs, PageSearchInput)
│   ├── styles/                # Styling classes (page.styles.ts)
│   └── types/                 # TypeScript interfaces (page.types.ts)
├── GenericPage/               # Fallback page generator for unbuilt routes
│   ├── GenericPage.tsx        # Main component
│   ├── items/                 # Subcomponents (GenericPagePlaceholder)
│   ├── styles/                # Styling classes (genericPage.styles.ts)
│   ├── types/                 # TypeScript interfaces (genericPage.types.ts)
│   └── utils/                 # Utilities (menuMap.ts)
├── error/                     # Error handling & runtime fallback
│   ├── ErrorPage.tsx          # Error presentation component
│   ├── ErrorBoundary.tsx      # React Class ErrorBoundary wrapper
│   ├── items/                 # Subcomponents (ErrorDetails, ErrorActions)
│   ├── styles/                # Styling classes (error.styles.ts)
│   └── types/                 # TypeScript interfaces (error.types.ts)
├── notfound/                  # 404 Uncharted route handler
│   ├── NotFoundPage.tsx       # Main page
│   ├── items/                 # Subcomponents (NotFoundCard)
│   ├── styles/                # Styling classes (notfound.styles.ts)
│   └── types/                 # TypeScript interfaces (notfound.types.ts)
└── unauthorized/              # 403 Access control restriction handler
    ├── UnauthorizedPage.tsx   # Main page
    ├── items/                 # Subcomponents (UnauthorizedCard)
    ├── styles/                # Styling classes (unauthorized.styles.ts)
    └── types/                 # TypeScript interfaces (unauthorized.types.ts)
```

> [!NOTE]
> Root-level barrel files (`index.ts`) are deliberately omitted to eliminate circular dependencies and minimize bundle sizes. Imports should target specific subfolder components directly.

---

## Component Usage Guide

### 1. `Page` Component
`Page` is the foundational container for feature pages across the application. It supports breadcrumbs, animated transitions, actions, loading spinners, and debounced search fields.

```tsx
import { Page } from "@/shared/pages/Page/Page";
import { Button } from "@/shared/ui/button/Button";

export function UsersPage() {
  const handleSearch = (query: string) => {
    console.log("Searching users:", query);
  };

  return (
    <Page
      title="User Management"
      subtitle="View, create, and update application users and access permissions."
      breadcrumbs={[
        { label: "Dashboard", path: "/" },
        { label: "Users" },
      ]}
      search={{
        placeholder: "Search users...",
        onSearch: handleSearch,
      }}
      actions={<Button variant="primary">Add User</Button>}
    >
      <div className="p-4 bg-white rounded-xl shadow-sm">
        {/* Table or feature content */}
      </div>
    </Page>
  );
}
```

---

### 2. `GenericPage` Component
Used as a lazy fallback component in routes for dynamic menu paths that don't yet have dedicated feature components.

```tsx
import { GenericPage } from "@/shared/pages/GenericPage/GenericPage";

// Used directly in routing definitions:
<Route path="/some-future-module" element={<GenericPage />} />
```

---

### 3. `ErrorBoundary` & `ErrorPage`
Catches unhandled React runtime errors and provides error recovery options.

```tsx
import { ErrorBoundary } from "@/shared/pages/error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}
```

---

### 4. `NotFoundPage` & `UnauthorizedPage`
System level route error pages for missing pages (404) or insufficient permissions (403).

```tsx
import { NotFoundPage } from "@/shared/pages/notfound/NotFoundPage";
import { UnauthorizedPage } from "@/shared/pages/unauthorized/UnauthorizedPage";

// In Router configuration:
<Route path="/unauthorized" element={<UnauthorizedPage />} />
<Route path="*" element={<NotFoundPage />} />
```
