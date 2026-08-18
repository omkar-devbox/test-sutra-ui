import { useState, useRef, useEffect, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MENU_ITEMS } from "@/app/menu/menuItems";
import type { MenuItem } from "@/shared/nav/Sidebar/types/types";

export interface TopHorizontalMenuProps {
  items?: MenuItem[];
  className?: string;
}

export const TopHorizontalMenu: FC<TopHorizontalMenuProps> = ({
  items = MENU_ITEMS,
  className,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setOpenDropdownKey((prev) => (prev === item.key ? null : item.key));
    } else if (item.path) {
      setOpenDropdownKey(null);
      navigate(item.path);
    }
  };

  const isChildActive = (children?: MenuItem[]) => {
    if (!children) return false;
    return children.some(
      (child) => child.path && location.pathname.startsWith(child.path)
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center gap-6 select-none", className)}
    >
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const Icon: LucideIcon | undefined = item.icon;
        const isOpen = openDropdownKey === item.key;

        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : (item.path && location.pathname.startsWith(item.path)) ||
              isChildActive(item.children);

        return (
          <div key={item.key} className="relative group">
            <button
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => hasChildren && setOpenDropdownKey(item.key)}
              className={cn(
                "flex items-center gap-1.5 py-2 px-3 text-sm font-semibold transition-all relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0077be] rounded-lg",
                isActive
                  ? "text-white font-bold bg-[#0077be]/20 dark:bg-[#0077be]/30"
                  : "text-[#ebf7ff]/90 hover:text-white hover:bg-white/10 dark:hover:bg-white/5"
              )}
              aria-expanded={isOpen}
            >
              <span>{item.label}</span>
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 text-[#ebf7ff]",
                    isOpen && "rotate-180 text-[#0077be]"
                  )}
                />
              )}

              {/* Active Bottom Indicator Bar */}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#0077be] rounded-full animate-in fade-in duration-150 shadow-sm shadow-[#0077be]" />
              )}
            </button>

            {/* Dropdown Card Menu */}
            {hasChildren && isOpen && (
              <div
                onMouseLeave={() => setOpenDropdownKey(null)}
                className="absolute top-full left-0 mt-2 min-w-[240px] bg-white dark:bg-[#00263e] rounded-2xl border border-[#004066]/15 dark:border-[#003352] shadow-2xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {item.children?.map((child) => {
                  const ChildIcon: LucideIcon | undefined = child.icon;
                  const isChildItemActive =
                    child.path && location.pathname.startsWith(child.path);

                  return (
                    <button
                      key={child.key}
                      onClick={() => {
                        setOpenDropdownKey(null);
                        if (child.path) navigate(child.path);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0077be]",
                        isChildItemActive
                          ? "bg-[#0077be] text-white shadow-sm shadow-[#0077be]/25"
                          : "text-[#004066] dark:text-[#ebf7ff] hover:bg-[#ebf7ff] dark:hover:bg-[#003352] hover:text-[#0077be]"
                      )}
                    >
                      {ChildIcon && (
                        <ChildIcon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isChildItemActive ? "text-white" : "text-[#0077be]"
                          )}
                        />
                      )}
                      <span>{child.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
