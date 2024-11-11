export type LoginFormInputs = {
    email: string;
    password: string;
  };
  
export interface ApiError {
    response: {
      data: {
        message: string;
      };
    };
  }

export interface RegisterFormData {
  name: string;
  email: string;
  nif: string;
  password: string;
  role: 'CLIENT' | 'PROVIDER';
}
  

export interface AuthProviderProps {
  children: React.ReactNode;
}