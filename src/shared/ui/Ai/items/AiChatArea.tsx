import { useRef, useEffect, memo, Component } from "react";
import { cn } from "@/shared/lib/utils";
import type { ErrorInfo, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import {
  Sparkles,
  Bot,
  User,
  AlertCircle,
  FileText,
  Download,
  X,
  File,
} from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CodeBlock } from "./CodeBlock";
import {
  aiChatAreaStyles,
  aiChatMessageStyles,
} from "../styles/aiSidebar.styles";
import type { AiChatAreaProps, Attachment, Message, AiStyleConfig } from "../types";

/* =========================================================
   🔹 ERROR BOUNDARY
   ========================================================= */

export class AiErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }; // error state

  static getDerivedStateFromError() {
    return { hasError: true }; // update on error
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("AI Component Error:", error, info); // dev log
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false }); // reset state
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center gap-3 text-center my-4"
        >
          <AlertCircle size={20} aria-hidden="true" />
          <button
            onClick={this.handleReset}
            className="text-xs text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
            type="button"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* =========================================================
   🔹 FILE ATTACHMENT
   ========================================================= */

export const FileAttachment = ({
  attachment,
  onRemove,
}: {
  attachment: Attachment;
  onRemove?: (id: string) => void;
}) => {
  const isImage = attachment.type?.startsWith("image/"); // safe check
  const isPdf = attachment.type === "application/pdf"; // pdf check

  return (
    <div className={aiChatMessageStyles.attachment.root}>
      {isImage && attachment.preview ? (
        <img
          src={attachment.preview}
          alt={attachment.name || "attachment preview"}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={aiChatMessageStyles.attachment.icon} aria-hidden="true">
          {isPdf ? <FileText size={20} /> : <File size={20} />}
        </div>
      )}

      <div className={aiChatMessageStyles.attachment.info}>
        <p className="truncate">{attachment.name}</p>
      </div>

      {attachment.url && (
        <a
          href={attachment.url}
          download
          className={aiChatMessageStyles.attachment.actionButton}
          aria-label={`Download ${attachment.name}`}
        >
          <Download size={14} />
        </a>
      )}

      {onRemove && (
        <button
          onClick={() => onRemove(attachment.id)}
          className={cn(
            aiChatMessageStyles.attachment.actionButton,
            "text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400",
          )}
          type="button"
          aria-label={`Remove ${attachment.name}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

/* =========================================================
   🔹 MESSAGE ITEM
   ========================================================= */

type MessageItemProps = {
  message: Message;
  styleConfig?: AiStyleConfig;
};

const MessageItemInner = ({ message, styleConfig }: MessageItemProps) => {
  const role = message?.role; // safe access
  const isAssistant = role === "assistant";
  const isUser = role === "user";
  const isSystem = role === "system";

  const messageStyles = isUser
    ? styleConfig?.message?.user
    : isAssistant
      ? styleConfig?.message?.assistant
      : undefined;

  return (
    <div className={aiChatMessageStyles.wrapper(role)}>
      <div className={aiChatMessageStyles.avatar(role)} aria-hidden="true">
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </div>

      <div className="flex flex-col gap-2 max-w-[85%]">
        <div
          className={aiChatMessageStyles.bubble(role)}
          style={{
            backgroundColor: messageStyles?.bg,
            color: messageStyles?.text,
          }}
        >
          {isSystem ? (
            <span>{message?.content}</span>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={{
                code({
                  inline,
                  className,
                  children,
                }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, "")}
                    />
                  ) : (
                    <code>{children}</code>
                  );
                },
              }}
            >
              {message?.content || ""}
            </ReactMarkdown>
          )}
        </div>

        {Array.isArray(message?.attachments) &&
          message.attachments.map((file: Attachment) => (
            <FileAttachment key={file.id} attachment={file} />
          ))}
      </div>
    </div>
  );
};

export const MessageItem = memo(
  MessageItemInner,
  (prev, next) => prev.message === next.message, // shallow optimization
);

/* =========================================================
   🔹 CHAT AREA
   ========================================================= */

export const AiChatArea = ({ messages, isTyping }: AiChatAreaProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null); // typed ref

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100; // threshold

    if (isNearBottom) {
      rowVirtualizer.scrollToOffset(totalSize, { align: "end" }); // smooth auto scroll
    }
  }, [messages.length, totalSize, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className={aiChatAreaStyles.root}
      role="log"
      aria-live="polite"
    >
      <div style={{ height: totalSize, position: "relative" }}>
        {items.map((row: any) => {
          const msg = messages[row.index];

          if (!msg) return null; // safety

          return (
            <div
              key={msg.id}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${row.start}px)`,
                width: "100%",
              }}
            >
              <AiErrorBoundary>
                <MessageItem message={msg} />
              </AiErrorBoundary>
            </div>
          );
        })}
      </div>

      {isTyping && (
        <div
          className="p-3 text-sm text-neutral-400 flex gap-2 items-center"
          aria-live="polite"
        >
          <Sparkles className="animate-pulse" size={14} aria-hidden="true" />
          <span>Thinking...</span>
        </div>
      )}
    </div>
  );
};
