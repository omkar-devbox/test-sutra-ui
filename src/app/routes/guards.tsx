import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/features/auth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-[#004066]/60 dark:text-[#ebf7ff]/60">
        <Loader2 size={32} className="animate-spin text-[#0077be]" />
        <span className="text-xs font-semibold tracking-wide uppercase">Authenticating...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-[#004066]/60 dark:text-[#ebf7ff]/60">
        <Loader2 size={32} className="animate-spin text-[#0077be]" />
        <span className="text-xs font-semibold tracking-wide uppercase">Authenticating...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
