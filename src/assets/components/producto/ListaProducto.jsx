import { useState } from "react";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../../context/ProductosContext";
import "../../css/ListaProductos.css";

// Ya no se usan los props 'productos' y 'setProductos' porque ahora usamos el contexto
function ListaProducto() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Obtenemos los productos y las funciones del contexto
  const { products, toggleFavorite, deleteProduct } = useProducts();

  const confirmarEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleConfirmar = () => {
    if (productoSeleccionado) {
      deleteProduct(productoSeleccionado.id);
    }
    setShowModal(false);
    setProductoSeleccionado(null);
  };

  return (
    <div className="lista-productos">
    <Container className="my-4 text-center">
      <h2 className="mb-4">Lista de productos</h2>
      <Row>
        {products // Usar 'products' del contexto
          .filter((producto) => producto.estado === true)
          .map((producto) => (
            <Col md={4} key={producto.id} className="mb-4">
              <Card className="product-card"> 
                <div className="favorito-checkbox-container">
                  <span
                    className="favorito-icon"
                    onClick={() => toggleFavorite(producto.id)} // Usamos el toggleFavorite!
                  >
                    {producto.favorite ? (
                      <BsStarFill size={24} color="#ffc107" /> // Estrella llena
                    ) : (
                      <BsStar size={24} color="#ccc" /> // Estrella vacía
                    )}
                  </span>
                </div>
                <Card.Img
                    className="card-img-container"
                    variant="top"
                    src={
                      producto.image ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                    }
                  />
                <Card.Body>
                  
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${producto.price}
                    <br />
                    <strong>Categoría:</strong> {producto.category}
                  </Card.Text>
                  
                </Card.Body>
                <div className="buttons-card">
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
                  </div>
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
          <strong>{productoSeleccionado?.title}</strong> con ID:{" "}
          <strong>{productoSeleccionado?.id}</strong>?
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
    </div>
  );
}

export default ListaProducto;
