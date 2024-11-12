import React from 'react';
import { FaEdit, FaShoppingCart, FaSpinner, FaTrash } from 'react-icons/fa';
import { ServiceListProps } from '../types/service';


const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit, onDelete, isDeleting, onCreate, isLoading, type }) => (
  <ul className="space-y-4">
    {services.map((service) => (
      <li key={service.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded space-y-2 md:space-y-0">
        <div>
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p className="text-gray-700">{service.description}</p>
          <p className="text-gray-500">$ {service.price}</p>
        </div>
        <div className="flex space-x-2">
          {
          type !== "CLIENT" && 
            <button onClick={() => onEdit && onEdit(service)} className="text-blue-500">
              {isDeleting !== service.id && ( <FaEdit />)}
            </button>
          }
          
          {
          type !== "CLIENT" && 
            <button onClick={() => onDelete && onDelete(service.id)} className="text-red-500">
            {isDeleting === service.id ? (
                <FaSpinner className="animate-spin" /> 
              ) : ( 
                <FaTrash />
              )}
            </button>
          }

        {
          type !== "PROVIDER" && 
            <button onClick={() => onCreate && onCreate(service)} className="text-red-500">
            {isLoading ? (
                <FaSpinner className="animate-spin" /> 
              ) : ( 
                <FaShoppingCart />
              )}
            </button>
          }
        </div>
      </li>
    ))}
  </ul>
);

export default ServiceList;
