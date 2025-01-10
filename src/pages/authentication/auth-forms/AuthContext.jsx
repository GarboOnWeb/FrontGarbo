import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Usuário inicial é null
  
    const login = (userData) => {
      setUser(userData); // Atualiza o estado com os dados do usuário
    };
  
    const logout = () => {
      setUser(null); // Reseta o estado ao fazer logout
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
