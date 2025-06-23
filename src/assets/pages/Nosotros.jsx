import { Container, Row, Col, Card } from "react-bootstrap";
import miembros from "../data/miembros.json"; // Importa el archivo JSON
import "../css/Nosotros.css"; // Asegúrate de que la ruta sea correcta

function Nosotros() {
  return (
    <Container className="mt-5">
      <h1 className="nosotros-title text-center">
        Grupo 14 de Programación Visual
      </h1>
      <Row className="justify-content-center">
        {miembros.map((miembro, idx) => (
          <Col
            key={idx}
            md={4}
            lg={2}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="nosotros-card">
              <Card.Img
                variant="top"
                src={miembro.avatar}
                alt={`${miembro.nombre} ${miembro.apellido}`}
                className="nosotros-avatar"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  <div>{miembro.nombre}</div>
                  <div>{miembro.apellido}</div>
                  
                </Card.Title>
                <div className="text-center mt-2">
                  <button onClick={() => window.open(miembro.github, "_blank")}
                  className="btn btn-dark btn-sm">
                       Ir al GitHub
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Nosotros;
