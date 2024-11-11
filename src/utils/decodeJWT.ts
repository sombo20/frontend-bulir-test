import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../types/customJWT";

export const getDecodedToken = (): CustomJwtPayload | null => {
    const token = localStorage.getItem("token");  
    if (!token) return null;
    try {
        return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
