import React from 'react';
import { FaDollarSign, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface ReservationBalanceProps {
  reservasPendentes: number;
  reservasConfirmadas: number;
  reservasCanceladas: number;
  balancoTotal: number;
  onReservationClick: () => void;
}

const ReservationBalance: React.FC<ReservationBalanceProps> = ({
  reservasPendentes,
  reservasConfirmadas,
  reservasCanceladas,
  balancoTotal,
  onReservationClick,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded mb-4 space-y-4 md:space-y-0">
    <button onClick={onReservationClick} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
      <FaHourglassHalf className="mr-2" /> Reservas Pendentes: {reservasPendentes}
    </button>
    <div className="flex items-center">
      <FaCheckCircle className="mr-2 text-green-600" />
      <span className="text-gray-700">Confirmadas: {reservasConfirmadas}</span>
    </div>
    <div className="flex items-center">
      <FaTimesCircle className="mr-2 text-red-600" />
      <span className="text-gray-700">Canceladas: {reservasCanceladas}</span>
    </div>
    <div className="flex items-center">
      <FaDollarSign className="mr-2 text-green-500" />
      <span className="text-gray-700">Balanço Total: ${balancoTotal.toFixed(2)}</span>
    </div>
  </div>
);

export default ReservationBalance;
