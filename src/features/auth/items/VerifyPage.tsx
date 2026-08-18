import React from 'react';
import { OtpCard } from './OtpCard';
import { authStyles } from '../style/auth.styles';

export const VerifyPage: React.FC = () => {
  return (
    <div className={authStyles.container}>
      <div className={authStyles.bgGlowTop} />
      <div className={authStyles.bgGlowBottom} />

      <div className={authStyles.card}>
        <OtpCard />
      </div>
    </div>
  );
};

export default VerifyPage;
