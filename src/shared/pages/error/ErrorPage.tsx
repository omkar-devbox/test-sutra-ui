import type { FC } from "react";
import { AlertCircle } from "lucide-react";
import { Page } from "../Page/Page";
import type { ErrorPageProps } from "./types/error.types";
import { errorStyles } from "./styles/error.styles";
import { ErrorDetails } from "./items/ErrorDetails";
import { ErrorActions } from "./items/ErrorActions";

export const ErrorPage: FC<ErrorPageProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Page
      title="Something went wrong"
      subtitle="An unexpected error has occurred while rendering this page."
      breadcrumbs={[{ label: "Error" }]}
    >
      <div className={errorStyles.container}>
        <div className={errorStyles.iconWrapper}>
          <AlertCircle size={64} />
        </div>

        <div className="space-y-6">
          <ErrorDetails error={error} />
          <ErrorActions resetErrorBoundary={resetErrorBoundary} />
        </div>
      </div>
    </Page>
  );
};

export default ErrorPage;
