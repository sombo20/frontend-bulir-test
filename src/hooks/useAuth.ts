import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { RegisterFormData } from '../types/auth';
interface AuthContextData {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
  }


export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  