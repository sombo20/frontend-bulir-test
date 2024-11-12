import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ServiceFormInput } from '../types/service';

interface ServiceCreateProps {
  onAddService: (data: ServiceFormInput) => void;
  isLoading: boolean;
}

const ServiceCreate: React.FC<ServiceCreateProps> = ({ onAddService, isLoading }) => {
  const [newService, setNewService] = useState<ServiceFormInput>({ name: '', description: '', price: 0 });

  const handleSubmit = () => {
    if (newService.name && newService.description && newService.price > 0) {
      onAddService(newService);
      setNewService({ name: '', description: '', price: 0 });
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className={`flex items-center ${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white px-4 py-2 rounded mb-4`}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : <><FaPlus className="mr-2" /> Criar Serviço</>}
      </button>
    </div>
  );
};

export default ServiceCreate;
