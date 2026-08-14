import type { ReactNode } from "react";

export interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
