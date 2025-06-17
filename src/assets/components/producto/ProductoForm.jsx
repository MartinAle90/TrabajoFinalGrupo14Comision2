import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import ConfirmacionModal from "../ConfirmacionModal";

function ProductoForm({ agregarProducto }) {
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState(true);
    const [favorito, setFavorito] = useState(false);
    const [imagen, setImagen] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errores, setErrores] = useState({}); 
    const [touched, setTouched] = useState({});

    const validarCampo = (nombreCampo, valor, tipo) => {
        let mensajeError = '';
        let isValid = true;

        if (valor.trim() === '') {
            mensajeError = 'Este campo es obligatorio.';
            isValid = false;
        } else if (tipo === 'numero' && (isNaN(valor) || parseFloat(valor) < 0)) {
            mensajeError = 'Debe ser un número positivo.';
            isValid = false;
        } else if (tipo === 'url' && valor.trim() !== '' && !valor.startsWith('http')) {
            mensajeError = 'Debe ser una URL válida';
            isValid = false;
        }
        
        setErrores(prevErrores => ({ ...prevErrores, [nombreCampo]: mensajeError }));
        return isValid;
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        setValidated(true); // Activa el modo de validación visual de Bootstrap
        setTouched({
            nombre: true,
            precio: true,
            descripcion: true,
            categoria: true,
            imagen: true
        });

        const esNombreValido = validarCampo('nombre', nombre, 'texto');
        const esPrecioValido = validarCampo('precio', precio, 'numero');
        const esDescripcionValida = validarCampo('descripcion', descripcion, 'texto');
        const esCategoriaValida = validarCampo('categoria', categoria, 'texto');
        const esImagenValida = validarCampo('imagen', imagen, 'url');

        if (esNombreValido && esPrecioValido && esDescripcionValida && esCategoriaValida && esImagenValida) {
            let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
            const nuevoId = ultimoId + 1;

            const producto = {
                id: nuevoId,
                nombre,
                precio: parseFloat(precio),
                descripcion,
                categoria,
                estado,
                favorito,
                imagen,
            };

            agregarProducto(producto);
            localStorage.setItem("ultimoId", nuevoId);

            setMostrarModal(true);
            setPrecio("");
            setNombre("");
            setDescripcion("");
            setCategoria("");
            setEstado(true);
            setFavorito(false);
            setImagen("");
            setValidated(false);
            setErrores({});
            setTouched({});
        }
    };
    const handleChangeAndValidate = (e, fieldName, fieldType) => {
        const { value } = e.target;
        if (fieldName === 'nombre') setNombre(value);
        else if (fieldName === 'precio') setPrecio(value);
        else if (fieldName === 'descripcion') setDescripcion(value);
        else if (fieldName === 'categoria') setCategoria(value);
        else if (fieldName === 'imagen') setImagen(value);
        if (validated || touched[fieldName]) {
            validarCampo(fieldName, value, fieldType);
        }
    };

    const handleBlurAndValidate = (e, fieldName, fieldType) => {
        setTouched(prevTouched => ({ ...prevTouched, [fieldName]: true })); 
        validarCampo(fieldName, e.target.value, fieldType); 
    };

    return (
        <>
            <Form className="my-4" onSubmit={manejarEnvio} noValidate validated={validated}>
                <h2 className="text-center mb-4">Formulario de producto</h2>

                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => handleChangeAndValidate(e, 'nombre', 'texto')}
                                    onBlur={(e) => handleBlurAndValidate(e, 'nombre', 'texto')} 
                                    placeholder="Nombre del producto"
                                    required
                                    isInvalid={validated && !!errores.nombre} 
                                    isValid={validated && !errores.nombre && touched.nombre} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.nombre}
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
                                    value={precio}
                                    onChange={(e) => handleChangeAndValidate(e, 'precio', 'numero')}
                                    onBlur={(e) => handleBlurAndValidate(e, 'precio', 'numero')}
                                    placeholder="Precio del producto"
                                    required
                                    min={0}
                                    step={0.01}
                                    isInvalid={validated && !!errores.precio}
                                    isValid={validated && !errores.precio && touched.precio}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.precio}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => handleChangeAndValidate(e, 'descripcion', 'texto')}
                                    onBlur={(e) => handleBlurAndValidate(e, 'descripcion', 'texto')}
                                    placeholder="Descripción del producto"
                                    required
                                    isInvalid={validated && !!errores.descripcion}
                                    isValid={validated && !errores.descripcion && touched.descripcion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.descripcion}
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
                                    value={categoria}
                                    onChange={(e) => handleChangeAndValidate(e, 'categoria', 'texto')}
                                    onBlur={(e) => handleBlurAndValidate(e, 'categoria', 'texto')}
                                    placeholder="Escriba la categoria"
                                    required
                                    isInvalid={validated && !!errores.categoria}
                                    isValid={validated && !errores.categoria && touched.categoria}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.categoria}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>URL de la Imagen</Form.Label>
                                <Form.Control
                                    type="url"
                                    value={imagen}
                                    onChange={(e) => handleChangeAndValidate(e, 'imagen', 'url')}
                                    onBlur={(e) => handleBlurAndValidate(e, 'imagen', 'url')}
                                    placeholder="OPCIONAL: URL de la imagen del producto"
                                    isInvalid={validated && !!errores.imagen}
                                    isValid={validated && !errores.imagen && touched.imagen}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.imagen}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    ¡Perfecto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Activo"
                                    checked={estado}
                                    onChange={(e) => setEstado(e.target.checked)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6} className="d-flex align-items-center mt-3">
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Favorito"
                                    checked={favorito}
                                    onChange={(e) => setFavorito(e.target.checked)}
                                    className="favorito-checkbox"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

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