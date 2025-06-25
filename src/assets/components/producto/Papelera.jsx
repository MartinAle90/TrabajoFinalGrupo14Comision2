import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useProducts } from "../../context/ProductosContext";
import { BsArrowRepeat, BsTrash } from "react-icons/bs"; 
import { useState } from "react";
import "../../css/Papelera.css";

function Papelera() {
  const { products, restoreProduct, hardDeleteProduct } = useProducts();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDeletePermanently, setProductToDeletePermanently] = useState(null);

  const deletedProducts = products.filter((p) => p.estado === false);

  const handleRestore = (id) => {
    restoreProduct(id);
    alert("Producto restaurado correctamente.");
  };

  const handleConfirmPermanentDelete = (product) => {
    setProductToDeletePermanently(product);
    setShowConfirmModal(true);
  };

  const handleHardDelete = () => {
    if (productToDeletePermanently) {
      hardDeleteProduct(productToDeletePermanently.id);
      setShowConfirmModal(false);
      setProductToDeletePermanently(null);
      alert("Producto eliminado permanentemente.");
    }
  };

  if (deletedProducts.length === 0) {
    return (
      <Container className="my-4 text-center">
        <h2 className="mb-4">Papelera de Reciclaje</h2>
        <div className="alert alert-info" role="alert">
          La papelera está vacía.
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4 text-center">
      <h2 className="mb-4">Papelera de Reciclaje</h2>
      <Row>
        {deletedProducts.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="product-card deleted-card"> 
              <Card.Img
                variant="top"
                src={producto.image || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                alt={producto.title}
                style={{ opacity: 0.6 }} 
              />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${producto.price}
                  <br />
                  <strong>Categoría:</strong> {producto.category}
                </Card.Text>
                <small className="text-muted">Eliminado</small>
                <div className="mt-3">
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleRestore(producto.id)}
                  >
                    <BsArrowRepeat /> Restaurar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleConfirmPermanentDelete(producto)}
                  >
                    <BsTrash /> Eliminar Perm.
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación Permanente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar permanentemente el producto "
          <strong>{productToDeletePermanently?.title}</strong>" (ID:{" "}
          <strong>{productToDeletePermanently?.id}</strong>)? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleHardDelete}>
            Eliminar Permanentemente
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Papelera;