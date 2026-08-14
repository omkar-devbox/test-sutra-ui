import type { FC } from "react";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "@/shared/ui/button/Button";
import { errorStyles } from "../styles/error.styles";

interface ErrorActionsProps {
  resetErrorBoundary?: () => void;
}

export const ErrorActions: FC<ErrorActionsProps> = ({ resetErrorBoundary }) => {
  return (
    <div className={errorStyles.actionsWrapper}>
      {resetErrorBoundary ? (
        <Button
          variant="primary"
          onClick={resetErrorBoundary}
          className={errorStyles.primaryBtn}
        >
          <RotateCcw size={18} />
          Try Again
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
          className={errorStyles.primaryBtn}
        >
          <RotateCcw size={18} />
          Reload Page
        </Button>
      )}

      <Button
        variant="outline"
        onClick={() => (window.location.href = "/")}
        className={errorStyles.outlineBtn}
      >
        <Home size={18} />
        Back to Safety
      </Button>
    </div>
  );
};
