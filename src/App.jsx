import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Nosotros from "./assets/components/Nosotros";
import Home from "./assets/components/Home";
import ErrorPage from "./assets/components/ErrorPage";

function App() {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;