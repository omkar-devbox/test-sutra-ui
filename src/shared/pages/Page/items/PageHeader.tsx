import type { FC, ReactNode } from "react";
import type { Breadcrumb, PageSearchConfig } from "../types/page.types";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { PageSearchInput } from "./PageSearchInput";
import { pageStyles } from "../styles/page.styles";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  search?: PageSearchConfig;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  search,
}) => {
  return (
    <div className={pageStyles.headerWrapper}>
      <div className={pageStyles.headerSpace}>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />

        <div className={pageStyles.titleWrapper}>
          <h1 className={pageStyles.title}>{title}</h1>

          {subtitle && (
            <p className={pageStyles.subtitle}>{subtitle}</p>
          )}
        </div>
      </div>

      <div className={pageStyles.actionsWrapper}>
        {search && <PageSearchInput search={search} />}
        {actions}
      </div>
    </div>
  );
};
