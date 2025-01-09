import { Navigate } from 'react-router-dom';

// Exemplo de função para verificar autenticação (pode usar estado global, cookies, ou localStorage)
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken'); // Recupera o token armazenado
  return !!token; // Retorna verdadeiro se o token existir
};

// Componente de proteção de rota
const AuthGuard = ({ children }) => {
  if (!isAuthenticated()) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  // Retorna os filhos (rotas) se estiver autenticado
  return children;
};

export default AuthGuard;
