import React, { useEffect, useState } from 'react';
import { Service, ServiceFormInput } from '../../types/service';
import DashboardSummary from '../../components/DashboardSummary';
import { FaPlus } from 'react-icons/fa';
import ServiceList from '../../components/ServiceList';
import ReservationList from '../../components/ReservationList';
import ServiceModal from '../../components/ServiceModal';
import { CustomJwtPayload } from '../../types/customJWT';
import { jwtDecode } from 'jwt-decode';
import { createService, deleteService, getAllServices, updateService } from '../../services/services';
import { confirmOrCancelReservation, getAllPendingReservationAndAccountBalance } from '../../services/reservation';
import { Reservation } from '../../types/reservation';

const ProviderDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [newService, setNewService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null); 
  const [reservas,setReservas] = useState<Reservation[]>([]) 

  const [reservasPendentes,setReservasPendentes] = useState(0);
  const [balancoTotal, setBalancoTotal] = useState(0);

  const handleAddService = async (data: ServiceFormInput) => {
    if (data.name && data.description && data.price > 0) {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token") || '{}');
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const serviceData = { ...data, providerId: decoded.sub, id: Date.now() };
      await createService(serviceData);
      setIsModalOpen(false);

      await fetchServices();
      setNewService(null);
      setIsLoading(false);
    }
  };



  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const allServices = await getAllServices();
      const allPendingAndBalance = await getAllPendingReservationAndAccountBalance()
      setServices(allServices);
      setBalancoTotal(allPendingAndBalance.accountBalance)
      setReservasPendentes(allPendingAndBalance.totalPending)
      setReservas(allPendingAndBalance.pendingReservations)
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditService = async (service: Service) => {
    setNewService(service);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateService = async (updatedService: Service) => {
    setIsLoading(true)
    setServices((prevServices) =>
      prevServices.map((service) => (service.id === updatedService.id ? updatedService : service))
    );
    setNewService(null);
    setIsEditing(false);
    setIsModalOpen(false);
    await updateService(updatedService.id, updatedService)
    setIsLoading(false);
  };

  const handleDeleteService = async (id: number) => {
    setIsDeleting(id);
    const serviceToDelete = services.find((service) => service.id === id);
    if (serviceToDelete) {
      await deleteService(id);
      setServices((prevServices) => prevServices.filter((service) => service.id !== id));
    }
    setIsDeleting(null);
  };

  const handleConfirmOrCancel = async (id: number, status:string) => {
    setIsLoading(true)
    setIsModalOpen(false);
    await confirmOrCancelReservation(id, status);
    await fetchServices();
    setIsLoading(false);
  };
  

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <DashboardSummary
        reservasPendentes={reservasPendentes}
        balancoTotal={balancoTotal}
        isLoading={isLoading}
        onOpenReservationModal={() => setIsReservationModalOpen(true)}
      />

      <h2 className="text-xl font-semibold mb-4">Meus Serviços</h2>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsEditing(false);
          setNewService({ id: 0, name: '', description: '', price: 0 });
        }}
        className={`flex items-center ${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white px-4 py-2 rounded mb-4`}
        disabled={isLoading} 
      >
        {isLoading ? "Carregando..." : <><FaPlus className="mr-2" /> Criar Serviço</>}
      </button>

      {isLoading ? (
        <p>Carregando serviços...</p> 
      ) : (
        <ServiceList services={services} onEdit={handleEditService} onDelete={handleDeleteService} isDeleting={isDeleting}/>
      )}
      {isReservationModalOpen && (
        <ReservationList reservasPendentes={reservas} onClose={() => setIsReservationModalOpen(false)} onSave={handleConfirmOrCancel} isLoading={isLoading}/>
      )}
      {isModalOpen && (
        <ServiceModal
          newService={newService!}
          setNewService={setNewService}
          onSave={isEditing ? handleUpdateService : handleAddService}
          onClose={() => setIsModalOpen(false)}
          isEditing={isEditing}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
