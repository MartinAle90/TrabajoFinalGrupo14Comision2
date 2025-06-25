import { useState } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../../context/ProductosContext";
import ProductCard from "./ProductCard.jsx";
import { useFilteredProducts } from "../hooks/useFilteredProducts.js";
import ProductSearch from "./ProductSearch.jsx";
import "../../css/ListaProductos.css";

// Ya no se usan los props 'productos' y 'setProductos' porque ahora usamos el contexto
function ListaProducto() {
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtenemos los productos y las funciones del contexto
  const { products, toggleFavorite, deleteProduct } = useProducts();

  const filteredProducts = useFilteredProducts(
    products.filter((p) => p.estado === true),
    searchTerm,
  );

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
        <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {filteredProducts.length === 0 ? (
          <Alert className="text-center mt-4" variant="info">
            No hay productos que coincidan con tu búsqueda.
          </Alert>
        ) : (
          <Row>
            {filteredProducts
              .filter((producto) => producto.estado === true)
              .map((producto) => (
                <Col md={4} key={producto.id} className="mb-4">
                  <ProductCard
                    producto={producto}
                    toggleFavorite={toggleFavorite}
                    confirmarEliminar={confirmarEliminar}
                  />
                </Col>
              ))}
          </Row>
        )}

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
