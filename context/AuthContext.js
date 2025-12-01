import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../services/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const userData = await api.getUser();
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    };

    loadUserFromCookies();
  }, []);

  const login = async (credentials) => {
    const userData = await api.login(credentials);
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};