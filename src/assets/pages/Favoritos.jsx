import { Container, Row, Col, Card } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useProducts } from "../context/ProductosContext"; 


import "../css/Favoritos.css";

function Favoritos() { // Ya no necesitas recibir 'productos' y 'setProductos' como props aquí
    // Usar el hook personalizado para obtener los datos y funciones del contexto
    const { products, toggleFavorite } = useProducts();

    // Filtrar los productos que son favoritos (ahora desde el estado global 'products')
    const favoritos = products.filter((producto) => producto.favorite);

    if (favoritos.length === 0) {
        return <p className="text-center mt-5">No hay productos favoritos.</p>;
    }

    return (
        <Container className="my-4 text-center">
            <h2 className="mb-4">Lista de productos Favoritos</h2> 
            <Row>
                {favoritos.map((producto) => ( // Iterar sobre 'favoritos'
                    <Col md={4} key={producto.id} className="mb-4">
                        <Card className="product-card">
                            <div className="favorito-checkbox-container">
                                <span
                                    className="favorito-icon"
                                    onClick={() => toggleFavorite(producto.id)} // ¡Usar toggleFavorite!
                                >
                                    {producto.favorite ? (
                                        <BsStarFill size={24} color="#ffc107" /> 
                                    ) : (
                                        <BsStar size={24} color="#ccc" /> 
                                    )}
                                </span>
                            </div>
                            <Card.Body>
                                <Card.Img className="card-img-container"
                                    variant="top"
                                    src={producto.image || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                                    alt={producto.title}
                                />
                                <Card.Title>
                                    {producto.title}
                                </Card.Title>
                                <Card.Text>
                                    <strong>Precio:</strong> ${producto.price}
                                    <br />
                                    <strong>Categoría:</strong> {producto.category}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Favoritos;