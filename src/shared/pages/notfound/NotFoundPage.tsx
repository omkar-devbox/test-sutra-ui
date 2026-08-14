import type { FC } from "react";
import { notFoundStyles } from "./styles/notfound.styles";
import { NotFoundCard } from "./items/NotFoundCard";

export const NotFoundPage: FC = () => {
  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.glowPrimary} />
      <div className={notFoundStyles.glowSecondary} />
      <NotFoundCard />
    </div>
  );
};

export default NotFoundPage;
