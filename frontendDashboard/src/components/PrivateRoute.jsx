import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, requiredRole }) => {

  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (!auth.accessToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && auth.user?.role !== requiredRole){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;