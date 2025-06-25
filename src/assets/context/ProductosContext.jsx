import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductosProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = localStorage.getItem("productos");
      let initialProductsData = [];

      if (storedProducts) {
        try {
          initialProductsData = JSON.parse(storedProducts);
          if (
            Array.isArray(initialProductsData) &&
            initialProductsData.length > 0
          ) {
            setProducts(initialProductsData);
          } else {
            console.log(
              "LocalStorage 'productos' está vacío o inválido, cargando desde la API.",
            );
            await fetchAndSetProducts();
          }
        } catch (e) {
          console.error("Error al parsear productos desde localStorage:", e);
          await fetchAndSetProducts();
        }
      } else {
        console.log(
          "No hay 'productos' en localStorage, cargando desde la API.",
        );
        await fetchAndSetProducts();
      }
    };

    const fetchAndSetProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const productsWithMeta = data.map((p) => ({
          ...p,
          favorite: false,
          estado: true,
        }));

        localStorage.setItem("productos", JSON.stringify(productsWithMeta));
        setProducts(productsWithMeta);
      } catch (e) {
        console.error("Error al cargar productos desde la API:", e);
      }
    };

    loadProducts();
  }, []);

  const saveToLocalStorage = (updated) => {
    setProducts(updated);
    localStorage.setItem("productos", JSON.stringify(updated));
  };

  // Marcar o desmarcar favorito
  const toggleFavorite = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p,
    );
    saveToLocalStorage(updated);
  };

  // Agregar producto
  const addProduct = (product) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const nuevoId = maxId + 1;

    const newProduct = {
      ...product,
      id: nuevoId,
      favorite: false,
      estado: true, // Por defecto, un producto nuevo está activo
    };

    const updated = [...products, newProduct];
    saveToLocalStorage(updated);

    localStorage.setItem("ultimoId", nuevoId.toString());
  };

  // Editar producto
  const editProduct = (id, updatedData) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p,
    );
    saveToLocalStorage(updated);
  };

  // Eliminar producto (eliminación suave: cambia 'estado' a false)
  const deleteProduct = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, estado: false } : p,
    );
    saveToLocalStorage(updated);
  };

  //Restaurar producto
  const restoreProduct = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, estado: true } : p,
    );
    saveToLocalStorage(updated);
  };

  //Eliminar permanentemente un producto
  const hardDeleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveToLocalStorage(updated);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        favorites: products.filter((p) => p.favorite && p.estado !== false),
        toggleFavorite,
        addProduct,
        editProduct,
        deleteProduct,
        restoreProduct,
        hardDeleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};