import React, { useCallback } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaHourglassHalf, FaDollarSign, FaSpinner } from 'react-icons/fa';
import { DashboardSummaryProps } from '../types/service';
import { useNavigate } from 'react-router-dom';


const DashboardSummary: React.FC<DashboardSummaryProps> = ({ reservasPendentes, balancoTotal, onOpenReservationModal , isLoading}) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
}, [navigate]);



  
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded mb-4 space-y-4 md:space-y-0">
      <button onClick={onOpenReservationModal} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0">
        <FaHourglassHalf className="mr-2" /> Reservas Pendentes: {isLoading ? <FaSpinner className="animate-spin mr-2" /> : reservasPendentes}
      </button>
      <div className="flex items-center">
        <FaDollarSign className="mr-2 text-green-500" />
        <span className="text-gray-700">
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            `Total: ${balancoTotal.toFixed(2)}`
          )}
        </span>
      </div>
      <button onClick={logout} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0">
        <AiOutlineLogout className="mr-2" /> 
      </button>
    </div>
  );
}
export default DashboardSummary
