import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { AiChat } from "./AiChat";
import { aiSidebarStyles } from "../styles/aiSidebar.styles";
import type { AiSidebarProps } from "../types";

const MIN_WIDTH = 320; // minimum sidebar width
const MAX_WIDTH = 800; // maximum sidebar width

export const AiSidebar = ({
  isOpen,
  onClose,
  resizable = true,
  styleConfig,
}: AiSidebarProps) => {
  const [width, setWidth] = useState(400); // sidebar width
  const [isResizing, setIsResizing] = useState(false); // resize state
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // prevent text selection
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false); // stop resizing
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return; // guard

      const newWidth = window.innerWidth - e.clientX; // calculate width

      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setWidth(newWidth); // update width
      }
    },
    [isResizing],
  );

  // attach global listeners
  useEffect(() => {
    if (!isResizing) return; // only attach when resizing

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // memoized style to avoid re-renders
  const sidebarStyle = useMemo(
    () => ({
      backgroundColor: styleConfig?.sidebar?.bg,
      borderColor: styleConfig?.sidebar?.border,
    }),
    [styleConfig],
  );

  return (
    <motion.aside
      ref={sidebarRef}
      initial={false} // disable mount animation
      animate={{
        width: isOpen ? width : 0, // animate width
        x: isOpen ? 0 : "100%", // slide out
        opacity: isOpen ? 1 : 0, // fade
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }} // smooth motion
      className={aiSidebarStyles.aside(isResizing)}
      style={sidebarStyle}
    >
      <div className="flex h-full w-full min-w-[320px] flex-col">
        {/* resize handle */}
        {resizable && isOpen && (
          <div
            className={aiSidebarStyles.resizeHandle(isResizing)}
            onMouseDown={startResizing}
          >
            <div className={aiSidebarStyles.resizeIndicator(isResizing)} />
          </div>
        )}

        {/* chat content */}
        {isOpen && (
          <AiChat
            onClose={onClose}
            showCloseButton
            title="AI Co-pilot"
            subtitle="Enhanced v2.0"
            styleConfig={styleConfig}
          />
        )}
      </div>
    </motion.aside>
  );
};
