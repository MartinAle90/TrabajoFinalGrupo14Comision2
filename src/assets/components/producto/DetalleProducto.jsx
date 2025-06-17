import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import { useProducts } from "../../context/ProductosContext";

function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { products } = useProducts();

    const producto = products.find((p) => p.id === Number(id));

    if (!producto) {
        return <p className="text-center mt-5">Producto no encontrado.</p>;
    }

    return (
        <Container className="my-4 text-center">
            <Card>
                <Card.Header as="h4">Detalles del Producto</Card.Header>
                <Card.Body className="text-start">
                    <Row className="mb-3 align-items-center">
                        <Col md={4}>
                            <strong>ID:</strong> {producto.id}
                        </Col>
                        <Col md={4}>
                            <strong>Título:</strong> {producto.title}
                        </Col>
                        <Col md={4}>
                            <strong>Precio: </strong>${producto.price}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={8}>
                            <strong>Descripción:</strong> {producto.description}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Categoría:</strong> {producto.category}
                        </Col>
                        <Col md={4}>
                            {producto.image && (
                                <img
                                    src={producto.image}
                                    alt={producto.title}
                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
                                />
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <strong>Estado:</strong> {producto.estado ? "Activo" : "Inactivo"}
                        </Col>
                        <Col md={4}>
                            <strong>Favorito:</strong> {producto.favorite ? "Sí" : "No"}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Button
                className="mt-3"
                variant="secondary"
                onClick={() => navigate("/productos")}
            >
                Volver a la lista
            </Button>
        </Container>
    );
}

export default DetalleProducto;