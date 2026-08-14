import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false); // copy state

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value); // async clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset state
    } catch {
      setCopied(false); // fail-safe
    }
  }, [value]);

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-neutral-border/50 bg-[#1e1e1e]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-neutral-border/30 bg-neutral-800 px-4 py-2 text-xs font-mono text-neutral-400">
        <span className="opacity-80">{language}</span>

        <button
          onClick={copyToClipboard}
          aria-label="Copy code to clipboard" // accessibility
          className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none"
        >
          {copied ? (
            <Check size={14} className="text-emerald-500" />
          ) : (
            <Copy size={14} />
          )}

          <span className={copied ? "text-emerald-500" : ""}>
            {copied ? "Copied!" : "Copy code"}
          </span>
        </button>
      </div>

      {/* code */}
      <div className="overflow-x-auto p-5 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <pre className="m-0">
          <code className="whitespace-pre text-sm leading-relaxed font-mono text-neutral-300">
            {value}
          </code>
        </pre>
      </div>
    </div>
  );
};
