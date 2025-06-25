import { Col, Container, Row, Modal } from "react-bootstrap";
import { useProducts } from "../context/ProductosContext";
import useConfirmDelete from "../hooks/useConfirmDelete";
import Alert from "react-bootstrap/Alert";
import ProductCard from "../components/producto/ProductCard.jsx";
import ConfirmarEliminarModal from "../components/ConfirmarEliminarModal.jsx";
import "../css/Favoritos.css";

function Favoritos() {
  const { deleteProduct, toggleFavorite, favorites } = useProducts();

  // Hook personalizado para el modal de confirmación
    const {
      showModal,
      productoSeleccionado,
      confirmarEliminar,
      handleConfirmar,
      handleCancelar,
    } = useConfirmDelete((producto) => deleteProduct(producto.id));

  if (favorites.length === 0) {
    return (
      <Alert className="text-center mt-5" key="info" variant="info">
        No hay productos favoritos.
      </Alert>
    );
  }

  return (
    <Container className="my-4 text-center">
      <h2 className="mb-4">Lista de productos Favoritos</h2>
      <Row>
        {favorites.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <ProductCard
              producto={producto}
              toggleFavorite={toggleFavorite}
              confirmarEliminar={confirmarEliminar}
            />
          </Col>
        ))}
      </Row>
      
      <ConfirmarEliminarModal
          showModal={showModal}
          productoSeleccionado={productoSeleccionado}
          handleConfirmar={handleConfirmar}
          handleCancelar={handleCancelar}
        />
    </Container>
  );
}

export default Favoritos;