import { Card, Button } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function ProductCard({
  producto,
  toggleFavorite,
  confirmarEliminar,
}) {
  const navigate = useNavigate();
  const { rol } = useContext(AuthContext);
  return (
    <>
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
        <Card.Body className="card-body-lista">
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>
            <strong>Precio:</strong> ${producto.price}
            <br />
            <strong>Categoría:</strong> {producto.category}
          </Card.Text>
        </Card.Body>
        <div className="buttons-card">
          {rol === "admin" && (
            <>
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
            </>
          )}

          <Button
            variant="secondary"
            onClick={() => navigate(`/productos/${producto.id}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </Card>
    </>
  );
}
