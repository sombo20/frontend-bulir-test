export interface Transaction{
    id: number;
    date: string;
    status: string;
    service_name:string;
    service_price: string;
    provider_name: string;
}

export interface TransactionListProps {
    transaction: Transaction[];
    onClose: () => void;
    isLoading: boolean
  }