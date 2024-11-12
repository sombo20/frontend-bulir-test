export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export  interface ServiceModalProps {
  newService: Service;
  setNewService: (service: Service) => void;
  onSave: (data: Service) => void;
  onClose: () => void;
  isEditing: boolean;
  isLoading: boolean
}

export interface ServiceFormInput {
  name: string;
  description: string;
  price: number;
  providerId?: string;
}


export interface DashboardSummaryProps {
  title?: string;
  reservas: number;
  balancoTotal: number;
  onOpenReservationModal?: () => void;
  isLoading:boolean
  onOpenTransactionsModal?: () => void;
  type: "CLIENT" | "PROVIDER"
}

export interface ServiceListProps {
  services: Service[];
  onEdit?: (service: Service) => void;
  onDelete?: (id: number) => void;
  isDeleting?: number | null;
  onCreate?:(service: Service) => void;
  isLoading?:boolean;
  type:"CLIENT" | "PROVIDER"
}