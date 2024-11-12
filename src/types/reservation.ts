export interface Reservation {
    userName: string;
    reservationDate: string;
    serviceName: string;
  }
  
  export interface ReservationListProps {
    reservasPendentes: Reservation[];
    onClose: () => void;
  }