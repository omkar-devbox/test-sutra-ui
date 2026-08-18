import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authStyles } from '../style/auth.styles';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signup(formData);
      navigate('/auth/login', {
        state: { message: 'Account registered successfully! Please log in.' },
      });
    } catch (err) {
      // Error in context
    }
  };

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-[#004066] dark:text-[#ebf7ff] tracking-tight">
          Create Account
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Register to start managing print station manifests.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className={authStyles.errorAlert}>
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
              className={authStyles.input}
            />
            <User size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
              className={authStyles.input}
            />
            <Mail size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Contact Number</label>
          <div className="relative">
            <input
              type="tel"
              required
              value={formData.contactNo}
              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
              placeholder="9876543210"
              className={authStyles.input}
            />
            <Phone size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        <div className={authStyles.inputGroup}>
          <label className={authStyles.label}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

        <button type="submit" disabled={isLoading} className={authStyles.primaryBtn}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Get Started Now
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#0077be] hover:underline font-black">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
