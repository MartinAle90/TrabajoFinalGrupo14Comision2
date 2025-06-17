{/*
import { Container } from "react-bootstrap";
import { useState, useEffect } from 'react'; 
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

const initialProductosManuales = JSON.parse(localStorage.getItem("productos")) || []; 
function App() {
    const [productos, setProductos] = useState([]); 
    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null);

    // Función para obtener productos de la API
    const obtenerProductosDeAPI = async () => {
        try {
            setCargando(true); 
            const respuesta = await fetch('https://fakestoreapi.com/products');

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const datosApi = await respuesta.json();

            //Datos del API
            const mappedApiProducts = datosApi.map(product => ({
                id: product.id,
                nombre: product.title,      
                precio: product.price,      
                descripcion: product.description, 
                categoria: product.category, 
                imagen: product.image,       
                estado: true,                
                favorito: false              
            }));

            const maxIdApi = mappedApiProducts.length > 0 ? Math.max(...mappedApiProducts.map(p => p.id)) : 0; 
            const maxIdManual = initialProductosManuales.length > 0 ? Math.max(...initialProductosManuales.map(p => p.id)) : 0;
            
            let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
            if (ultimoId <= maxIdApi || ultimoId <= maxIdManual) {
                ultimoId = Math.max(maxIdApi, maxIdManual) + 1;
                localStorage.setItem("ultimoId", ultimoId);
            }
            
            const apiProductIds = new Set(mappedApiProducts.map(p => p.id));
            const existingManualProductsFiltered = initialProductosManuales.filter(p => !apiProductIds.has(p.id));

            const productosCombinados = [...mappedApiProducts, ...existingManualProductsFiltered];
            
            setProductos(productosCombinados); 
            localStorage.setItem("productosCombinados", JSON.stringify(productosCombinados));


        } catch (err) {
            console.error("Hubo un error al obtener los productos:", err);
            setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProductosDeAPI();
    }, []);

    const agregarProducto = (nuevoProducto) => {
        setProductos((prevProductos) => {
            const nuevaLista = [...prevProductos, nuevoProducto];
            localStorage.setItem("productos", JSON.stringify(nuevaLista.filter(p => p.id >= (parseInt(localStorage.getItem("ultimoId")) || 0)))); 
            localStorage.setItem("productosCombinados", JSON.stringify(nuevaLista)); 
            return nuevaLista;
        });
    };

    const actualizarProducto = (productoActualizado) => {
        const nuevaLista = productos.map((producto) =>
            producto.id === productoActualizado.id ? productoActualizado : producto
        );
        setProductos(nuevaLista);
        localStorage.setItem("productos", JSON.stringify(nuevaLista.filter(p => p.id >= (parseInt(localStorage.getItem("ultimoId")) || 0))));
        localStorage.setItem("productosCombinados", JSON.stringify(nuevaLista)); 
    };

    return (
        <Container>
            {cargando && <p className="text-center">Cargando productos...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!cargando && !error && ( 
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
            )}
        </Container>
    );
}

export default App;*/}
import { Container } from "react-bootstrap";
import { useState } from "react";
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
import Login from "./assets/pages/Login";
import RutaProtegida from "./assets/components/RutaProtegida";
import { AuthProvider } from "./assets/context/AuthContext";
// Declaración única de initialProductos
const initialProductos = JSON.parse(localStorage.getItem("productos")) || [];
function App() {
  const [productos, setProductos] = useState(initialProductos);

  //<<<<<<< BenenciaLeandro
  const agregarProducto = (nuevoProducto) => {
    const nuevaLista = [...productos, nuevoProducto];
    setProductos(nuevaLista);
    localStorage.setItem("productos", JSON.stringify(nuevaLista));
  };
  {/*
//=======
    const agregarProducto = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
    };
*/}
  const actualizarProducto = (productoActualizado) => {
    const nuevaLista = productos.map((producto) =>
      producto.id === productoActualizado.id ? productoActualizado : producto
    );
    setProductos(nuevaLista);
    localStorage.setItem("productos", JSON.stringify(nuevaLista));
  };
  //>>>>>>> main
  {/*
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
//<<<<<<< BenenciaLeandro
    setProductos(nuevaLista);
    localStorage.setItem("productos", JSON.stringify(nuevaLista));
  };
*/}
  return (
    <AuthProvider>
      <Container>
        <Routes>
          {/* Ruta para el login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <RutaProtegida>
                <Layout />
              </RutaProtegida>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="productos"
              element={<ListaProducto productos={productos} setProductos={setProductos} />}
            />

            {/* Ruta protegida solo para administradores para crear un nuevo producto */}
            <Route
              path="producto/nuevo"
              element={
                <RutaProtegida rolRequerido="admin">
                  <ProductoForm agregarProducto={agregarProducto} />
                </RutaProtegida>
              }
            />

            {/* Ruta protegida solo para administradores para editar un producto existente */}
            <Route
              path="productos/:id/editar"
              element={
                <RutaProtegida rolRequerido="admin">
                  <EditarProducto productos={productos} actualizarProducto={actualizarProducto} />
                </RutaProtegida>
              }
            />
            <Route
              path="productos/:id"
              element={<DetalleProducto productos={productos} />}
            />
            <Route
              path="favoritos"
              element={<Favoritos productos={productos} />}
            />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
