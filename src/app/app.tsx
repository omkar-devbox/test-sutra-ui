import { Providers } from "./providers";
import { AppRouter } from "./routes/routes";
import { ErrorBoundary } from "@/shared/pages/error/ErrorBoundary";

// Wraps the application with global providers and error handling.
function App() {
  return (
    <Providers>
      {/* Catches unexpected runtime errors across the application. */}
      <ErrorBoundary>
        {/* Handles application-level routing. */}
        <AppRouter />
      </ErrorBoundary>
    </Providers>
  );
}

export default App;