import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import "../css/Login.css"; // Asegúrate de que la ruta sea correcta


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
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="login-card">
            <Card.Body className="login-card-body">
              <h2>Iniciar Sesión</h2>
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
                </div >

                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>

              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
