import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ConfirmacionModal from "../ConfirmacionModal";

function EditarProducto({ productos, actualizarProducto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoId = parseInt(id);

  const productoExistente = productos.find((p) => p.id === productoId);
  const [producto, setProducto] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (!productoExistente) {
      navigate("/productos");
    } else {
      setProducto(productoExistente);
    }
  }, [productoExistente, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(producto);
    setMostrarModal(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className="my-4">
          <h2 className="text-center mb-4">Editar producto</h2>
          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={producto.nombre || ""}
                  onChange={handleChange}
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
                  name="precio"
                  value={producto.precio || ""}
                  onChange={handleChange}
                  required
                  onInvalid={(e) => e.target.setCustomValidity("Por favor, ingrese el precio del producto.")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  min={0}
                  step={0.01}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={producto.descripcion || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={producto.categoria || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/*
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="d-flex align-items-center h-100 mt-2">
                <Form.Check
                  type="checkbox"
                  label="Estado"
                  name="estado"
                  checked={producto.estado || false}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="d-flex align-items-center h-100 mt-2">
                <Form.Check
                  type="checkbox"
                  label="Favorito"
                  name="favorito"
                  checked={producto.favorito || false}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          */}
          <div className="mt-3">
            <Button variant="success" type="submit">
              Guardar Cambios
            </Button>
          </div>

          <Button className="mt-3" variant="secondary" onClick={() => navigate("/productos")}>
            Volver a la lista
          </Button>
        </Container>
      </Form >

      <ConfirmacionModal
        mostrar={mostrarModal}
        onCerrar={() => {
          setMostrarModal(false);
          navigate("/productos");
        }}
        mensaje="producto actualizado correctamente."
      />
    </>
  );
}

export default EditarProducto;