# 📊 Data Table UI Component (`@/shared/ui/dataTable`)

Welcome to the comprehensive documentation for the **DataTable UI Component** in the `Sutra-ui` design system.

The `<DataTable />` component is a feature-rich, high-performance tabular data display engine supporting sticky column pinning, sorting, column resizing, card-view switching, pagination, and multi-row selection.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Props Specification](#-exhaustive-api--props-specification)
   - [Column Definition (`ColumnDef<T>`)](#column-definition-columndeft)
   - [`<DataTable />` Props](#datatable--props)
4. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Standard Table with Sorting & Searching](#recipe-1-standard-table-with-sorting--searching)
   - [Recipe 2: Sticky Pinning & Custom Cell Rendering](#recipe-2-sticky-pinning--custom-cell-rendering)
   - [Recipe 3: Card Grid View Switcher](#recipe-3-card-grid-view-switcher)
5. [Design System Tokens & Theme Customization](#-design-system-tokens--theme-customization)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🚀 Overview & Core Architecture

The DataTable architecture separates state management (using Zustand stores and reactive hooks) from table headers, body rows, pagination controls, and toolbars.

### Key Capabilities:
- 📌 **Sticky Column Pinning**: Freeze critical columns (e.g. ID or Actions) to the left or right during horizontal scrolling.
- 🔃 **Multi-Column Sorting**: Sort string, numeric, or date columns with direction indicators.
- ↔️ **Interactive Resizing**: Drag column border handles to resize width dynamically.
- 📇 **Grid/Card View Mode**: Seamlessly switch between standard data tables and card layout grids.
- 🔍 **Debounced Search**: Integrated toolbar search with built-in debouncing.
- ⚡ **Zustand State Engine**: Reactive state hook (`useDataTableStore`) for persistent layout preferences.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [dataTable.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/dataTable.tsx)
- Types & Interfaces: [types/dataTable.types.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/types/dataTable.types.ts)
- Main State Hook: [hooks/useDataTable.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/hooks/useDataTable.ts)
- Store: [hooks/useDataTableStore.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/hooks/useDataTableStore.ts)
- Subcomponents:
  - Header: [items/DataTableHead.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/items/DataTableHead.tsx)
  - Body: [items/DataTableBody.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/items/DataTableBody.tsx)
  - Row: [items/DataTableRow.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/items/DataTableRow.tsx)
  - Toolbar: [items/DataTableToolbar.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/items/DataTableToolbar.tsx)
  - Pagination: [items/DataTablePagination.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/items/DataTablePagination.tsx)
- Styling Tokens: [styles/dataTable.styles.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/dataTable/styles/dataTable.styles.ts)

---

## 🛠 Exhaustive API & Props Specification

### `<DataTable />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `T[]` | **Required** | Array of row data objects to display. |
| `columns` | `ColumnDef<T>[]` | **Required** | Column definitions array. |
| `getRowId` | `(row: T) => string \| number` | `row => row.id` | Extractor function for unique row keys. |
| `enableSearch` | `boolean` | `true` | Enables global search input in toolbar. |
| `hideToolbar` | `boolean` | `false` | Hides toolbar completely when set to `true`. |
| `selectable` | `boolean` | `false` | Enables checkbox row selection. |
| `pagination` | `{ pageSize?: number }` | `{ pageSize: 10 }` | Pagination configuration. |
| `isLoading` | `boolean` | `false` | Renders animated table skeleton loader. |

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Standard Table with Sorting & Searching

```tsx
import { DataTable } from "@/shared/ui/dataTable/dataTable";
import type { ColumnDef } from "@/shared/ui/dataTable/types/dataTable.types";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { id: "name", label: "Full Name", key: "name", sortable: true },
  { id: "email", label: "Email Address", key: "email", sortable: true },
  { id: "role", label: "Role", key: "role" },
];

export function UserTable({ users }: { users: User[] }) {
  return (
    <DataTable<User>
      data={users}
      columns={columns}
      getRowId={(user) => user.id}
      enableSearch
    />
  );
}
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: How do I pin an action column to the right side?**
> Set `pinned: "right"` in the column definition.

**Q: Can I customize row click events?**
> Pass `onRowClick={(row) => handleRowSelect(row)}` to `<DataTable />`.

---

Part of the **Sutra-ui UI Component Architecture**. Built with React, TypeScript, and Tailwind CSS.
