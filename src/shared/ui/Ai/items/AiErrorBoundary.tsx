import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void; // external logging hook
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AiErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  // update state on error
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // side effects (logging)
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo); // allow external logger (e.g. Sentry)
    if (process.env.NODE_ENV === "development") {
      console.error("AI Component Error:", error, errorInfo); // dev-only log
    }
  }

  // reset boundary
  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    const { hasError, error } = this.state;

    if (hasError) {
      if (this.props.fallback) return this.props.fallback; // custom fallback

      return (
        <div
          role="alert" // accessibility
          className="my-4 flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-center"
        >
          {/* icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle size={20} />
          </div>

          {/* message */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-900">
              Rendering Error
            </p>
            <p className="max-w-[220px] text-xs text-red-700">
              Failed to render this message. The content might be malformed.
            </p>

            {/* optional error message (dev only) */}
            {process.env.NODE_ENV === "development" && error?.message && (
              <p className="mt-1 break-all text-[10px] text-red-500 opacity-70">
                {error.message}
              </p>
            )}
          </div>

          {/* retry */}
          <button
            onClick={this.handleReset} // reset state
            type="button" // prevent form submit
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children; // render children normally
  }
}
