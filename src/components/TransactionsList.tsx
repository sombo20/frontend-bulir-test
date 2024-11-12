import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { FaSpinner } from 'react-icons/fa';
import { TransactionListProps } from '../types/transaction';
import { getStatusStyle, translateStatus } from '../utils/formatters';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const TransactionList: React.FC<TransactionListProps> = ({ transaction, onClose, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Histórico de Transações:</h2>
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-4">
            {transaction.map((transaction, index) => (
              <li key={index} className="flex justify-between items-center border p-4 rounded">
                <div className="flex flex-col">
                  <span className="font-semibold">Fornecedor: {transaction.provider_name}</span>
                  <span className="text-sm">Custo: {transaction.service_price} kz</span>
                  <span className="text-sm">Serviço: {transaction.service_name}</span>
                  <span className="text-sm text-gray-500">{dayjs(transaction.date).fromNow()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isLoading ? (
                    <FaSpinner className="animate-spin text-gray-500" />
                  ) : (
                    <div className={`px-2 py-1 rounded ${getStatusStyle(transaction.status)}`}>
                      {translateStatus(transaction.status)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className="bg-gray-300 p-2 rounded w-full mt-4">Fechar</button>
      </div>
    </div>
  );
};

export default TransactionList;
