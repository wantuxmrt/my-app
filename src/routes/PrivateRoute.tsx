import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { Role } from '@/types/appTypes';

const PrivateRoute: React.FC<{
  roles?: Role[];
  children: React.ReactElement;
}> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && user?.role) {
    const hasRole = roles.includes(user.role);
    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;