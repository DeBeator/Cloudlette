import { apiClient } from "./client";
import type { ShippingMethod, Order, ApiResponse } from "@/types";

export interface ShippingAddress {
  state: string;
  city: string;
  country?: string;
}

export interface CreateOrderPayload {
  items: {
    productId: string;
    variantId: string;
    qty: number;
  }[];
  shippingMethodId: string;
  deliveryType: "delivery" | "pickup";
  address?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function getShippingMethods(
  address: ShippingAddress
): Promise<ApiResponse<ShippingMethod[]>> {
  const params = new URLSearchParams();
  if (address.state) params.set("state", address.state);
  if (address.city) params.set("city", address.city);
  if (address.country) params.set("country", address.country);

  return apiClient<ShippingMethod[]>(`/api/checkout/shipping?${params.toString()}`);
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<ApiResponse<Order>> {
  return apiClient<Order>("/api/checkout/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
