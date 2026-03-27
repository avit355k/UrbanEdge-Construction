import React, { useContext } from "react";
import { AuthContext } from "../Admin/context/Auth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RequireAuth;