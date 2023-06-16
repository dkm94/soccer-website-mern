import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const IsMod = ({ isMod }) => {
  return isMod ? <Outlet /> : <Navigate to="backoffice" />;
};

export default IsMod;
