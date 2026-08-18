import React from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import { authStyles } from '../style/auth.styles';
import { Lock } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  return (
    <div className={authStyles.container}>
      <div className={authStyles.bgGlowTop} />
      <div className={authStyles.bgGlowBottom} />

      <div className={authStyles.card}>
        <div className="w-14 h-14 bg-[#0077be]/10 rounded-2xl flex items-center justify-center mb-6 text-[#0077be] mx-auto">
          <Lock size={28} />
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
