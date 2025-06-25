import { Container, Row, Col, Card } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../context/ProductosContext";
import Alert from "react-bootstrap/Alert";
import ProductCard from "../components/producto/ProductCard.jsx";
import { useFilteredProducts } from "../components/hooks/useFilteredProducts.js";
import ProductSearch from "../components/producto/ProductSearch.jsx";
import { useState } from "react";
import "../css/Favoritos.css";

function Favoritos() {
  // Ya no necesitas recibir 'productos' y 'setProductos' como props aquí
  // Usar el hook personalizado para obtener los datos y funciones del contexto
  const { deleteProduct, toggleFavorite, favorites } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = useFilteredProducts(favorites, searchTerm);

  return (
    <Container className="my-4 text-center">
      <h2 className="mb-4">Lista de productos Favoritos</h2>

      <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredFavorites.length === 0 ? (
        <Alert className="text-center mt-5" key="info" variant="info">
          No hay productos favoritos.
        </Alert>
      ) : (
        <Row>
          {filteredFavorites.map((producto) => (
            <Col md={4} key={producto.id} className="mb-4">
              <ProductCard
                producto={producto}
                toggleFavorite={toggleFavorite}
                deleteProduct={deleteProduct}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;
