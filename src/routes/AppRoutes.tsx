import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ClientDashboard from '../pages/Client/Dashboard';
import ProviderDashboard from '../pages/Provider/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* public routers */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* private routers */}
        <Route
          path="/client/dashboard"
          element={<PrivateRoute requiredRole="CLIENT"><ClientDashboard /></PrivateRoute>}
        />
        <Route
          path="/provider/dashboard"
          element={<PrivateRoute requiredRole="PROVIDER"><ProviderDashboard /></PrivateRoute>}
        />

        {/* main redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
