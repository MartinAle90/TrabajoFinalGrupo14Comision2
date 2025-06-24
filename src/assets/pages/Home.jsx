import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Bs3SquareFill } from "react-icons/bs";

function Home() {
  return (

<Container className="home-container text-center">
  <Row  className="justify-content-center">
    <Col md={10}>
      <Card className="home-card">
        <Card.Body  className="home-card-body">
          <h1 className="home-title">
            Bienvenido al Sistema de Gestión de Productos
          </h1>
          <p className="home-lead">
            Esta aplicación te permite gestionar la información de los productos de manera sencilla y eficiente.
          </p>

          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>Visualiza la lista de productos</ListGroup.Item>
            <ListGroup.Item>Agrega, edita y elimina productos</ListGroup.Item>
            <ListGroup.Item>Consulta los detalles de cada producto</ListGroup.Item>
            <ListGroup.Item>Accede a información sobre los creadores de la app</ListGroup.Item>
          </ListGroup>

          <p className="home-footer">Usa el menú de navegación para comenzar.</p>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
}

export default Home;
