import axios from "axios";
import { RegisterFormData } from "../types/auth";

export const register = async (data: RegisterFormData)=> {
    const response = await axios.post(`/api/v1/users`, {
        name: data.name,
        email: data.email,
        nif: data.nif,
        password: data.password,
        role: data.role,
    });
    return response.data;
  };