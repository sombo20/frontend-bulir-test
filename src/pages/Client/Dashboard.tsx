import React, { useEffect, useState } from 'react';
import DashboardSummary from '../../components/DashboardSummary';
import { Service } from '../../types/service';
import ServiceList from '../../components/ServiceList';
import { getAllServices } from '../../services/services';
import { getAllTransactionsAndAccountBalance } from '../../services/reservation';
import { Transaction } from '../../types/transaction';
import TransactionList from '../../components/TransactionsList';

const ClientDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isTransactionModalOpen, setIsTransactionsnModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservas,setReservas] = useState<Transaction[]>([]);

  const [balancoTotal, setBalancoTotal] = useState(0);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const allServices = await getAllServices();
      const allTransactionsAndBalance = await getAllTransactionsAndAccountBalance()
      setServices(allServices);
      setBalancoTotal(allTransactionsAndBalance.accountBalance)
      setReservas(allTransactionsAndBalance.pendingReservations)
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);


  const handleReservation = async (service: Service) => {
    // setIsLoading(true)
    // setIsModalOpen(false);
    
    // await fetchServices();
    // setIsLoading(false);
    console.log(service)
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

      <h2 className="text-xl font-semibold mb-4">Serviços Disponiveis</h2>

      {isLoading ? (
        <p>Carregando serviços...</p> 
      ) : (
        <ServiceList services={services} onCreate={handleReservation} isLoading={isLoading} type="CLIENT"/>
      )}

      {isTransactionModalOpen && (
        <TransactionList transaction={reservas} onClose={() => setIsTransactionsnModalOpen(false)} isLoading={isLoading}/>
      )}
    </div>
  );
};

export default ClientDashboard;
