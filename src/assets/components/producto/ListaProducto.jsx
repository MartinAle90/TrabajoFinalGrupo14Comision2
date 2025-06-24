import { useState } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../../context/ProductosContext";
import ProductCard from "./ProductCard.jsx";
import "../../css/ListaProductos.css";

// Ya no se usan los props 'productos' y 'setProductos' porque ahora usamos el contexto
function ListaProducto() {
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
