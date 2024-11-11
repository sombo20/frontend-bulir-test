import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { login as loginService } from '../services/authService';
import { register as registerService } from '../services/registerService';
import { AuthProviderProps, RegisterFormData } from '../types/auth';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    try {
      const dataResponse = await loginService(email, password);
      localStorage.setItem('token', JSON.stringify(dataResponse));
      setToken(token);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const register = async (data:RegisterFormData) => {
    try {
      const dataResponse:unknown  = await registerService(data);
      localStorage.setItem('token', JSON.stringify(dataResponse));
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
