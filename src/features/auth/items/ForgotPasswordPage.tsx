import React from 'react';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { authStyles } from '../style/auth.styles';
import { KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className={authStyles.container}>
      <div className={authStyles.bgGlowTop} />
      <div className={authStyles.bgGlowBottom} />

      <div className={authStyles.card}>
        <div className="w-14 h-14 bg-[#0077be]/10 rounded-2xl flex items-center justify-center mb-6 text-[#0077be] mx-auto">
          <KeyRound size={28} />
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
