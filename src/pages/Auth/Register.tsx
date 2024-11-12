import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Signupschema } from '../../schemas/validation';
import { ApiError, RegisterFormData } from '../../types/auth';
import { CustomJwtPayload } from '../../types/customJWT';
import AlertModal from '../../components/AlertModal';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(Signupschema)
  });

  const handleFormSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await register(data);
      const token = JSON.parse(localStorage.getItem("token") || '{}');
      const decoded = jwtDecode<CustomJwtPayload>(token);

      if (token) {
        if (decoded.role === 'CLIENT' || decoded.role === 'PROVIDER' ) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);

      if ((error as ApiError).response) {
        setErrorMessage((error as ApiError).response.data.message || 'Erro desconhecido');
      } else {
        setErrorMessage('Erro ao registrar, tente novamente mais tarde.');
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-8">Cadastro</h1>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            {...formRegister('name')}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            {...formRegister('email')}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NIF</label>
          <input
            type="text"
            {...formRegister('nif')}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.nif && <p className="text-red-500 text-xs mt-1">{errors.nif.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            {...formRegister('password')}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Função</label>
          <select
            {...formRegister('role')}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="CLIENT">Cliente</option>
            <option value="PROVIDER">Fornecedor</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        {successMessage && <div className="text-green-500 text-xs mt-3">{successMessage}</div>}

        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Registrar'}
        </button>
      </form>

      {showErrorModal && errorMessage && (
        <AlertModal message={errorMessage} onClose={() => setShowErrorModal(false)} />
      )}
    </div>
  );
};

export default Register;
