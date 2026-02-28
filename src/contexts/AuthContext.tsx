'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService } from '@/services/user.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Get session from server (cookies)
  const refreshAuth = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await userService.getSession();
      
      if (error || !data) {
        setUser(null);
        // Clear any stale localStorage
        localStorage.removeItem('user');
      } else {
        setUser(data.user);
        // Sync with localStorage for client-side checks
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Check auth on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  // ✅ Logout
  const logout = async () => {
    try {
      // Call logout API if you have one
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}