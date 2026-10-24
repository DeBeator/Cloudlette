import { apiClient } from "./client";
import type { CartItem, ApiResponse } from "@/types";

export async function getCart(): Promise<ApiResponse<CartItem[]>> {
  return apiClient<CartItem[]>("/api/cart");
}

export async function addToCart(item: Omit<CartItem, "id">): Promise<ApiResponse<CartItem>> {
  return apiClient<CartItem>("/api/cart", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function updateCartItem(
  variantId: string,
  qty: number
): Promise<ApiResponse<CartItem>> {
  return apiClient<CartItem>(`/api/cart/${variantId}`, {
    method: "PUT",
    body: JSON.stringify({ qty }),
  });
}

export async function removeFromCart(variantId: string): Promise<ApiResponse<void>> {
  return apiClient<void>(`/api/cart/${variantId}`, {
    method: "DELETE",
  });
}

export async function clearCart(): Promise<ApiResponse<void>> {
  return apiClient<void>("/api/cart", {
    method: "DELETE",
  });
}
