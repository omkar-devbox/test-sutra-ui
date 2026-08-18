import { type ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/theme";
import { ToastContainer } from "@/shared/ui";
import { AuthProvider } from "@/features/auth";

// Provides global application context such as theme, routing, and notifications.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sutra_ui_theme">
      {/* Provides client-side routing for the application. */}
      <BrowserRouter>
        <AuthProvider>
          {children}

          {/* Displays global toast notifications. */}
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}