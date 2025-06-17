import { Container } from "react-bootstrap";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Nosotros from "./assets/pages/Nosotros";
import Home from "./assets/pages/Home";
import ErrorPage from "./assets/pages/ErrorPage";
import ListaProducto from "./assets/components/producto/ListaProducto";
import ProductoForm from "./assets/components/producto/ProductoForm";
import EditarProducto from "./assets/components/producto/EditarProducto";
import DetalleProducto from "./assets/components/producto/DetalleProducto";
import Favoritos from "./assets/pages/Favoritos";

// Declaración única de initialProductos

const initialProductos = JSON.parse(localStorage.getItem("productos")) || [];


function App() {
  const [productos, setProductos] = useState(initialProductos);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const actualizarProducto = (productoActualizado) => {
    const nuevaLista = productos.map((producto) =>
      producto.id === productoActualizado.id ? productoActualizado : producto
    );
    setProductos(nuevaLista);
    localStorage.setItem("productos", JSON.stringify(nuevaLista));
  };

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="productos" element={<ListaProducto productos={productos} setProductos={setProductos} />} />
          <Route path="producto/nuevo" element={<ProductoForm agregarProducto={agregarProducto} />} />
          <Route path="productos/:id/editar" element={<EditarProducto productos={productos} actualizarProducto={actualizarProducto} />} />
          <Route path="productos/:id" element={<DetalleProducto productos={productos} />} />
          <Route path="/favoritos" element={<Favoritos productos={productos} />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;