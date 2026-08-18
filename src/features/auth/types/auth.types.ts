export interface User {
  id: string;
  fullName: string;
  email: string;
  contactNo?: string;
  avatar?: string;
  role?: string;
  department?: string;
  authProvider?: 'email' | 'google';
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  fullName: string;
  contactNo?: string;
}

export interface AuthResponse {
  message: string;
  statusCode: number;
  data: AuthResponseData;
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
}

export interface SignupData {
  email: string;
  password?: string;
  fullName: string;
  contactNo: string;
  authProvider?: 'email' | 'google';
}

export interface LoginData {
  email: string;
  password?: string;
  remember?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
