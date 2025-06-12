import { Container, Row, Col, Card } from "react-bootstrap";

function Favoritos({ productos }) {
    // Filtrar los productos que son favoritos
    const favoritos = productos.filter((producto) => producto.favorito);

    if (favoritos.length === 0) {
        return <p className="text-center mt-5">No hay productos favoritos.</p>;
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center">Productos Favoritos</h1>
            <Row className="justify-content-center">
                {favoritos.map((producto) => (
                    <Col key={producto.id} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={producto.imagen || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                                alt={producto.nombre}
                            />
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>Precio: ${producto.precio}</Card.Text>
                                <Card.Text>{producto.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Favoritos;