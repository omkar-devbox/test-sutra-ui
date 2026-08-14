import { type FC, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Page } from "../Page/Page";
import { PATH_LABEL_MAP } from "./utils/menuMap";
import { GenericPagePlaceholder } from "./items/GenericPagePlaceholder";

export const GenericPage: FC = () => {
  const { pathname } = useLocation();

  const label = useMemo(
    () => PATH_LABEL_MAP.get(pathname) || "Page",
    [pathname],
  );

  return (
    <Page
      title={label}
      subtitle={`Welcome to the ${label} page. This is a placeholder for future content.`}
      breadcrumbs={[{ label }]}
    >
      <GenericPagePlaceholder label={label} />
    </Page>
  );
};

export default GenericPage;
