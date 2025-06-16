import { createContext, useContext, useState, useEffect } from "react";
const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      // Declaración única de initialProductos
      const initialProductos = JSON.parse(localStorage.getItem("productos"));

      if (initialProductos && initialProductos > 0) {
        setProducts(initialProductos);
      } else {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();

          const whitFavorite = data.map((p) => ({
            ...p,
            favorite: false,
            estado: true,
          }));

          localStorage.setItem("productos", JSON.stringify(whitFavorite));
          setProducts(whitFavorite);
        } catch (e) {
          console.error("Error al cargar la api", error);
        }
      }
    };

    loadProducts();
  }, []);

  const saveToLocalStorage = (updated) => {
    setProducts(updated);
    localStorage.setItem("productos", JSON.stringify(updated));
  };

  //Marcar o desmarcar favorito
  const toggleFavorite = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p,
    );
    saveToLocalStorage(updated);
  };

  //agregar producto
  const addProduct = (product) => {
    let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
    ultimoId += 1;
    localStorage.setItem("ultimoId", ultimoId.toString());

    const newProduct = {
      ...product,
      id: ultimoId,
      favorite: false,
      estado: true,
    };

    const updated = [...products, newProduct];
    saveToLocalStorage(updated);
  };

  //Editar producto
  const editProduct = (id, updatedData) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p,
    );
    saveToLocalStorage(updated);
  };

  //eliminar producto
  const deleteProduct = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, estado: false } : p,
    );
    saveToLocalStorage(updated);
  };


  return (
    <ProductsContext.Provider
      value={{
        products,
        favorites: products.filter((p) => p.favorite),
        toggleFavorite,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
