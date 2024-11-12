import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Service, ServiceModalProps } from '../types/service';
import { serviceSchema } from '../schemas/validation';
import { FaSpinner } from 'react-icons/fa';

type ServiceForm = {
  name: string;
  description: string;
  price: number;
};

const ServiceModal: React.FC<ServiceModalProps> = ({ newService, onSave, onClose, isEditing , isLoading}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceForm>({
    resolver: yupResolver(serviceSchema),
    defaultValues: newService,
  });

  const onSubmit: SubmitHandler<ServiceForm> = (data) => {
    onSave(data as Service);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Editar Serviço' : 'Criar Serviço'}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label htmlFor="title" className="block font-semibold">Título do Serviço</label>
            <input
              id="title"
              type="text"
              {...register('name')}
              placeholder="Título do Serviço"
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="description" className="block font-semibold">Descrição do Serviço</label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Descrição do Serviço"
              className="w-full p-2 border rounded"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="price" className="block font-semibold">Preço do Serviço</label>
            <input
              id="price"
              type="number"
              {...register('price')}
              placeholder="Preço do Serviço"
              className="w-full p-2 border rounded"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div className="flex space-x-4 mt-4">
            <button type="submit"  
            className={`flex items-center ${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white px-4 py-2 rounded mb-4`}
            disabled={isLoading} >
               {isLoading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : isEditing ? (
                  'Atualizar Serviço'
                ) : (
                  'Adicionar Serviço'
                )}
            </button>
            {!isLoading && (
              <button 
                type="button" 
                onClick={onClose} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg mb-4 shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
