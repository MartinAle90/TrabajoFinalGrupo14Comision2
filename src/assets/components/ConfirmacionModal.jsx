import { Modal, Button } from "react-bootstrap";

function ConfirmacionModal({ mostrar, onCerrar, mensaje }) {
  return (
    <Modal show={mostrar} onHide={onCerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Éxito</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onCerrar}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmacionModal;