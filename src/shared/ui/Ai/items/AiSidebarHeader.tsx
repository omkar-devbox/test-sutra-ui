import { useMemo } from "react";
import { X, Sparkles } from "lucide-react";
import { aiSidebarHeaderStyles } from "../styles/aiSidebar.styles";
import type { AiSidebarHeaderProps } from "../types";

export const AiSidebarHeader = ({
  onClose,
  title = "AI Assistant",
  subtitle,
  icon,
  showClose = true,
  styleConfig,
}: AiSidebarHeaderProps) => {
  // memoize inline styles to avoid re-renders
  const headerStyle = useMemo(
    () => ({
      backgroundColor: styleConfig?.header?.bg,
      borderColor: styleConfig?.header?.border,
    }),
    [styleConfig],
  );

  const titleStyle = useMemo(
    () => ({ color: styleConfig?.header?.text }),
    [styleConfig],
  );

  const subtitleStyle = useMemo(
    () => ({ color: styleConfig?.header?.subtitle }),
    [styleConfig],
  );

  return (
    <div className={aiSidebarHeaderStyles.root} style={headerStyle}>
      {/* left section */}
      <div className="flex items-center gap-3">
        <div className={aiSidebarHeaderStyles.iconWrapper}>
          {icon ?? <Sparkles size={20} />} {/* fallback icon */}
        </div>

        <div className={aiSidebarHeaderStyles.titleWrapper}>
          <h2 className={aiSidebarHeaderStyles.title} style={titleStyle}>
            {title}
          </h2>

          {subtitle && (
            <p className={aiSidebarHeaderStyles.subtitle} style={subtitleStyle}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* close button */}
      {showClose && (
        <button
          onClick={onClose} // close handler
          className={aiSidebarHeaderStyles.closeButton}
          aria-label="Close sidebar" // accessibility
          type="button" // prevent form submit
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
