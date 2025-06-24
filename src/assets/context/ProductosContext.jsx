import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductosProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // const [favorites, setFavorites] = useState([]); // Este no se usa directamente como estado

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = localStorage.getItem("productos");
      let initialProductsData = [];

      if (storedProducts) {
        try {
          initialProductsData = JSON.parse(storedProducts);
          // Verificamos si es un array y si tiene elementos
          if (
            Array.isArray(initialProductsData) &&
            initialProductsData.length > 0
          ) {
            setProducts(initialProductsData);
          } else {
            // Si el localStorage está vacío se cargan los datos desde la API
            console.log(
              "LocalStorage 'productos' está vacío o inválido, cargando desde la API.",
            );
            await fetchAndSetProducts();
          }
        } catch (e) {
          // Si hay un error al parsear JSON se cargan los datos desde la API
          console.error("Error al parsear productos desde localStorage:", e);
          await fetchAndSetProducts();
        }
      } else {
        // Si no hay nada en localStorage se cargan los datos desde la API
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

  //Marcar o desmarcar favorito
  const toggleFavorite = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p,
    );
    saveToLocalStorage(updated);
  };

  //agregar producto
  const addProduct = (product) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const nuevoId = maxId + 1;

    const newProduct = {
      ...product,
      id: nuevoId,
      favorite: false,
      estado: true,
    };

    const updated = [...products, newProduct];
    saveToLocalStorage(updated);

    localStorage.setItem("ultimoId", nuevoId.toString());
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
        favorites: products.filter((p) => p.favorite && p.estado !== false),
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
