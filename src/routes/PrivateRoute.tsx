import { Navigate } from "react-router-dom";
import ClientDashboard from "../pages/Client/Dashboard";
import ProviderDashboard from "../pages/Provider/Dashboard";
import { getDecodedToken } from "../utils/decodeJWT";

const ProtectedDashboard: React.FC = () => {
  const decodedToken = getDecodedToken();
  const isAuthenticated = Boolean(decodedToken);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (decodedToken?.role === 'CLIENT') {
    return <ClientDashboard />;
  } else if (decodedToken?.role === 'PROVIDER') {
    return <ProviderDashboard />;
  } else {
    return <div>Acesso Negado: Você não tem permissão para acessar esta página.</div>;
  }
};

export default ProtectedDashboard