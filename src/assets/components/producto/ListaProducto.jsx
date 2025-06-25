import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../../context/ProductosContext";
import useConfirmDelete from "../../hooks/useConfirmDelete";
import ProductCard from "./ProductCard.jsx";
import { useFilteredProducts } from "../hooks/useFilteredProducts.js";
import ProductSearch from "./ProductSearch.jsx";
import ConfirmarEliminarModal from "../ConfirmarEliminarModal.jsx";
import "../../css/ListaProductos.css";

function ListaProducto() {

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useFilteredProducts(
    products.filter((p) => p.estado === true),
    searchTerm,
  );

  const { products, toggleFavorite, deleteProduct } = useProducts();

  // Hook personalizado para el modal de confirmación
  const {
    showModal,
    productoSeleccionado,
    confirmarEliminar,
    handleConfirmar,
    handleCancelar,
  } = useConfirmDelete((producto) => deleteProduct(producto.id));

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

        <ConfirmarEliminarModal
          showModal={showModal}
          productoSeleccionado={productoSeleccionado}
          handleConfirmar={handleConfirmar}
          handleCancelar={handleCancelar}
        />
      </Container>
    </div>
  );
}

export default ListaProducto;