import { useMemo } from "react";

export function useFilteredProducts(products, searchTerm) {
  return useMemo(() => {
    if (!searchTerm) return products;

    return products.filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    });
  }, [products, searchTerm]);
}
