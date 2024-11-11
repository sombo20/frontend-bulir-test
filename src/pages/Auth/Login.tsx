import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { jwtDecode } from 'jwt-decode';
import { ApiError, LoginFormInputs } from '../../types/auth';
import { CustomJwtPayload } from '../../types/customJwtPayload';
import { loginSchema } from '../../schemas/validation';


const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      const token = JSON.parse(localStorage.getItem("token") || '{}');
      const decoded = jwtDecode<CustomJwtPayload>(token);

      if (decoded.role === 'CLIENT' || decoded.role === 'PROVIDER' ) {
        navigate('/');
      }
    } catch (error: unknown) {
      if ((error as ApiError).response) {
        setErrorMessage((error as ApiError).response.data.message || 'Erro desconhecido');
      } else {
        setErrorMessage('Erro ao registrar, tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);  
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Senha"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {errorMessage && <div className="text-red-500 text-lg mt-3">{errorMessage}</div>}

          <button
            type="submit"
            disabled={isLoading}  
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="loader">Carregando...</span>  
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleRedirectToRegister}
            className="text-blue-600 hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
