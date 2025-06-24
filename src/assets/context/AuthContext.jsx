import { createContext, useState } from "react";
import usuarios from "../data/usuarios.json";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logueado, setLogueado] = useState(
    () => localStorage.getItem("logueado") === "true",
  );
  const [rol, setRol] = useState(() => localStorage.getItem("rol") || null);

  const login = (usuario, contrasena) => {
    const foundUser = usuarios.find(
      (u) => u.username === usuario && u.password === contrasena,
    );

    if (foundUser) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", foundUser.role);

      setLogueado(true);
      setRol(foundUser.role);

      return { success: true, role: foundUser.role };
    }

    return { success: false };
  };

  const logout = () => {
    localStorage.removeItem("logueado");
    localStorage.removeItem("rol");
    setLogueado(false);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ logueado, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
