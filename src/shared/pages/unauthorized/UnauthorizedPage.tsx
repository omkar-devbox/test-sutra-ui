import type { FC } from "react";
import { unauthorizedStyles } from "./styles/unauthorized.styles";
import { UnauthorizedCard } from "./items/UnauthorizedCard";

export const UnauthorizedPage: FC = () => {
  return (
    <div className={unauthorizedStyles.container}>
      <div className={unauthorizedStyles.glowPrimary} />
      <div className={unauthorizedStyles.glowSecondary} />
      <UnauthorizedCard />
    </div>
  );
};

export default UnauthorizedPage;
