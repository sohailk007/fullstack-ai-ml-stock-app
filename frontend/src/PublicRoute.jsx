import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  // Wait until auth state is ready
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // Already logged in → redirect
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in → allow access
  return children;
};

export default PublicRoute;
