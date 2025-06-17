import { useState } from "react";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../css/ListaProductos.css";

function ListaProducto({ productos, setProductos }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const confirmarEliminar = (producto) => {
        setProductoSeleccionado(producto);
        setShowModal(true);
    };

    const handleConfirmar = () => {
        if (productoSeleccionado) {
            const nuevaLista = productos.filter((producto) => producto.id !== productoSeleccionado.id);
            setProductos(nuevaLista);
            localStorage.setItem("productos", JSON.stringify(nuevaLista));
        }
        setShowModal(false);
        setProductoSeleccionado(null);
    };

    return (
        <Container className="my-4 text-center">
            <h2 className="mb-4">Lista de productos</h2>
            <Row>
                {productos.map((producto) => (
                    <Col md={4} key={producto.id} className="mb-4">
                        <Card>
                            <div className="favorito-checkbox-container">
                                <span
                                    className="favorito-icon"
                                    onClick={() => {
                                        const actualizado = productos.map((p) =>
                                            p.id === producto.id ? { ...p, favorito: !p.favorito } : p
                                        );
                                        setProductos(actualizado);
                                        localStorage.setItem("productos", JSON.stringify(actualizado));
                                    }}
                                >
                                    {producto.favorito ? (
                                        <BsStarFill size={24} color="#ffc107" /> // Estrella llena
                                    ) : (
                                        <BsStar size={24} color="#ccc" /> // Estrella vacía
                                    )}
                                </span>
                            </div>
                            {producto.imagen && (
                                <Card.Img
                                    variant="top"
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <Card.Body>
                                <Card.Title>
                                    {producto.nombre}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Precio:</strong> ${producto.precio}
                                    <br />
                                    <strong>Categoría:</strong> {producto.categoria}
                                    {/*
                                    <strong>Estado:</strong>{" "}
                                    {producto.estado ? "Activo" : "Inactivo"}
                                    <br />
                                    <strong>Favorito:</strong>{" "}
                                    {producto.favorito ? "Si" : "No"}
                                    */}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    className="me-2 my-2"
                                    onClick={() => navigate(`/productos/${producto.id}/editar`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    className="me-2 my-2"
                                    onClick={() => confirmarEliminar(producto)}
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(`/productos/${producto.id}`)}
                                >
                                    Ver Detalles
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que querés eliminar a{" "}
                    <strong>
                        {productoSeleccionado?.nombre} {productoSeleccionado?.apellido}
                    </strong>{" "}
                    con ID: <strong>{productoSeleccionado?.id}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmar}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ListaProducto;