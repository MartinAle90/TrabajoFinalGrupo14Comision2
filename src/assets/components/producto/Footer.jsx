import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto shadow-lg">
            <Container>
                <Row className="align-items-center text-center">
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <span className="fw-bold">© 2025 - Grupo 14</span>
                    </Col>
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <small>Todos los derechos reservados.</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;