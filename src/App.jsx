import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/components/Home";

function App() {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;