import { type FC, useMemo } from "react";
import { errorStyles } from "../styles/error.styles";

interface ErrorDetailsProps {
  error?: Error;
}

export const ErrorDetails: FC<ErrorDetailsProps> = ({ error }) => {
  const hasError = Boolean(error);

  const errorMessage = useMemo(
    () => error?.message || "Unknown error occurred",
    [error],
  );

  const errorStack = useMemo(
    () => error?.stack,
    [error],
  );

  return (
    <div className={errorStyles.contentWrapper}>
      <div className={errorStyles.headingWrapper}>
        <h2 className={errorStyles.title}>Application Error</h2>
        <p className={errorStyles.description}>
          We've encountered a technical issue. Our team has been notified and
          we're working to fix it.
        </p>
      </div>

      {hasError && (
        <div className={errorStyles.detailsBox}>
          <p className={errorStyles.message}>{errorMessage}</p>
          {errorStack && (
            <pre className={errorStyles.stack}>{errorStack}</pre>
          )}
        </div>
      )}
    </div>
  );
};
