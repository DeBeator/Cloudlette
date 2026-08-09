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

// Flatten all product variants into individual stock items with realistic inventory values
function buildInitialStockItems(): StockItem[] {
  const items: StockItem[] = [];

  // Map of specific variant IDs for controlled low/out-of-stock count
  const SPECIFIC_STOCK: Record<string, number> = {
    "var-1-3": 0, // 1 Out of Stock (0)
    "var-4-2": 1, // Low Stock (1)
    "var-2-4": 2, // Low Stock (2)
    "var-3-4": 3, // Low Stock (3)
  };

  let counter = 0;

  MOCK_PRODUCTS.forEach((product) => {
    product.variants.forEach((v, index) => {
      counter++;
      const variantId = v.id || `${product.id}-var-${index}`;

      let qty = SPECIFIC_STOCK[variantId];
      if (qty === undefined) {
        // Realistic stock in range 5–20 units
        qty = 5 + ((counter * 7 + index * 3) % 16);
      }

      items.push({
        variantId,
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
