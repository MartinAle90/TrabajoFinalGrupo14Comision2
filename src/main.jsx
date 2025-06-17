import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductosProvider } from "./assets/context/ProductosContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductosProvider>
        <App />
      </ProductosProvider>
    </BrowserRouter>
  </StrictMode>,
);
