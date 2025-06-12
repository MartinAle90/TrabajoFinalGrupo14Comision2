import { useState } from "react";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import ConfirmacionModal from "../ConfirmacionModal";

function ProductoForm({ agregarProducto }) {
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState(true);
    const [favorito, setFavorito] = useState(false);

    const [mostrarModal, setMostrarModal] = useState(false);

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
        const nuevoId = ultimoId + 1;

        const producto = {
            id: nuevoId,
            nombre,
            precio,
            descripcion,
            categoria,
            estado,
            favorito,
        };

        let lista = JSON.parse(localStorage.getItem("productos")) || [];
        lista.push(producto);
        localStorage.setItem("productos", JSON.stringify(lista));

        agregarProducto(producto);
        localStorage.setItem("ultimoId", nuevoId);

        setMostrarModal(true);

        setPrecio("");
        setNombre("");
        setDescripcion("");
        setCategoria("");
        setEstado(true);
        setFavorito(false);
    };

    return (
        <>
            <Form className="my-4" onSubmit={manejarEnvio}>
                <h2 className="text-center mb-4">Formulario de producto</h2>

                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombre del producto"
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Por favor, ingrese el nombre del producto.")}
                                    onInput={(e) => e.target.setCustomValidity("")} 
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio $</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    placeholder="Precio del producto"
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Por favor, ingrese el precio del producto.")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                    min={0}
                                    step={0.01}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Descripción del producto"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    placeholder="Escriba la categoria"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Activo"
                                    checked={estado}
                                    onChange={(e) => setEstado(e.target.checked)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Favorito"
                                    checked={favorito}
                                    onChange={(e) => setFavorito(e.target.checked)}
                                    className="favorito-checkbox"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mt-3">
                        <Button type="submit" variant="success">
                            Guardar
                        </Button>
                    </div>
                </Container>
            </Form>

            <ConfirmacionModal
                mostrar={mostrarModal}
                onCerrar={() => setMostrarModal(false)}
                mensaje="producto guardado correctamente."
            />
        </>
    );
}

export default ProductoForm;