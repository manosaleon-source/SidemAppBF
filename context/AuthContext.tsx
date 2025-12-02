import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '../services/api/auth';
import { User } from '../types/global.d';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromLocal = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          try {
            const u = await api.getCurrentUser() as any;
              setUser({ ...(u as any), token });
          } catch (e) {
            setUser({ id: 0, username: 'unknown', token });
          }
        }
      } catch (err) {
        // ignore
      }
      setLoading(false);
    };
    loadUserFromLocal();
  }, []);

  const login = async ({ username, password }: { username: string; password: string }) => {
    const res = await api.login(username, password) as any;
    const token = (res as any).token;
    if (token) {
      try { localStorage.setItem('token', token); } catch (e) {}
      try {
        const u = await api.getCurrentUser() as any;
        setUser({ ...(u as any), token });
      } catch (e) {
        setUser({ id: 0, username, token });
      }
    }
    router.push('/dashboard');
  };

  const logout = async () => {
    try { await api.logout(); } catch (e) {}
    setUser(null);
    try { localStorage.removeItem('token'); } catch (e) {}
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
