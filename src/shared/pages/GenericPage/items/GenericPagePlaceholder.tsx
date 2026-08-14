import type { FC } from "react";
import { genericPageStyles } from "../styles/genericPage.styles";

interface GenericPagePlaceholderProps {
  label: string;
}

export const GenericPagePlaceholder: FC<GenericPagePlaceholderProps> = ({ label }) => {
  return (
    <div className={genericPageStyles.card}>
      <div className={genericPageStyles.avatar}>
        <span className={genericPageStyles.avatarInitial}>
          {label.charAt(0)}
        </span>
      </div>

      <h2 className={genericPageStyles.title}>
        {label} Content
      </h2>

      <p className={genericPageStyles.description}>
        This page is currently under development. Please check back later for
        updates and new features.
      </p>
    </div>
  );
};
