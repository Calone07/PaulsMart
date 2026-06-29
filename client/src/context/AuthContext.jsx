import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, registerService, getMe, logout as logoutApi } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerService(name, email, password);
    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
