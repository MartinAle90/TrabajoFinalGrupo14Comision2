import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import "../css/Login.css";
import loginImage from "../../assets/components/images/logo-grupo-14.png";

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
    <Container className="login-container">
      <Row className="justify-content-center-login">
        <Col xs={12} md={10} lg={8}>
          <Card className="login-card d-flex flex-row overflow-hidden">
            {/* Columna de la imagen */}
            <div className="login-image-col d-none d-md-block">
              <img src={loginImage} alt="Login" className="login-image" />
            </div>
            {/* Columna del formulario */}
            <div className="login-form-col flex-grow-1 d-flex align-items-center">
              <Card.Body className="login-card-body w-100">
                <h2 className="mb-4 text-center">¡Bienvenido!</h2>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su usuario"
                        value={usuario}
                        required
                        onChange={(e) => setUsuario(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className="mb-3">
                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Contraseña"
                          value={contrasena}
                          required
                          onChange={(e) => setContrasena(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Ingresar
                  </button>
                </form>
              </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;