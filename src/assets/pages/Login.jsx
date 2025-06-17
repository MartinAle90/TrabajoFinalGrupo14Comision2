import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario
    //Validacion de usuario y administrador 
    if (usuario === "admin" && contrasena === "1234") {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "admin");
      navigate("/");
    } else if (usuario === "user" && contrasena === "1234") {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "user");
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }


  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
