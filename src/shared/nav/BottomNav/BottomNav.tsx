import { type FC, useState, memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users as UsersIcon,
  Settings2,
  User,
  Box,
  UserCheck,
} from "lucide-react";
import type { BottomNavItem, BottomNavProps } from "./types/bottomNav.types";
import { bottomNavContainerStyles } from "./styles/bottomNav.styles";
import { BottomNavItemButton } from "./items/BottomNavItemButton";
import { BottomNavSubmenuDrawer } from "./items/BottomNavSubmenuDrawer";

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    tooltip: "Dashboard Views",
    children: [
      {
        id: "admin-dashboard",
        label: "Admin Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard/admin",
        tooltip: "Analytics and KPIs",
      },
      {
        id: "staff-dashboard",
        label: "Staff Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard/staff",
        tooltip: "Queue & Job Status",
      },
      {
        id: "customer-dashboard",
        label: "Customer View",
        icon: LayoutDashboard,
        path: "/dashboard/customer",
        tooltip: "Live tracker & status",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    id: "customers",
    label: "Customers",
    icon: UsersIcon,
    path: "/customers",
  },
  {
    id: "configuration",
    label: "Settings",
    icon: Settings2,
    path: "/configuration/paper-types",
    tooltip: "System Settings",
    children: [
      {
        id: "paper-types",
        label: "Paper Types",
        icon: Box,
        path: "/configuration/paper-types",
        tooltip: "Configure paper stocks & pricing",
      },
      {
        id: "users",
        label: "User Management",
        icon: UserCheck,
        path: "/configuration/users",
        tooltip: "Manage permissions & roles",
      },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

export const BottomNav: FC<BottomNavProps> = memo(
  ({
    items = DEFAULT_BOTTOM_NAV_ITEMS,
    className,
    onItemClick,
  }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Drawer state for navigation items with child options
    const [activeDrawerParent, setActiveDrawerParent] =
      useState<BottomNavItem | null>(null);

    const handleItemClick = useCallback(
      (item: BottomNavItem) => {
        if (onItemClick) {
          onItemClick(item);
        }

        if (item.children && item.children.length > 0) {
          setActiveDrawerParent((prev) =>
            prev?.id === item.id ? null : item
          );
        } else if (item.path) {
          setActiveDrawerParent(null);
          navigate(item.path);
        }
      },
      [navigate, onItemClick]
    );

    const handleSelectChild = useCallback(
      (child: BottomNavItem) => {
        setActiveDrawerParent(null);
        if (child.path) {
          navigate(child.path);
        }
      },
      [navigate]
    );

    const isItemActive = useCallback(
      (item: BottomNavItem): boolean => {
        if (!item.path) {
          if (item.children) {
            return item.children.some(
              (child) => child.path && location.pathname.startsWith(child.path)
            );
          }
          return false;
        }

        if (item.path === "/") {
          return location.pathname === "/";
        }

        const isCurrentPathActive = location.pathname.startsWith(item.path);
        const isChildPathActive = item.children
          ? item.children.some(
              (child) => child.path && location.pathname.startsWith(child.path)
            )
          : false;

        return isCurrentPathActive || isChildPathActive;
      },
      [location.pathname]
    );

    return (
      <>
        {/* Navigation Bar */}
        <nav
          className={bottomNavContainerStyles(className)}
          aria-label="Mobile Bottom Navigation"
        >
          {items.map((item) => (
            <BottomNavItemButton
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </nav>

        {/* Slide-Up Sub-menu Drawer */}
        <BottomNavSubmenuDrawer
          isOpen={Boolean(activeDrawerParent)}
          parentItem={activeDrawerParent}
          onClose={() => setActiveDrawerParent(null)}
          onSelectChild={handleSelectChild}
          activePath={location.pathname}
        />
      </>
    );
  }
);

BottomNav.displayName = "BottomNav";
