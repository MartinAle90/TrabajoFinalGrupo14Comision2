import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useProducts } from "../../context/ProductosContext";
import "../../css/DetalleProducto.css";

function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { products } = useProducts();

    const producto = products.find((p) => p.id === Number(id));

    if (!producto) {
        return (
            <Alert className="text-center mt-5" key="info" variant="info">
                Producto no encontrado.
            </Alert>
        )
    }

    return (
        <Container className="my-4">
            <Card>
                <Row className="g-0 align-items-center">
                    <Card.Header as="h4" className="card-header-detalle">Detalles del Producto</Card.Header>
                    <Col md={8} >

                        <Card.Body className="card-body-detalle">
                            <Row className="mb-3">
                                <Col md={12}>
                                    <strong>ID:</strong> {producto.id}
                                </Col>
                            </Row>
                            <Row className="mb-3">

                                <Col md={12}>
                                    <strong>Título:</strong> {producto.title}
                                </Col>
                            </Row>
                            <Row className="mb-3">

                                <Col md={12}>
                                    <strong>Precio: </strong>${producto.price}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={12}>
                                    <strong>Descripción:</strong> {producto.description}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={12}>
                                    <strong>Categoría:</strong> {producto.category}
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

                    </Col>
                    <Col md={4} className="text-center p-4">
                        {producto.image && (
                            <img
                                src={producto.image}
                                alt={producto.title}
                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
                            />
                        )}
                    </Col>
                </Row>
            </Card>

            <Button
                className="mt-3"
                variant="secondary"
                onClick={() => navigate(-1)}
            >
                Volver a la lista
            </Button>
        </Container>
    );
}

export default DetalleProducto;