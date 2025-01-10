import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  // Verifica se o token está presente no localStorage
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redireciona para a página de login se o token não estiver presente
    return <Navigate to="/login" replace />;
  }

  // Renderiza o elemento se o token estiver presente
  return element;
};

export default ProtectedRoute;
