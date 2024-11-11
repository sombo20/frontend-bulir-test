import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProtectedDashboard from './PrivateRoute';
import { getDecodedToken } from '../utils/decodeJWT';

const AppRoutes: React.FC = () => {
  const decodedToken = getDecodedToken();
  const isAuthenticated = Boolean(decodedToken);

  return (
    <Router>
      <Routes>
        {/* Redirect authenticated users based on role */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

      <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
      
        {/* Private routes */}
        <Route path="/" element={<ProtectedDashboard />} />


        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
