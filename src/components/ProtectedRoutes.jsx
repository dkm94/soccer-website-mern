import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="secret-login" />;
};

export default ProtectedRoutes;
