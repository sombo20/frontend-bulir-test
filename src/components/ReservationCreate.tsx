import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { ReservationData, ReservationModalProps } from '../types/reservation';

const ReservationModal: React.FC<ReservationModalProps> = ({
  onSave,
  onClose,
  data,
  errorMessage,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationData>({
    defaultValues: {
      date: '',
      price: data.price,
    },
  });

  const onSubmit: SubmitHandler<ReservationData> = (reservationData) => {
    onSave(reservationData,data.id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Reservar Serviço</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block font-semibold">Serviço</label>
            <p className="text-gray-700">{data.name}</p>
          </div>

          <div className="mb-2">
            <label className="block font-semibold">Descrição</label>
            <p className="text-gray-700">{data.description}</p>
          </div>

          <div className="mb-2">
            <label className="block font-semibold">Provedor</label>
            <p className="text-gray-700">{data.provider_name}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="price" className="block font-semibold">Preço</label>
            <p className="text-gray-700">{data.price} USD</p>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold">Data da Reserva</label>
            <input
              id="date"
              type="datetime-local"
              {...register('date', { required: 'A data é obrigatória' })}
              className="w-full p-2 border rounded"
            />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
          </div>

          <div className="mb-4">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>

          

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className={`flex items-center ${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white px-4 py-2 rounded mb-4`}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                'Reservar Serviço'
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

export default ReservationModal;
