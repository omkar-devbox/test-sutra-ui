import { useState, useCallback } from "react";
import { AiSidebarHeader } from "./AiSidebarHeader";
import { AiChatArea } from "./AiChatArea";
import { AiChatInput } from "./AiChatInput";
import { useAiChat } from "../hooks/useAiChat";
import type { AiSuggestion, Attachment, AiChatProps } from "../types";

export const AiChat = ({
  className,
  onClose,
  showCloseButton = false,
  initialMessages,
  systemContext,
  suggestions,
  title = "AI Assistant",
  subtitle,
  styleConfig,
}: AiChatProps) => {
  const { messages, isLoading, streamingState, sendMessage, stopStreaming } =
    useAiChat({
      initialMessages,
      systemContext,
    });

  const [input, setInput] = useState(""); // input state
  const [attachments, setAttachments] = useState<Attachment[]>([]); // attachments state

  const handleSend = useCallback(() => {
    if (!input.trim() && attachments.length === 0) return; // guard empty

    sendMessage({
      content: input,
      attachments: attachments.length ? attachments : undefined,
    });

    setInput(""); // reset input

    // cleanup object URLs before clearing
    attachments.forEach((a) => {
      if (a.preview) URL.revokeObjectURL(a.preview);
    });

    setAttachments([]); // reset attachments
  }, [input, attachments, sendMessage]);

  const handleAttach = useCallback((files: FileList) => {
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined, // preview for images
      metadata: { lastModified: file.lastModified },
    }));

    setAttachments((prev) => [...prev, ...newAttachments]); // append files
  }, []);

  const handleRemoveAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((a) => a.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview); // cleanup memory
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const defaultSuggestions: AiSuggestion[] = [
    { id: "1", label: "Summarize this page", action: "summarize" },
    { id: "2", label: "Write a React component", action: "code" },
    { id: "3", label: "Check for errors", action: "error" },
  ];

  return (
    <div
      className={`flex h-full flex-col overflow-hidden bg-neutral-bg ${
        className || ""
      }`}
      style={{ backgroundColor: styleConfig?.chatArea?.bg }}
    >
      {/* header */}
      <AiSidebarHeader
        onClose={onClose || (() => {})}
        title={title}
        subtitle={
          streamingState.isStreaming
            ? "Generating response..."
            : subtitle || "Always here to help"
        }
        showClose={showCloseButton}
        styleConfig={styleConfig}
      />

      {/* chat area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <AiChatArea
          messages={messages}
          isTyping={isLoading || streamingState.isStreaming}
          suggestions={suggestions || defaultSuggestions}
          onSuggestionClick={(s) => sendMessage({ content: s.label })} // suggestion send
          styleConfig={styleConfig}
        />
      </div>

      {/* input */}
      <AiChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isTyping={isLoading || streamingState.isStreaming}
        onAttach={handleAttach}
        attachments={attachments}
        onRemoveAttachment={handleRemoveAttachment}
        onStop={stopStreaming}
        styleConfig={styleConfig}
      />
    </div>
  );
};
