import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const IsMod = ({ isMod }) => {
  console.log('🚀 ~ file: IsMod.jsx:5 ~ IsMod ~ isMod:', isMod);
  return isMod ? <Outlet /> : <Navigate to="backoffice" />;
};

export default IsMod;
