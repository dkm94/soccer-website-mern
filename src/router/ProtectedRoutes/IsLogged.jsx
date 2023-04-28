import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const IsLogged = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="secret-login" />;
};

export default IsLogged;
