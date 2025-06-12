import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import {
  BsFillHouseDoorFill,
  BsCardList,
  BsPatchPlus,
  BsFillInfoCircleFill,
  BsStarFill,
} from "react-icons/bs";

function Layout() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadowHeader" >
        <Container>
          <Navbar.Brand>TP Integrador - Prog. Visual</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link text-secondary text-center">
              <BsFillHouseDoorFill size={24} className="d-block mx-auto mb-1" />
              Home
            </Nav.Link>

            <Nav.Link href="/productos" className="nav-link text-center">
              <BsCardList size={24} className="d-block mx-auto mb-1" />
              Productos
            </Nav.Link>

            <Nav.Link href="/favoritos" className="nav-link text-center">
              <BsStarFill size={24} className="d-block mx-auto mb-1" />
              Favoritos
            </Nav.Link>

            <Nav.Link href="/producto/nuevo" className="nav-link text-center">
              <BsPatchPlus size={24} className="d-block mx-auto mb-1" />
              Nuevo Producto
            </Nav.Link>

            <Nav.Link href="/nosotros" className="nav-link text-center">
              <BsFillInfoCircleFill size={24} className="d-block mx-auto mb-1" />
              Acerca de
            </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
