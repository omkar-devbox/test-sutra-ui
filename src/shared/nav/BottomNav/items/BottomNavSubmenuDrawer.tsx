import { type FC, memo } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { BottomNavSubmenuDrawerProps } from "../types/bottomNav.types";

export const BottomNavSubmenuDrawer: FC<BottomNavSubmenuDrawerProps> = memo(
  ({ isOpen, parentItem, onClose, onSelectChild, activePath }) => {
    if (!isOpen || !parentItem || !parentItem.children) return null;

    const ParentIcon = parentItem.icon;

    return (
      <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end animate-in fade-in duration-200">
        {/* Backdrop Overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Slide-Up Sheet Container */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={parentItem.label}
          className="relative z-10 w-full bg-white dark:bg-[#00263e] rounded-t-3xl border-t border-[#004066]/15 dark:border-[#003352] p-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl animate-in slide-in-from-bottom duration-250 max-h-[80vh] overflow-y-auto"
        >
          {/* Header Drag handle */}
          <div className="w-12 h-1.5 bg-[#004066]/20 dark:bg-[#ebf7ff]/20 rounded-full mx-auto mb-4" />

          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#004066]/10 dark:border-[#003352]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#ebf7ff]">
                <ParentIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#004066] dark:text-white">
                  {parentItem.label} Options
                </h3>
                <p className="text-[11px] text-[#004066]/60 dark:text-[#ebf7ff]/60">
                  Select a section to navigate
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#004066]/60 dark:text-[#ebf7ff]/60 hover:bg-[#ebf7ff] dark:hover:bg-[#003352] transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sub-menu Item List */}
          <div className="space-y-1.5">
            {parentItem.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = child.path
                ? activePath.startsWith(child.path)
                : false;

              return (
                <button
                  key={child.id}
                  onClick={() => onSelectChild(child)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0077be]",
                    isChildActive
                      ? "bg-[#0077be] text-white shadow-md shadow-[#0077be]/25 font-bold"
                      : "bg-[#ebf7ff]/50 dark:bg-[#001929]/50 text-[#004066] dark:text-[#ebf7ff] hover:bg-[#0077be]/10 dark:hover:bg-[#003352]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {ChildIcon && (
                      <div
                        className={cn(
                          "p-2 rounded-xl transition-colors",
                          isChildActive
                            ? "bg-white/20 text-white"
                            : "bg-[#0077be]/10 text-[#0077be] dark:bg-[#0077be]/20 dark:text-[#ebf7ff]"
                        )}
                      >
                        <ChildIcon className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-semibold">{child.label}</div>
                      {child.tooltip && (
                        <div
                          className={cn(
                            "text-[10.5px] mt-0.5 leading-tight",
                            isChildActive
                              ? "text-white/80"
                              : "text-[#004066]/60 dark:text-[#ebf7ff]/60"
                          )}
                        >
                          {child.tooltip}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

BottomNavSubmenuDrawer.displayName = "BottomNavSubmenuDrawer";
