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
  reservasPendentes: number;
  balancoTotal: number;
  onOpenReservationModal: () => void;
  isLoading:boolean
}

export interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
  isDeleting?: number | null
}