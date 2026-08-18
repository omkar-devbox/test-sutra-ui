import type { FC, ReactNode } from "react";

export interface BottomNavItem {
  id: string;
  label: string;
  icon: FC<{ className?: string }>;
  path?: string;
  badge?: number | boolean;
  tooltip?: string;
  children?: BottomNavItem[];
}

export interface BottomNavFabConfig {
  show?: boolean;
  label?: string;
  icon?: FC<{ className?: string }>;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface BottomNavProps {
  items?: BottomNavItem[];
  className?: string;
  fabConfig?: BottomNavFabConfig;
  onItemClick?: (item: BottomNavItem) => void;
}

export interface BottomNavItemButtonProps {
  item: BottomNavItem;
  isActive: boolean;
  onClick: () => void;
}

export interface BottomNavSubmenuDrawerProps {
  isOpen: boolean;
  parentItem: BottomNavItem | null;
  onClose: () => void;
  onSelectChild: (child: BottomNavItem) => void;
  activePath: string;
}
