import { Container, Row, Col, Card } from "react-bootstrap";

const miembros = [
  {
    nombre: "Leandro",
    apellido: "Benencia",
    avatar:
      "https://ui-avatars.com/api/?name=Leandro+Benencia&background=0D8ABC&color=fff",
  },
  {
    nombre: "Andrea",
    apellido: "Burgos",
    avatar:
      "https://ui-avatars.com/api/?name=Andrea+Burgos&background=0D8ABC&color=fff",
  },
  {
    nombre: "Gonzalo",
    apellido: "Cruz",
    avatar:
      "https://ui-avatars.com/api/?name=Gonzalo+Cruz&background=0D8ABC&color=fff",
  },
  {
    nombre: "Martin",
    apellido: "Daza",
    avatar:
      "https://ui-avatars.com/api/?name=Martin+Daza&background=0D8ABC&color=fff",
  },
  {
    nombre: "Naim",
    apellido: "Apaza",
    avatar:
      "https://ui-avatars.com/api/?name=Naim+Apaza&background=0D8ABC&color=fff",
  },
];

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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Nosotros;
