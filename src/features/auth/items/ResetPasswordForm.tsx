import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authStyles } from '../style/auth.styles';

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { resetPassword, isLoading, error, clearError } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const securityChecklist = [
    { label: 'Minimum 6 characters', checked: password.length >= 6 },
    { label: 'Uppercase & lowercase letters', checked: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'Includes numerical digits or symbols', checked: /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    const isOk = await resetPassword(password);
    if (isOk) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/auth/login', {
          state: { message: 'Password updated successfully! Please log in.' },
        });
      }, 1500);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center py-4 animate-in fade-in">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
        <h3 className="text-xl font-black text-[#004066] dark:text-white">Password Updated!</h3>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Your password has been changed. Redirecting to login page...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-black text-[#004066] dark:text-[#ebf7ff] tracking-tight">
          Reset Password
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Create a new secure password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(error || localError) && (
          <div className={authStyles.errorAlert}>
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <span>{error || localError}</span>
          </div>
        )}

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>New Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={authStyles.input}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-[#0077be] cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={authStyles.input}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-[#0077be] cursor-pointer"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Security Checklist */}
        <div className="p-4 bg-slate-50 dark:bg-[#001929] rounded-2xl border border-[#0077be]/20 space-y-2.5">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Security Requirements
          </span>
          <div className="space-y-1.5">
            {securityChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    item.checked ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-transparent'
                  }`}
                >
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className={item.checked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={authStyles.primaryBtn}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Updating Password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="pt-2 text-center">
        <Link to="/auth/login" className="text-xs font-bold text-[#0077be] hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};
