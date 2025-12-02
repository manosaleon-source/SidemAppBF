import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as api from '../services/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromLocal = () => {
      try{
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) setUser({ token });
      }catch(err){/* ignore */}
      setLoading(false);
    };
    loadUserFromLocal();
  }, []);

  const login = async (credentials) => {
    // credentials expected to contain { username, password }
    const { username, password } = credentials;
    const res = await api.login(username, password);
    // res expected to be { token }
    const token = res.token;
    if (token) {
      try{ localStorage.setItem('token', token); }catch(err){}
      setUser({ token });
    }
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