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