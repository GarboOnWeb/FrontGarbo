import { Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const RouteGuard = ({ children, roles, sectors }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verifica se o usuário tem uma role permitida
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Verifica se o usuário pertence ao setor permitido
  if (sectors && !sectors.includes(user.sector)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default RouteGuard;
