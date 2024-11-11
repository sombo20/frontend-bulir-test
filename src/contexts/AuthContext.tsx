import  { createContext,} from 'react';
import { RegisterFormData } from '../types/auth';


interface AuthContextData {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterFormData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);