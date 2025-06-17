import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Card, Col, Table, Row } from "react-bootstrap";

function DetalleProducto({ productos }) {
    const { id } = useParams(); // agarra el id
    const productoId = parseInt(id);

    const navigate = useNavigate();

    // Busca el producto que tiene ese id 
    const producto = productos.find((a) => a.id === Number(id));

    if (!producto) {
        return <p>Producto no encontrado</p>;
    }

    return (
        <Container className="my-4 text-center">
            <Card>
                <Card.Header as="h4">Detalles del Producto</Card.Header>
                <Card.Body className="text-start">
                    <Row className="mb-3 align-center">
                        <Col md={4}>
                            <strong>ID:</strong> {producto.id}
                        </Col>
                        <Col md={4}>
                            <strong>Nombre:</strong> {producto.title}
                        </Col>
                        <Col md={4}>
                            <strong>Precio: </strong>${producto.price}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Descripcion:</strong> {producto.description}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Categoria:</strong> {producto.category}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Estado:</strong> {producto.estado ? "Activo" : "Inactivo"}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Favorito:</strong> {producto.favorite ? "Si" : "No"}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Button className="mt-3" variant="secondary" onClick={() => navigate("/productos")}>
                Volver a la lista
            </Button>
        </Container>

    );
}

export default DetalleProducto;