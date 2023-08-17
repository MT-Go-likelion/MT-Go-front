import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  console.log(user.isStaff);

  if (!user || (requireAdmin && !user.isStaff)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
