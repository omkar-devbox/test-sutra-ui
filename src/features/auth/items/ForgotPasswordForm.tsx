import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, KeyRound, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authStyles } from '../style/auth.styles';

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="space-y-6 text-center animate-in fade-in py-2">
        <div className={authStyles.successAlert}>
          <span>Verification instructions sent to <strong>{email}</strong>. Check your inbox.</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/auth/verify', { state: { email } })}
          className={authStyles.primaryBtn}
        >
          <KeyRound size={18} />
          Enter Verification Code (OTP)
        </button>

        <button
          type="button"
          onClick={() => setIsSent(false)}
          className={authStyles.secondaryBtn}
        >
          Resend Instructions
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-black text-[#004066] dark:text-[#ebf7ff] tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Enter your registered email address to receive reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className={authStyles.input}
            />
            <Mail size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className={authStyles.primaryBtn}>
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending Code...
            </>
          ) : (
            <>
              Send Reset Link & Code
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="pt-2 text-center">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-xs font-bold text-[#0077be] hover:underline">
          <ArrowLeft size={14} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
