import { cn } from "@/shared/lib/utils";

/**
 * Main AI Sidebar Container Styles
 */
export const aiSidebarStyles = {
  aside: (isResizing: boolean) =>
    cn(
      "h-screen bg-bg border-l border-border flex flex-col shrink-0 overflow-visible isolate",
      !isResizing && "transition-all duration-300 ease-in-out",
      "fixed right-0 top-0 z-50",
    ),
  resizeHandle: (isResizing: boolean) =>
    cn(
      "absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-50 group hidden lg:block",
      "hover:bg-primary/20 transition-colors",
      isResizing && "bg-primary/30 w-1.5",
    ),
  resizeIndicator: (isResizing: boolean) =>
    cn(
      "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-10 rounded-full bg-neutral-border transition-all",
      isResizing
        ? "bg-primary h-full"
        : "group-hover:bg-primary group-hover:h-12",
    ),
};

/**
 * AI Sidebar Header Styles
 */
export const aiSidebarHeaderStyles = {
  root: "h-16 px-6 border-b border-border flex items-center justify-between bg-neutral-bg/50 backdrop-blur-md shrink-0",
  iconWrapper: "w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm",
  titleWrapper: "flex flex-col",
  title: "text-sm font-bold text-text-primary tracking-tight leading-none mb-1",
  subtitle: "text-[11px] text-text-secondary font-medium uppercase tracking-wider opacity-60",
  closeButton: "p-2 hover:bg-neutral-surface rounded-xl text-text-secondary hover:text-text-primary transition-all active:scale-95",
};

/**
 * AI Chat Area Styles
 */
export const aiChatAreaStyles = {
  root: "flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide",
  emptyState: {
    wrapper: "flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500",
    icon: "w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary rotate-3 shadow-inner",
    content: "space-y-2 max-w-[280px]",
    title: "text-lg font-semibold text-text-primary",
    description: "text-sm text-text-secondary leading-relaxed",
  },
  suggestion: {
    grid: "grid grid-cols-1 gap-2 w-full max-w-[320px] pt-4",
    button: "group flex items-center justify-between p-3 rounded-xl border border-border/50 bg-bg hover:border-primary/50 hover:bg-primary/5 transition-all text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    label: "text-sm font-medium text-text-primary group-hover:text-primary transition-colors",
    icon: "text-neutral-300 group-hover:text-primary/50 transition-colors",
  }
};

/**
 * AI Chat Message Styles
 */
export const aiChatMessageStyles = {
  wrapper: (role: "user" | "assistant" | "system") =>
    cn(
      "flex gap-3 w-full",
      role === "user"
        ? "flex-row-reverse"
        : role === "system"
          ? "justify-center"
          : "justify-start",
    ),
  avatar: (role: "user" | "assistant" | "system") =>
    cn(
      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-105",
      role === "assistant"
        ? "bg-primary text-white"
        : "bg-neutral-surface text-text-secondary border border-neutral-border/50",
      role === "system" && "hidden",
    ),
  bubble: (role: "user" | "assistant" | "system") =>
    cn(
      "max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed relative",
      role === "assistant"
        ? "bg-bg text-text-primary rounded-tl-none border border-border/50 shadow-sm"
        : role === "user"
          ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/20"
          : "bg-neutral-surface/50 text-text-secondary text-[11px] font-medium px-4 py-1.5 rounded-full border border-border/30 backdrop-blur-sm",
    ),
  typingIndicator: "bg-bg p-4 rounded-2xl rounded-tl-none flex gap-1.5 border border-border/50 w-fit shadow-sm",
  attachment: {
    container: "flex flex-wrap gap-2 mt-2",
    root: "group relative flex items-center gap-3 p-2 bg-bg border border-border/50 rounded-xl hover:border-primary/30 transition-all shadow-sm hover:shadow-md",
    preview: "relative h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-bg border border-border/30",
    icon: "h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center flex-shrink-0",
    info: "flex-1 min-w-0",
    name: "text-xs font-medium text-text-primary truncate",
    size: "text-[10px] text-text-secondary font-medium",
    actions: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
    actionButton: "p-1.5 hover:bg-neutral-bg rounded-lg text-text-secondary hover:text-primary transition-colors",
    removeButton: "p-1.5 hover:bg-red-50 rounded-lg text-text-secondary hover:text-red-500 transition-colors",
  },
  markdown: {
    root: "prose prose-sm prose-neutral dark:prose-invert max-w-none",
    code: "bg-neutral-bg-secondary px-1.5 py-0.5 rounded text-[12px] font-mono border border-neutral-border/50 text-primary",
    paragraph: "mb-2 last:mb-0 leading-relaxed",
    list: "list-disc ml-4 mb-2 space-y-1",
    orderedList: "list-decimal ml-4 mb-2 space-y-1",
    listItem: "mb-1",
    heading: "font-bold text-text-primary mb-2 mt-4 first:mt-0",
  }
};

/**
 * AI Chat Input Styles
 */
export const aiChatInputStyles = {
  root: "p-4 border-t border-border bg-bg shrink-0",
  inner: "relative flex flex-col gap-2",
  attachmentPreview: "flex flex-wrap gap-2 mb-2 p-2 bg-neutral-bg/30 rounded-xl border border-dashed border-border/50",
  textarea: "w-full bg-neutral-bg/50 border border-border/50 rounded-2xl px-4 py-3 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[50px] max-h-[200px] scrollbar-hide",
  actionGroup: "absolute right-2 bottom-2 flex items-center gap-1 bg-bg/80 backdrop-blur-sm p-1 rounded-xl border border-border/30 shadow-sm",
  sendButton: "p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:hover:bg-primary shadow-md shadow-primary/20 flex items-center justify-center active:scale-95",
  attachButton: "p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-center active:scale-95",
  stopButton: "p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95 flex items-center justify-center",
};
