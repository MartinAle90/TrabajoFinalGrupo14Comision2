import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import ConfirmacionModal from "../ConfirmacionModal";
import { useProducts } from "../../context/ProductosContext";

function ProductoForm() {
    const { addProduct } = useProducts();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [estado, setEstado] = useState(true);
    const [favorite, setFavorite] = useState(false);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errores, setErrores] = useState({});
    const [touched, setTouched] = useState({});

    const validarCampo = (nombreCampo, valor, tipo, opcional = false) => {
        let mensajeError = "";
        let isValid = true;

        if (opcional && valor.trim() === "") {
            return { mensajeError: "", isValid: true };
        }

        if (valor.trim() === "") {
            mensajeError = "Este campo es obligatorio.";
            isValid = false;
        } else if (tipo === "numero" && (isNaN(parseFloat(valor)) || parseFloat(valor) < 0)) {
            mensajeError = "Debe ser un número positivo.";
            isValid = false;
        } else if (tipo === "url" && !valor.startsWith("http")) {
            mensajeError = "Debe ser una URL válida (empezar con http:// o https://).";
            isValid = false;
        }

        setErrores((prevErrores) => ({ ...prevErrores, [nombreCampo]: mensajeError }));
        return { mensajeError, isValid };
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        setValidated(true);
        setTouched({
            title: true,
            price: true,
            description: true,
            category: true,
            image: true,
        });

        const { isValid: esTitleValido } = validarCampo("title", title, "texto");
        const { isValid: esPriceValido } = validarCampo("price", price, "numero");
        const { isValid: esDescriptionValida } = validarCampo("description", description, "texto");
        const { isValid: esCategoryValida } = validarCampo("category", category, "texto");

        const { isValid: esImageValida } = validarCampo("image", image, "url", true);

        if (esTitleValido && esPriceValido && esDescriptionValida && esCategoryValida && esImageValida) {
            const nuevoProducto = {
                title,
                price: parseFloat(price),
                description,
                category,
                image: image.trim() !== "" ? image : null,
                estado,
                favorite,
            };

            addProduct(nuevoProducto);
            setMostrarModal(true);

            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setImage("");
            setEstado(true);
            setFavorite(false);
            setValidated(false);
            setErrores({});
            setTouched({});
        }
    };

    const handleChangeAndValidate = (e, fieldName, fieldType, opcional = false) => {
        const { value, checked, type } = e.target;

        if (fieldName === "title") setTitle(value);
        else if (fieldName === "price") setPrice(value);
        else if (fieldName === "description") setDescription(value);
        else if (fieldName === "category") setCategory(value);
        else if (fieldName === "image") setImage(value);
        else if (fieldName === "estado") setEstado(checked);
        else if (fieldName === "favorite") setFavorite(checked);

        if (validated || touched[fieldName]) {
            validarCampo(fieldName, type === "checkbox" ? checked : value, fieldType, opcional);
        }
    };

    const handleBlurAndValidate = (e, fieldName, fieldType, opcional = false) => {
        setTouched((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
        validarCampo(fieldName, e.target.value, fieldType, opcional);
    };

    return (
        <>
            <Form className="my-4" onSubmit={manejarEnvio} noValidate validated={validated}>
                <h2 className="text-center mb-4">Formulario de producto</h2>

                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => handleChangeAndValidate(e, "title", "texto")}
                                    onBlur={(e) => handleBlurAndValidate(e, "title", "texto")}
                                    placeholder="Título del producto"
                                    required
                                    isInvalid={validated && !!errores.title}
                                    isValid={validated && !errores.title && touched.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.title}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio $</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => handleChangeAndValidate(e, "price", "numero")}
                                    onBlur={(e) => handleBlurAndValidate(e, "price", "numero")}
                                    placeholder="Precio del producto"
                                    required
                                    min={0}
                                    step={0.01}
                                    isInvalid={validated && !!errores.price}
                                    isValid={validated && !errores.price && touched.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.price}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => handleChangeAndValidate(e, "description", "texto")}
                                    onBlur={(e) => handleBlurAndValidate(e, "description", "texto")}
                                    placeholder="Descripción del producto"
                                    required
                                    isInvalid={validated && !!errores.description}
                                    isValid={validated && !errores.description && touched.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.description}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={category}
                                    onChange={(e) => handleChangeAndValidate(e, "category", "texto")}
                                    onBlur={(e) => handleBlurAndValidate(e, "category", "texto")}
                                    placeholder="Escriba la categoría"
                                    required
                                    isInvalid={validated && !!errores.category}
                                    isValid={validated && !errores.category && touched.category}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.category}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>URL de la Imagen</Form.Label>
                                <Form.Control
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleChangeAndValidate(e, "image", "url", true)}
                                    onBlur={(e) => handleBlurAndValidate(e, "image", "url", true)}
                                    placeholder="OPCIONAL: URL de la imagen del producto"
                                    isInvalid={validated && !!errores.image}
                                    isValid={validated && !errores.image && touched.image}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.image}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/*
                    <Row>
                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Activo"
                                    checked={estado}
                                    onChange={(e) => handleChangeAndValidate(e, "estado", "checkbox")}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Favorito"
                                    checked={favorite}
                                    onChange={(e) => handleChangeAndValidate(e, "favorite", "checkbox")}
                                    className="favorito-checkbox"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    */}
                    <div className="mt-3">
                        <Button type="submit" variant="success">
                            Guardar
                        </Button>
                    </div>
                </Container>
            </Form>

            <ConfirmacionModal
                mostrar={mostrarModal}
                onCerrar={() => setMostrarModal(false)}
                mensaje="Producto guardado correctamente."
            />
        </>
    );
}

export default ProductoForm;