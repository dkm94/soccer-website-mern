import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const IsAdmin = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="backoffice" />;
};

export default IsAdmin;
