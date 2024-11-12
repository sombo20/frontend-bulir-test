import React from 'react';
import { ReservationListProps } from '../types/reservation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { FaSpinner } from 'react-icons/fa';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const ReservationList: React.FC<ReservationListProps> = ({ reservasPendentes, onClose, onSave, isLoading }) => {

  const handleConfirmOrCancel = async (id: number, status:string) => {
    onSave(id, status)
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Reservas Pendentes</h2>
        <ul className="space-y-4">
          {reservasPendentes.map((reserva, index) => (
            <li key={index} className="flex justify-between items-center border p-4 rounded">
              <div className="flex flex-col">
                <span className="font-semibold">{reserva.userName}</span>
                <span className="text-sm text-gray-500">{dayjs(reserva.reservationDate).fromNow()}</span>
                <span className="text-sm">{reserva.serviceName}</span>
              </div>
              <div className="flex space-x-2">
              {isLoading ? (
                  <FaSpinner className="animate-spin" /> 
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-2 py-1 rounded" 
                      onClick={() => handleConfirmOrCancel(reserva.id, "confirm")}
                    >
                      Confirmar
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded" 
                      onClick={() => handleConfirmOrCancel(reserva.id, "cancell")}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="bg-gray-300 p-2 rounded w-full mt-4">Fechar</button>
      </div>
    </div>
  );
}

export default ReservationList;
