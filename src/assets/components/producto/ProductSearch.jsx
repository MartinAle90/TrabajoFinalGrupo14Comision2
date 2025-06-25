import { Form } from "react-bootstrap";

function ProductSearch({ searchTerm, onSearchChange }) {
  return (
    <Form className="my-3">
      <Form.Control
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Form>
  );
}

export default ProductSearch;
