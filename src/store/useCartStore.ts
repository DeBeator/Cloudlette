import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // unique item key (variantId)
  productId: string;
  variantId: string;
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
  size: string | null;
  quantity: number;
}

interface AddItemOptions {
  openDrawer?: boolean;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: Omit<CartItem, "id"> | CartItem, options?: AddItemOptions) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem, options) =>
        set((state) => {
          const itemId =
            newItem.variantId ||
            ("id" in newItem ? (newItem as CartItem).id : undefined) ||
            `${newItem.productId}-${newItem.color}-${newItem.size || "nosize"}`;
          const existingIndex = state.items.findIndex(
            (item) => item.variantId === itemId || item.id === itemId
          );

          let updatedItems: CartItem[];

          if (existingIndex > -1) {
            updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + (newItem.quantity || 1),
            };
          } else {
            const formattedItem: CartItem = {
              ...newItem,
              id: itemId,
              variantId: itemId,
              quantity: newItem.quantity || 1,
            };
            updatedItems = [...state.items, formattedItem];
          }

          // Auto-open drawer desktop check: if options.openDrawer is explicit, use it.
          // Otherwise, auto-open only on desktop screens (>= 768px).
          const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
          const shouldOpen = options?.openDrawer ?? isDesktop;

          return {
            items: updatedItems,
            isOpen: shouldOpen ? true : state.isOpen,
          };
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId && item.id !== variantId),
        })),

      updateQty: (variantId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.variantId !== variantId && item.id !== variantId)
              : state.items.map((item) =>
                  item.variantId === variantId || item.id === variantId
                    ? { ...item, quantity }
                    : item
                ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cloudlette-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
