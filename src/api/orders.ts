import { apiClient } from "./client";
import type { Order, ApiResponse } from "@/types";

export async function getOrders(): Promise<ApiResponse<Order[]>> {
  return apiClient<Order[]>("/api/orders");
}

export async function getOrder(id: string): Promise<ApiResponse<Order>> {
  return apiClient<Order>(`/api/orders/${id}`);
}

export async function trackOrder(
  orderNumber: string,
  contact: string
): Promise<ApiResponse<Order>> {
  return apiClient<Order>("/api/orders/track", {
    method: "POST",
    body: JSON.stringify({ orderNumber, contact }),
  });
}
