import { create } from "zustand";
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

// Flatten all product variants into individual stock items with sample stock values
function buildInitialStockItems(): StockItem[] {
  const items: StockItem[] = [];

  MOCK_PRODUCTS.forEach((product) => {
    product.variants.forEach((v, index) => {
      let qty = v.stock_qty ?? v.stockQty;
      if (qty === undefined) {
        // Sample low stock values for specific variants
        if (product.id === "prod-1" && index === 0) qty = 2; // Low stock (2)
        else if (product.id === "prod-4" && index === 0) qty = 1; // Low stock (1)
        else if (product.id === "prod-2" && index === 0) qty = 3; // Low stock (3)
        else qty = 8 + index * 4;
      }

      items.push({
        variantId: v.id || `${product.id}-var-${index}`,
        productId: product.id,
        productName: product.name,
        category: product.category,
        color: v.color,
        size: v.size || (product.category === "bag" ? "N/A" : "Standard"),
        image: product.images[0],
        stockQty: qty,
      });
    });
  });

  return items;
}

interface StockStore {
  items: StockItem[];
  updateStockQty: (variantId: string, newQty: number) => void;
}

export const useStockStore = create<StockStore>((set) => ({
  items: buildInitialStockItems(),
  updateStockQty: (variantId: string, newQty: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.variantId === variantId
          ? { ...item, stockQty: Math.max(0, newQty) }
          : item
      ),
    })),
}));

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
