import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  if (!user || (requireAdmin && user && !user.isStaff)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
