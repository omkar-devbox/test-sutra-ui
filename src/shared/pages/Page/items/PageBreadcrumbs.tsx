import { type FC, useMemo } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import type { Breadcrumb } from "../types/page.types";
import { pageStyles } from "../styles/page.styles";

interface PageBreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export const PageBreadcrumbs: FC<PageBreadcrumbsProps> = ({ breadcrumbs }) => {
  const renderedBreadcrumbs = useMemo(
    () =>
      breadcrumbs.map((bc, index) => (
        <div key={`${bc.label}-${index}`} className={pageStyles.breadcrumbItem}>
          <ChevronRight size={12} className={pageStyles.separator} />
          {bc.path ? (
            <Link to={bc.path} className="hover:text-primary transition-colors">
              {bc.label}
            </Link>
          ) : bc.onClick ? (
            <button
              onClick={bc.onClick}
              className="hover:text-primary transition-colors text-text-primary font-semibold focus:outline-none"
            >
              {bc.label}
            </button>
          ) : (
            <span className="text-text-primary font-semibold">{bc.label}</span>
          )}
        </div>
      )),
    [breadcrumbs],
  );

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className={pageStyles.nav}>
      <Link to="/" className={pageStyles.homeIcon}>
        <Home size={14} />
      </Link>
      {renderedBreadcrumbs}
    </nav>
  );
};
