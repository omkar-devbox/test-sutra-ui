import React from 'react';
import { LoginForm } from './LoginForm';
import { authStyles } from '../style/auth.styles';
import { Printer, Shield, Activity } from 'lucide-react';

export const LoginPage: React.FC = () => {
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
                High-Performance <br />
                <span className="text-cyan-400">Print Control.</span>
              </h2>
              <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-xs">
                Industrial grade production queuing, real-time customer billing, and live stock management.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3 text-xs font-extrabold text-cyan-300">
              <Activity size={16} />
              <span>System Status: All Services Operational</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <Shield size={16} />
              <span>256-bit Encrypted Workstation Access</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className={authStyles.formSection}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
