import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logueado, setLogueado] = useState(() => {
    return localStorage.getItem("logueado") === "true";
  });

  const login = () => {
    localStorage.setItem("logueado", "true");
    setLogueado(true);
  };

  const logout = () => {
    localStorage.removeItem("logueado");
    setLogueado(false);
  };

  return (
    <AuthContext.Provider value={{ logueado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
