import { type FC, memo } from "react";
import { Plus } from "lucide-react";
import type { BottomNavFabConfig } from "../types/bottomNav.types";
import { fabButtonStyles } from "../styles/bottomNav.styles";

export interface BottomNavCentralFabProps {
  config?: BottomNavFabConfig;
}

export const BottomNavCentralFab: FC<BottomNavCentralFabProps> = memo(
  ({ config }) => {
    if (!config?.show) return null;

    const Icon = config.icon || Plus;

    return (
      <div className="flex justify-center shrink-0">
        <button
          onClick={config.onClick}
          aria-label={config.ariaLabel || config.label || "Quick Action"}
          title={config.label || "Quick Action"}
          className={fabButtonStyles()}
        >
          <Icon className="h-6 w-6 stroke-[2.5]" />
        </button>
      </div>
    );
  }
);

BottomNavCentralFab.displayName = "BottomNavCentralFab";
