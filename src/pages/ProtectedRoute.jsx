import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate } from 'react-router-dom';

const adminEmail = 'skcbdlhc129@naver.com';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  console.log(user);

  if (!user || (requireAdmin && user.email !== adminEmail)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
