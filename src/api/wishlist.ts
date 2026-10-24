import { apiClient } from "./client";
import type { Product, ApiResponse } from "@/types";

export async function getWishlist(): Promise<ApiResponse<Product[]>> {
  return apiClient<Product[]>("/api/wishlist");
}

export async function addToWishlist(productId: string): Promise<ApiResponse<void>> {
  return apiClient<void>("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export async function removeFromWishlist(productId: string): Promise<ApiResponse<void>> {
  return apiClient<void>(`/api/wishlist/${productId}`, {
    method: "DELETE",
  });
}
