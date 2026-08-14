# 🤖 AI Assistant UI Component (`@/shared/ui/Ai`)

Welcome to the comprehensive documentation for the **AI Assistant UI Component Suite** in the `omkar-devbox` design system.

This module provides a turn-key, feature-rich conversational AI sidebar and chat interface with real-time streaming response handling, attachment uploads, markdown code block rendering, dynamic suggestion chips, and full dark-mode styling support.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Props Specification](#-exhaustive-api--props-specification)
   - [`<AiChat />`](#aichat-)
   - [`<AiSidebar />`](#aisidebar-)
   - [`useAiChat` Hook](#useaichat-hook)
4. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Full Embedded Chat Sidebar](#recipe-1-full-embedded-chat-sidebar)
   - [Recipe 2: Custom Suggestions & Prompt Templates](#recipe-2-custom-suggestions--prompt-templates)
   - [Recipe 3: Streaming API Integration](#recipe-3-streaming-api-integration)
5. [Design Tokens & Theme Customization](#-design-tokens--theme-customization)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🤖 Overview & Core Architecture

The AI module is engineered for seamless integration into dashboards, code editors, and content creation tools. It decouples state management, streaming handlers, and rendering subcomponents.

### Key Capabilities:
- 💬 **Conversational Interface**: Rich message bubbles with user avatar support, timestamps, and status badges.
- ⚡ **Streaming Response Simulation/Handling**: Built-in support for chunked message streaming and cancellation.
- 📎 **File Attachment Preview**: Image and document upload previews with automatic object URL memory management.
- 💻 **Syntax Highlighted Code Blocks**: Dedicated `<CodeBlock />` component with copy-to-clipboard functionality.
- 🎨 **Theme Tokens**: Custom color overrides via `styleConfig` and dark mode readiness.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [index.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/index.ts)
- Types & Interfaces: [types/index.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/types/index.ts)
- Custom Hook: [hooks/useAiChat.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/hooks/useAiChat.ts)
- Container Component: [items/AiChat.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/items/AiChat.tsx)
- Sidebar Wrapper: [items/AiSidebar.tsx](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/items/AiSidebar.tsx)
- Styling Tokens: [styles/aiSidebar.styles.ts](file:///home/omkar/Documents/system_mechatronics/CVForge/code/CVForge_frontend%20%28Copy%29/src/shared/ui/Ai/styles/aiSidebar.styles.ts)

---

## 🛠 Exhaustive API & Props Specification

### `<AiChat />`

The main orchestrator component managing user input, attachments, message rendering, and streaming controls.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"AI Assistant"` | Header title text displayed at top of chat. |
| `subtitle` | `string` | `"Always here to help"` | Subtitle or status prompt. |
| `showCloseButton` | `boolean` | `false` | Whether to display a close icon button in header. |
| `onClose` | `() => void` | `undefined` | Callback invoked when close button is clicked. |
| `initialMessages` | `Message[]` | `[]` | Seed messages for initial render. |
| `systemContext` | `string` | `undefined` | Optional system prompt to instruct assistant persona. |
| `suggestions` | `AiSuggestion[]` | Pre-defined | Interactive suggestion chips shown when chat is empty. |
| `styleConfig` | `AiStyleConfig` | `undefined` | Custom visual overrides for colors, borders, and backgrounds. |

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Full Embedded Chat Sidebar

```tsx
import { AiSidebar } from "@/shared/ui/Ai";
import { useState } from "react";

export function DashboardWithAi() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen">
      <main className="flex-1 p-6">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Open AI Assistant
        </button>
      </main>

      <AiSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="omkar-devbox Copilot"
        subtitle="Powered by LLM API"
      />
    </div>
  );
}
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: How do I wire this component to my backend LLM endpoint?**
> Pass a custom `sendMessage` handler or extend the `useAiChat` hook to post user payloads to your backend API server.

**Q: Does it handle image attachments?**
> Yes! Selected images generate browser `ObjectURL` previews automatically and attach as `Attachment` metadata objects.

---

Part of the **omkar-devbox UI Component Architecture**. Built with React, TypeScript, and Tailwind CSS.
