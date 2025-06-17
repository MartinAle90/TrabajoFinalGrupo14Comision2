import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolRequerido }) {
  const logueado = localStorage.getItem("logueado") === "true";
  const rol = localStorage.getItem("rol");

  if (!logueado) {
    // Si no esta logeado lo redirige a login
    return <Navigate to="/login" />;
  }

  if (rolRequerido && rol !== rolRequerido) {
    // Si no tiene los permisos necesarios, muestra mensaje de error
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Acceso denegado</h2>
        <p>No tienes los permisos necesarios para acceder a esta página.</p>
      </div>
    );
  }

  
  return children;
}

export default RutaProtegida;
