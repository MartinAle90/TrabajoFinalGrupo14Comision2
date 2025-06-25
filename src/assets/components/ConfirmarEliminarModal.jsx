// ConfirmDeleteModal.jsx
import { Modal, Button } from "react-bootstrap";

function ConfirmarEliminarModal({ showModal, productoSeleccionado, handleConfirmar, handleCancelar }) {
    return (
        <Modal show={showModal} onHide={handleCancelar} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que querés eliminar a{" "}
                <strong>{productoSeleccionado?.title}</strong> con ID:{" "}
                <strong>{productoSeleccionado?.id}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirmar}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmarEliminarModal;
