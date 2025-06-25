import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ConfirmacionModal from "../ConfirmacionModal";
import { useProducts } from "../../context/ProductosContext";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoId = parseInt(id);

  const { products, editProduct } = useProducts();

  const productoExistente = products.find((p) => p.id === productoId);

  const [producto, setProducto] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (!productoExistente) {
      navigate("/productos");
    } else {
      setProducto({
        id: productoExistente.id,
        title: productoExistente.title || "",
        price: productoExistente.price || 0,
        description: productoExistente.description || "",
        category: productoExistente.category || "",
        image: productoExistente.image || "",
        estado: productoExistente.estado,
        favorite: productoExistente.favorite,
      });
    }
  }, [productoExistente, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(producto.id, producto);
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
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={producto.title || ""}
                  onChange={handleChange}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Por favor, ingrese el título del producto.")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio $</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={producto.price || ""}
                  onChange={handleChange}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Por favor, ingrese el precio del producto.")
                  }
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
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={producto.description || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={producto.category || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={producto.image || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/*}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="d-flex align-items-center h-100 mt-2">
                <Form.Check
                  type="checkbox"
                  label="Estado (Activo/Inactivo)"
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
                  name="favorite"
                  checked={producto.favorite || false}
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

          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Volver a la lista
          </Button>
        </Container>
      </Form>

      <ConfirmacionModal
        mostrar={mostrarModal}
        onCerrar={() => {
          setMostrarModal(false);
          navigate(-1);
        }}
        mensaje="Producto actualizado correctamente."
      />
    </>
  );
}

export default EditarProducto;