import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../types/customJWT";
import axios from "axios";
import { ReservationData } from "../types/reservation";

export const getAllPendingReservationAndAccountBalance = async () => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const userInfo = jwtDecode<CustomJwtPayload>(token);

    const response = await axios.get(
      `/api/v1/reservations/${userInfo.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };
 
  export const createReservation = async (data:ReservationData, serviceId: number) => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const userInfo = jwtDecode<CustomJwtPayload>(token);

    const response = await axios.post(
      `/api/v1/reservations`,
        {
          "clientId":userInfo.sub,
          "serviceId":serviceId,
          "date":data.date
        },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response.data;
  };


  export const confirmOrCancelReservation = async (id:number, status:string) => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');

    const response = await axios.patch(
      `/api/v1/reservations/${id}/status`,
        {
            "status":`${status}`
        },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response.data;
  };
 

  export const getAllTransactionsAndAccountBalance = async () => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const userInfo = jwtDecode<CustomJwtPayload>(token);

    const response = await axios.get(
      `/api/v1/reservations/transactions/${userInfo.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };