import React from 'react';
import { SignupForm } from './SignupForm';
import { authStyles } from '../style/auth.styles';
import { Printer, Shield, CheckCircle2 } from 'lucide-react';

export const SignupPage: React.FC = () => {
  return (
    <div className={authStyles.container}>
      <div className={authStyles.bgGlowTop} />
      <div className={authStyles.bgGlowBottom} />

      <div className={authStyles.largeCard}>
        {/* Left Branding Panel */}
        <div className={authStyles.brandingSection}>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3 text-[#ebf7ff]">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0077be] to-[#005588] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0077be]/30 border border-white/20">
                <Printer size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">Sutra UI</span>
            </div>

            <div className="space-y-3 pt-6">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
                Join the <br />
                <span className="text-cyan-400">Flex Printing Network.</span>
              </h2>
              <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-xs">
                Set up your account to track print jobs, submit paper manifests, and configure pricing nodes.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 space-y-3 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2 text-cyan-300">
              <CheckCircle2 size={16} /> Instant Access to Station Terminals
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              <CheckCircle2 size={16} /> Automated Customer Job Tracking
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className={authStyles.formSection}>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
