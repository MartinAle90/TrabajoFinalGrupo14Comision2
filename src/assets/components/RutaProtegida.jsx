import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RutaProtegida({ children }) {
  const { logueado } = useContext(AuthContext);

  return logueado ? children : <Navigate to="/login" />;
}

export default RutaProtegida;
