import { delay } from "./delay";
import type { CartItem, ApiResponse } from "@/types";

export async function getCart(): Promise<ApiResponse<CartItem[]>> {
  await delay();
  return { success: true, data: [] };
}

export async function addToCart(item: Omit<CartItem, "id">): Promise<ApiResponse<CartItem>> {
  await delay();
  const cartItem: CartItem = { ...item, id: item.variantId };
  return { success: true, data: cartItem };
}

export async function updateCartItem(
  variantId: string,
  qty: number
): Promise<ApiResponse<CartItem>> {
  await delay();
  return {
    success: true,
    data: { id: variantId, variantId, qty } as unknown as CartItem,
  };
}

export async function removeFromCart(_variantId: string): Promise<ApiResponse<void>> {
  await delay();
  return { success: true, data: undefined as unknown as void };
}

export async function clearCart(): Promise<ApiResponse<void>> {
  await delay();
  return { success: true, data: undefined as unknown as void };
}
