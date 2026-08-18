import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authStyles } from '../style/auth.styles';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg(null);

    try {
      await login({ email: identifier, password, remember });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Error is set in context
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      <div className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0077be]/10 rounded-full text-[#0077be] text-xs font-black uppercase tracking-wider mb-2">
          <ShieldCheck size={14} />
          SUTRA UI Enterprise Auth
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-[#004066] dark:text-[#ebf7ff] tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Enter your credentials to access your station dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {successMsg && (
          <div className={authStyles.successAlert}>
            <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className={authStyles.errorAlert}>
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Email or Contact Number</label>
          <div className="relative">
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@flexflow.com or 9876543210"
              className={authStyles.input}
            />
            <Mail size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        <div className={authStyles.inputGroup}>
          <div className="flex items-center justify-between">
            <label className={authStyles.label}>Password</label>
            <Link
              to="/auth/forgot-password"
              className="text-xs font-extrabold text-[#0077be] hover:underline uppercase tracking-wide"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={authStyles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-[#0077be] cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#0077be] focus:ring-[#0077be]"
            />
            Keep me logged in for 30 days
          </label>
        </div>

        <button type="submit" disabled={isLoading} className={authStyles.primaryBtn}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Sign In to Dashboard
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-[#0077be] hover:underline font-black">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};
