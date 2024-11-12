import React, { useCallback } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaHourglassHalf, FaSpinner, FaExchangeAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { DashboardSummaryProps } from '../types/service';
import { useNavigate } from 'react-router-dom';


const DashboardSummary: React.FC<DashboardSummaryProps> = ({title,reservas, balancoTotal, onOpenReservationModal ,onOpenTransactionsModal,  isLoading, type}) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
  
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 rounded mb-4 space-y-4 md:space-y-0">
      {type !== "CLIENT" && 
        <button onClick={onOpenReservationModal} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0">
        <FaHourglassHalf className="mr-2" /> {title} {isLoading ? <FaSpinner className="animate-spin mr-2" /> : reservas}
        </button>
      }

      {type !== "PROVIDER" && 
        <button onClick={onOpenTransactionsModal} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
          <FaExchangeAlt className="mr-2" /> Transações
        </button>
      }

      <div className="flex items-center">
        <FaMoneyBillAlt className="mr-2 text-green-500" />
        <span className="text-gray-700">
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            `${balancoTotal.toFixed(2)} kz`
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
