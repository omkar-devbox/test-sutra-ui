import type { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { PageProps } from "./types/page.types";
import { pageStyles } from "./styles/page.styles";
import { PageHeader } from "./items/PageHeader";

export const Page: FC<PageProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  children,
  className,
  containerClassName,
  isLoading = false,
  search,
}) => {
  return (
    <div className={cn(pageStyles.root, className)}>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        actions={actions}
        search={search}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(pageStyles.contentContainer, containerClassName)}
      >
        {isLoading ? (
          <div className={pageStyles.loaderWrapper}>
            <div className={pageStyles.spinner} />
          </div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};

export default Page;
export * from "./types/page.types";
