import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authStyles } from '../style/auth.styles';

export const OtpCard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, isLoading, error, clearError } = useAuth();

  const email = location.state?.email;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setResendNotice(true);
    setTimeout(() => setResendNotice(false), 3000);
  };

  const handleVerify = async () => {
    clearError();
    const code = otp.join('');
    const success = await verifyOtp(code);
    if (success) {
      navigate('/auth/reset-password', { state: { email, otp: code } });
    }
  };

  const isComplete = otp.every((d) => d !== '');

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300 text-center">
      <div className="w-14 h-14 bg-[#0077be]/10 rounded-2xl flex items-center justify-center mb-2 text-[#0077be] mx-auto">
        <Lock size={28} />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#004066] dark:text-[#ebf7ff] tracking-tight">
          Verification Required
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          {email ? (
            <>Enter the 6-digit code sent to <strong className="text-slate-700 dark:text-slate-200">{email}</strong>.</>
          ) : (
            'Enter the 6-digit verification code sent to your email.'
          )}
        </p>
      </div>

      {resendNotice && (
        <div className={authStyles.successAlert}>
          <CheckCircle2 size={16} />
          <span>New OTP code sent! (Try entering 123456)</span>
        </div>
      )}

      {error && (
        <div className={authStyles.errorAlert}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* 6 Digit Input Group */}
      <div className="flex items-center justify-center gap-2 md:gap-3 py-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-input-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-11 h-13 md:w-12 md:h-14 bg-slate-50 dark:bg-[#001929] border-2 border-slate-200 dark:border-[#0077be]/40 rounded-xl text-center text-xl font-black text-[#004066] dark:text-white focus:border-[#0077be] focus:outline-none transition-all"
          />
        ))}
      </div>

      <button
        type="button"
        disabled={!isComplete || isLoading}
        onClick={handleVerify}
        className={authStyles.primaryBtn}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Verifying Code...
          </>
        ) : (
          'Verify Code'
        )}
      </button>

      <div className="space-y-2 pt-2">
        <p className="text-xs font-bold text-slate-400">Didn't receive the code?</p>
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-xs font-black text-[#0077be] hover:underline uppercase tracking-wider cursor-pointer"
          >
            Resend Code
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            Resend code in <strong className="text-[#0077be]">{timer}s</strong>
          </span>
        )}
      </div>

      <div className="pt-2">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0077be]">
          <ArrowLeft size={14} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
