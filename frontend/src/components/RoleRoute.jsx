import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/products" replace />;

  return children;
};

export default RoleRoute;
