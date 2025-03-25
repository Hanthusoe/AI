import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, userData } = useAuth();

  if (!user || !userData || !allowedRoles.includes(userData.role)) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default RoleRoute;
