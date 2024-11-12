import React, { useEffect, useState } from 'react';
import DashboardSummary from '../../components/DashboardSummary';
import { Service } from '../../types/service';
import ServiceList from '../../components/ServiceList';
import { getAllServices } from '../../services/services';
import { createReservation, getAllTransactionsAndAccountBalance } from '../../services/reservation';
import { Transaction } from '../../types/transaction';
import TransactionList from '../../components/TransactionsList';
import ReservationModal from '../../components/ReservationCreate';
import { ReservationData } from '../../types/reservation';
import isAPIError from '../../utils/api';

const ClientDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isTransactionModalOpen, setIsTransactionsnModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservas, setReservas] = useState<Transaction[]>([]);
  const [reservasData, setReservasData] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balancoTotal, setBalancoTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const allServices = await getAllServices();
      const allTransactionsAndBalance = await getAllTransactionsAndAccountBalance();
      setServices(allServices);
      setBalancoTotal(allTransactionsAndBalance.accountBalance);
      setReservas(allTransactionsAndBalance.pendingReservations);
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleReservation = async (data: Service) => {
    setReservasData([data]);
    setIsModalOpen(true);
  };
  
  
  const handleSave = async (data: ReservationData, serviceId: number) => {
    setIsLoading(true);
    setErrorMessage(null);
  
    try {
      await createReservation(data, serviceId);
      await fetchServices();
      setIsModalOpen(false);
    } catch (error: unknown) {
      console.error("Erro ao criar reserva:", error);
  
      if (isAPIError(error) && error.response.status === 400 && error.response.data.message === "Insufficient balance") {
        setErrorMessage("Saldo insuficiente para completar a reserva.");
      } else if(isAPIError(error) && error.response.status === 400 && error.response.data.message === "There's already a pending reservation for this service."){
        setErrorMessage("Já existe uma reserva pendente para este serviço.");
      }else{
        setErrorMessage("Erro ao criar a reserva. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  const handleClose = () => {
    setIsModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <DashboardSummary
        type="CLIENT"
        reservas={0}
        balancoTotal={balancoTotal}
        isLoading={isLoading}
        onOpenTransactionsModal={() => setIsTransactionsnModalOpen(true)}
      />

      <h2 className="text-xl font-semibold mb-4">Serviços Disponíveis</h2>

      {isLoading ? (
        <p>Carregando serviços...</p>
      ) : (
        <ServiceList services={services} onCreate={handleReservation} isLoading={isLoading} type="CLIENT" />
      )}

      {isTransactionModalOpen && (
        <TransactionList transaction={reservas} onClose={() => setIsTransactionsnModalOpen(false)} isLoading={isLoading} />
      )}

      {isModalOpen && (
        <ReservationModal
          data={reservasData && reservasData[0]}
          onSave={handleSave}
          onClose={handleClose}
          isLoading={isLoading}
          errorMessage={errorMessage} 
        />
      )}
    </div>
  );
};

export default ClientDashboard;
