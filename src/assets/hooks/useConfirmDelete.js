import { useState } from "react";

export default function useConfirmDelete(onConfirm) {
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const confirmarEliminar = (producto) => {
        setProductoSeleccionado(producto);
        setShowModal(true);
    };

    const handleConfirmar = () => {
        if (productoSeleccionado) {
            onConfirm(productoSeleccionado);
        }
        setShowModal(false);
        setProductoSeleccionado(null);
    };

    const handleCancelar = () => {
        setShowModal(false);
        setProductoSeleccionado(null);
    };

    return { showModal, productoSeleccionado, confirmarEliminar, handleConfirmar, handleCancelar, };
}