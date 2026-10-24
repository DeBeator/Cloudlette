import { delay } from "./delay";
import type { Product, ApiResponse } from "@/types";

export async function getWishlist(): Promise<ApiResponse<Product[]>> {
  await delay();
  return { success: true, data: [] };
}

export async function addToWishlist(_productId: string): Promise<ApiResponse<void>> {
  await delay();
  return { success: true, data: undefined as unknown as void };
}

export async function removeFromWishlist(_productId: string): Promise<ApiResponse<void>> {
  await delay();
  return { success: true, data: undefined as unknown as void };
}
