import { useState, useEffect, useCallback, type FC, type KeyboardEvent, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Tooltip } from "@/shared/ui";
import { itemStyles } from "../styles/sidebar.styles";
import { SidebarNavigationModel } from "../types/types";
import type { SidebarItemProps } from "../types/types";

export const SidebarItem: FC<SidebarItemProps> = memo(({
  item,
  collapsed = false,
  depth = 0,
  onExpand,
  side = "left",
  onCloseMobile,
}) => {
  const location = useLocation();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const isActive = SidebarNavigationModel.isActive(item, location.pathname);
  const [isOpen, setIsOpen] = useState(isActive);

  // Sync open state when active state changes on route navigation
  useEffect(() => {
    if (isActive && hasChildren) {
      setIsOpen(true);
    }
  }, [isActive, hasChildren]);

  const handleMouseEnter = useCallback(() => {
    const preload = (window as Window & { __preloadRoute?: (path: string) => void }).__preloadRoute;
    if (!preload) return;

    if (item.path) {
      preload(item.path);
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.path) {
          preload(child.path);
        }
      });
    }
  }, [item.path, item.children]);

  const handleMenuClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent("close-sidebar-forms"));
    if (onCloseMobile) {
      onCloseMobile();
    }
  }, [onCloseMobile]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        if (hasChildren) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
    },
    [hasChildren],
  );

  if (collapsed) {
    return (
      <div className="w-full flex justify-center">
        <Tooltip
          content={item.label}
          placement={side === "left" ? "right" : "left"}
          offset={20}
        >
          <NavLink
            to={item.path || "#"}
            className={itemStyles.collapsedItem(isActive)}
            onMouseEnter={handleMouseEnter}
            onFocus={handleMouseEnter}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            onClick={(e: React.MouseEvent) => {
              if (hasChildren && onExpand) {
                e.preventDefault();
                onExpand();
              } else if (hasChildren) {
                e.preventDefault();
              } else {
                handleMenuClick();
              }
            }}
          >
            {item.icon && (
              typeof item.icon === "string" ? (
                <img
                  src={item.icon}
                  alt=""
                  className="w-5.5 h-5.5 object-contain shrink-0 img-clear"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              ) : (
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="img-clear" />
              )
            )}
            {!item.icon && <div className={itemStyles.dot(isActive)} />}
          </NavLink>
        </Tooltip>
      </div>
    );
  }

  const content = (
    <div
      tabIndex={0}
      role={hasChildren ? "button" : undefined}
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-label={item.label}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (hasChildren) {
          setIsOpen(!isOpen);
        }
      }}
      className={itemStyles.item(isActive, hasChildren, depth)}
    >
      {item.icon && (
        typeof item.icon === "string" ? (
          <img
            src={item.icon}
            alt=""
            className="w-5 h-5 object-contain shrink-0 img-clear"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        ) : (
          <item.icon
            size={20}
            className={`${itemStyles.icon(isActive)} img-clear`}
            strokeWidth={isActive ? 2.5 : 2}
          />
        )
      )}

      {!item.icon && <div className={itemStyles.dot(isActive)} />}

      <span className={itemStyles.label(depth)}>{item.label}</span>

      {hasChildren && (
        <div className={itemStyles.chevron(isOpen)}>
          <ChevronDown size={14} />
        </div>
      )}
    </div>
  );

  return (
    <div className={itemStyles.wrapper}>
      {item.path ? (
        <NavLink
          to={item.path}
          className="block focus:outline-none"
          onMouseEnter={handleMouseEnter}
          onFocus={handleMouseEnter}
          aria-current={isActive && !hasChildren ? "page" : undefined}
          onClick={handleMenuClick}
        >
          {content}
        </NavLink>
      ) : (
        <div onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter}>
          {content}
        </div>
      )}

      {hasChildren && isOpen && (
        <div className={itemStyles.submenu} role="group" aria-label={`${item.label} submenu`}>
          {/* Vertical line for submenus */}
          <div className={itemStyles.submenuLine(depth, side)} />
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              depth={depth + 1}
              side={side}
              onCloseMobile={onCloseMobile}
            />
          ))}
        </div>
      )}
    </div>
  );
});

SidebarItem.displayName = "SidebarItem";

