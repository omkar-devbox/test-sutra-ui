import {
  LayoutDashboard,
  ShoppingCart,
  Users as UsersIcon,
  Settings2,
  Box,
  UserCheck,
} from "lucide-react";
import type { MenuSection, MenuItem } from "@/shared/nav/Sidebar/types/types";

// ==================== Navigation Menu Items ====================

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    tooltip: "Overview & Role Dashboards",
    children: [
      {
        id: "admin-dashboard",
        key: "admin-dashboard",
        label: "Admin View",
        icon: LayoutDashboard,
        path: "/dashboard/admin",
        tooltip: "Executive analytics & business metrics",
      },
      {
        id: "staff-dashboard",
        key: "staff-dashboard",
        label: "Staff View",
        icon: LayoutDashboard,
        path: "/dashboard/staff",
        tooltip: "Print floor machine queue & workstation",
      },
      {
        id: "customer-dashboard",
        key: "customer-dashboard",
        label: "Customer View",
        icon: LayoutDashboard,
        path: "/dashboard/customer",
        tooltip: "Customer self-service & live tracker",
      },
    ],
  },
  {
    id: "orders",
    key: "orders",
    label: "Orders",
    icon: ShoppingCart,
    path: "/orders",
    tooltip: "Manage Customer Orders",
  },
  {
    id: "customers",
    key: "customers",
    label: "Customers",
    icon: UsersIcon,
    path: "/customers",
    tooltip: "Customer Directory & Management",
  },
  {
    id: "configuration",
    key: "configuration",
    label: "Configuration",
    icon: Settings2,
    path: "/configuration",
    tooltip: "System Configuration & Settings",
    children: [
      {
        id: "paper-types",
        key: "paper-types",
        label: "Paper Type Setting",
        icon: Box,
        path: "/configuration/paper-types",
        tooltip: "Configure paper types & pricing",
      },
      {
        id: "users",
        key: "users",
        label: "Users",
        icon: UserCheck,
        path: "/configuration/users",
        tooltip: "Manage users and access permissions",
      },
    ],
  },
];

export const SIDEBAR_MENU: MenuSection[] = [
  {
    id: "1",
    label: "Main Navigation",
    description: "Main application menu",
    items: MENU_ITEMS,
  },
];

// ==================== Sidebar Configuration ====================

export const SIDEBAR_CONFIG = {
  companyName: "Sutra-ui",
  logo: null,
  menu: SIDEBAR_MENU,
};

// ==================== Menu Customization ====================

export function customizeMenu(
  originalMenu: MenuSection[] = SIDEBAR_MENU,
  options?: {
    hiddenSectionIds?: string[];
    hiddenItemKeys?: string[];
    customSections?: MenuSection[];
  }
): MenuSection[] {
  if (!options) return originalMenu;

  let result = originalMenu;

  // Filter hidden sections from the menu.
  if (options.hiddenSectionIds?.length) {
    result = result.filter(
      (section) => !options.hiddenSectionIds?.includes(section.id) && !section.hidden
    );
  }

  // Filter hidden items from each section.
  if (options.hiddenItemKeys?.length) {
    result = result.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !options.hiddenItemKeys?.includes(item.key) && !item.hidden
      ),
    }));
  }

  // Append custom sections to the existing menu.
  if (options.customSections?.length) {
    result = [...result, ...options.customSections];
  }

  return result;
}

// ==================== Route Access Control ====================

export function hasAccessToRoute(
  pathname: string,
  _user: any,
  hasPermission: (res: string, act?: string) => boolean
): boolean {
  // Normalize the requested pathname.
  const cleanPath = pathname.replace(/\/$/, "");

  // Allow unauthenticated access to public routes.
  const PUBLIC_ROUTES = ["/unauthorized", "/login", "/auth/login"];

  if (PUBLIC_ROUTES.includes(cleanPath)) {
    return true;
  }

  // Find the menu item associated with the requested route.
  const findItemByPath = (searchPath: string): { item: MenuItem; parent?: MenuItem } | null => {
    for (const section of SIDEBAR_MENU) {
      for (const item of section.items) {
        if (item.path?.replace(/\/$/, "") === searchPath) {
          return { item };
        }

        // Check nested child menu items.
        if (item.children) {
          for (const child of item.children) {
            if (child.path?.replace(/\/$/, "") === searchPath) {
              return { item: child, parent: item };
            }
          }
        }
      }
    }

    return null;
  };

  const match = findItemByPath(cleanPath);

  // Validate permissions for the matched route.
  if (match) {
    const checkPermissions = (permission?: Record<string, string[]>) => {
      if (!permission) return true;

      // Grant access when any configured action is permitted.
      return Object.entries(permission).every(([res, actions]) =>
        actions.some((act) => hasPermission(res, act))
      );
    };

    return checkPermissions(match.parent?.permission) && checkPermissions(match.item.permission);
  }

  // Allow routes that are not registered in the sidebar.
  return true;
}