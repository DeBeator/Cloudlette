import { MOCK_PRODUCTS } from "./mock-data";

// TODO: PUT /api/products/variants/:id/stock

export interface StockItem {
  variantId: string;
  productId: string;
  productName: string;
  category: string;
  color: string;
  size: string;
  image: string;
  stockQty: number;
}

export function getStockStatusInfo(qty: number): {
  label: string;
  badgeStyle: string;
  statusKey: "out" | "low" | "in";
} {
  if (qty === 0) {
    return {
      label: "Out of Stock",
      badgeStyle: "bg-rose-50 text-rose-800 border-rose-300",
      statusKey: "out",
    };
  }
  if (qty <= 3) {
    return {
      label: "Low Stock",
      badgeStyle: "bg-amber-50 text-amber-800 border-amber-300",
      statusKey: "low",
    };
  }
  return {
    label: "In Stock",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-300",
    statusKey: "in",
  };
}
