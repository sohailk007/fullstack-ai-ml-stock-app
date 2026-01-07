import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait until auth state is ready
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // Not authenticated → redirect
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated → render page
  return children;
};

export default PrivateRoute;
