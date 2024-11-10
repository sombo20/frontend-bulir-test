import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: 'CLIENT' | 'PROVIDER';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return <div>Acesso Negado: Você não tem permissão para acessar esta página.</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
