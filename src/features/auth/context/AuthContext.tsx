import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginData, SignupData } from '../types/auth.types';
import dummyData from '../data/dummy.json';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sutra_auth_user');
    const token = localStorage.getItem('sutra_access_token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse sutra_auth_user', err);
        logout();
      }
    } else {
      // If token is missing, force logout state
      setUser(null);
      localStorage.removeItem('sutra_auth_user');
      localStorage.removeItem('sutra_access_token');
      localStorage.removeItem('sutra_refresh_token');
    }
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sutra_access_token' && !e.newValue) {
        console.log('[SutraAuth] Token removed from storage, logging out...');
        logout();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const token = localStorage.getItem('sutra_access_token');
        if (!token) {
          console.log('[SutraAuth] Token missing on window focus, logging out...');
          logout();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const input = data.email.toLowerCase().trim();
      const matching = dummyData.demoCredentials.find(
        (cred) => cred.email.toLowerCase() === input || cred.contactNo === input
      );

      if (matching && (data.password === matching.password || data.password === '123456' || data.password === 'Password@123')) {
        const u = matching.user as User;
        setUser(u);
        localStorage.setItem('sutra_auth_user', JSON.stringify(u));
        localStorage.setItem('sutra_access_token', matching.accessToken);
        localStorage.setItem('sutra_refresh_token', matching.refreshToken);
        return;
      }

      // Default demo login for any valid email/password
      if (input.includes('@') && data.password && data.password.length >= 6) {
        const demoUser: User = {
          id: `usr_${Date.now()}`,
          fullName: input.split('@')[0].toUpperCase(),
          email: input,
          role: 'user',
          department: 'Operations',
        };
        setUser(demoUser);
        localStorage.setItem('sutra_auth_user', JSON.stringify(demoUser));
        localStorage.setItem('sutra_access_token', 'demo_token_sutra_123');
        return;
      }

      throw new Error('Invalid email/contact number or password.');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Demo signup
      console.log('Registered new user:', data.email);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('sutra_auth_user');
    localStorage.removeItem('sutra_access_token');
    localStorage.removeItem('sutra_refresh_token');
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (otp === dummyData.mockOtp || otp.length === 6) {
        return true;
      }
      throw new Error('Invalid OTP code. Try entering 123456.');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (password.length >= 6) {
        return true;
      }
      throw new Error('Password must be at least 6 characters.');
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        verifyOtp,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
