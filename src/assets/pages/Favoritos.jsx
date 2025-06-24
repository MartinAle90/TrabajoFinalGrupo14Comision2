import { Container, Row, Col, Card } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../context/ProductosContext";
import Alert from "react-bootstrap/Alert";
import ProductCard from "../components/producto/ProductCard.jsx";

import "../css/Favoritos.css";

function Favoritos() {
  // Ya no necesitas recibir 'productos' y 'setProductos' como props aquí
  // Usar el hook personalizado para obtener los datos y funciones del contexto
  const { products, toggleFavorite, favorites } = useProducts();

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
        {favorites.map(
          (
            producto, // Iterar sobre 'favoritos'
          ) => (
            <Col md={4} key={producto.id} className="mb-4">
              <ProductCard
                producto={producto}
                toggleFavorite={toggleFavorite}
              />
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default Favoritos;
