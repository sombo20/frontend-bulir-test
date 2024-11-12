import axios from "axios";
import { ServiceFormInput } from "../types/service";
import { CustomJwtPayload } from "../types/customJWT";
import { jwtDecode } from "jwt-decode";


export const createService = async (data: ServiceFormInput) => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const response = await axios.post(
      `/api/v1/services`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        providerId: data.providerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };

  export const getAllServicesById = async () => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const userInfo = jwtDecode<CustomJwtPayload>(token);

    const response = await axios.get(
      ` /api/v1/services/${userInfo.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };


  export const getAllServices = async () => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
   
    const response = await axios.get(
      ` /api/v1/services`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };

export const deleteService = async (id: number)=> {
  const token = JSON.parse(localStorage.getItem("token") || '{}');
    const response = await axios.delete(`/api/v1/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  export const updateService = async (id:number, data: ServiceFormInput) => {
    const token = JSON.parse(localStorage.getItem("token") || '{}');
    const response = await axios.put(
      `/api/v1/services/${id}`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  };