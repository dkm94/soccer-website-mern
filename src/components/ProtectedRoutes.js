import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="secret-login" />;
};

export default ProtectedRoutes;
