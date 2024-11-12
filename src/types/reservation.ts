import { Service } from "./service";


export interface Reservation {
    id:number;
    userName: string;
    reservationDate: string;
    serviceName: string;
  }
  
  export interface ReservationListProps {
    reservasPendentes: Reservation[];
    onClose: () => void;
    onSave: (id:number, status:string) => void;
    isLoading: boolean
  }


export interface ReservationData {
  clientId: number;
  serviceId: number;
  date: string;
  price: number;
}
  
export interface ReservationModalProps {
  onSave: (data: ReservationData, serviceId:number) => void;
  onClose: () => void;
  isLoading: boolean;
  data: Service;
  errorMessage?: string | null
}