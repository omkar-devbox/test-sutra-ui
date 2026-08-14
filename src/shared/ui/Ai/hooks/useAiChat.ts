import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type {
  Message,
  ChatState,
  StreamingState,
  ChatActions,
  SendMessagePayload,
} from "../types";

interface UseAiChatOptions {
  initialMessages?: Message[];
  systemContext?: string;
  onMessage?: (message: Message) => void;
}

const MAX_MESSAGES = 100; // prevent memory growth
const BOOT_TIME = Date.now(); // stable timestamp for initial messages

export const useAiChat = (
  options: UseAiChatOptions = {},
): ChatState & ChatActions & { streamingState: StreamingState } => {
  const { initialMessages, systemContext, onMessage } = options;

  // initialize messages with system context fallback
  const initialState = useMemo<Message[]>(() => {
    if (initialMessages) return initialMessages;

    return [
      {
        id: "system-init",
        role: "system",
        content: systemContext || "AI Assistant initialized. Context loaded.",
        createdAt: BOOT_TIME,
        status: "sent",
      },
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help?",
        createdAt: BOOT_TIME,
        status: "sent",
      },
    ];
  }, [initialMessages, systemContext]);

  const [messages, setMessages] = useState<Message[]>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
  });

  const abortRef = useRef<AbortController | null>(null);
  const isSendingRef = useRef(false);

  const generateId = () => crypto.randomUUID(); // id generator

  // optimized + safe message update
  const updateMessage = useCallback((id: string, content: string) => {
    setMessages((prev) => {
      const lastIdx = prev.length - 1;
      const last = prev[lastIdx];

      if (last?.id === id) {
        const next = [...prev];
        next[lastIdx] = { ...last, content };
        return next;
      }

      const idx = prev.findIndex((m) => m.id === id);
      if (idx === -1) return prev;

      const next = [...prev];
      next[idx] = { ...next[idx], content };
      return next;
    });
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort(); // cancel request
    abortRef.current = null;
  }, []);

  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      const { content, attachments } = payload;

      // guard invalid or parallel sends
      if (
        (!content.trim() && (!attachments || attachments.length === 0)) ||
        isLoading ||
        isSendingRef.current
      )
        return;

      isSendingRef.current = true;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        attachments,
        createdAt: Date.now(),
        status: "sent",
      };

      setMessages((prev) => {
        const next = [...prev, userMessage];
        return next.length > MAX_MESSAGES ? next.slice(-MAX_MESSAGES) : next;
      });

      onMessage?.(userMessage);
      setIsLoading(true);

      try {
        const assistantId = generateId();

        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            status: "sending",
            isStreaming: true,
            createdAt: Date.now(),
          } as Message,
        ]);

        const controller = new AbortController();
        abortRef.current = controller;

        setStreamingState({
          isStreaming: true,
          streamingMessageId: assistantId,
        });

        // simulated AI response
        let response = `Response for: "${content}"`;

        if (attachments?.length) {
          response = `I see you've attached ${attachments.length} file(s): ${attachments
            .map((a) => a.name)
            .join(", ")}. How can I help?`;
        } else if (content.toLowerCase().includes("summarize")) {
          response =
            "Here is a summary of your page. It is modular, but virtualization can improve performance.";
        } else if (content.toLowerCase().includes("code")) {
          response = `Optimized React component:\n\n\`\`\`tsx\nimport { memo } from 'react';\nexport const MyComponent = memo(({ data }) => <div>{data}</div>);\n\`\`\``;
        }

        if (content.toLowerCase().includes("error")) {
          throw new Error("Simulated network error. Please try again.");
        }

        const words = response.split(" ");
        const chunkSize = words.length > 100 ? 5 : 2; // adaptive streaming
        let current = "";

        for (let i = 0; i < words.length; i += chunkSize) {
          if (controller.signal.aborted) break;

          await new Promise((r) => setTimeout(r, 60));

          const chunk = words.slice(i, i + chunkSize).join(" ");
          current += (current ? " " : "") + chunk;

          updateMessage(assistantId, current);
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, status: "sent", isStreaming: false }
              : m,
          ),
        );

        onMessage?.({
          id: assistantId,
          role: "assistant",
          content: current,
        } as Message);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        const errorMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: err instanceof Error ? err.message : "Something went wrong",
          status: "error",
          createdAt: Date.now(),
        };

        setMessages((prev) => [...prev, errorMsg]);
        onMessage?.(errorMsg);
      } finally {
        setIsLoading(false);
        isSendingRef.current = false;
        setStreamingState({ isStreaming: false });
        abortRef.current = null;
      }
    },
    [onMessage, isLoading, updateMessage],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "system-init",
        role: "system",
        content: systemContext || "AI Assistant initialized. Context loaded.",
        createdAt: Date.now(),
        status: "sent",
      },
    ]);
  }, [systemContext]);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
    messages,
    isLoading,
    streamingState,
    sendMessage,
    stopStreaming,
    clearChat,
    removeMessage,
  };
};
