import { delay } from "./delay";
import type { ShippingMethod, Order, ApiResponse } from "@/types";
import type { ShippingAddress, CreateOrderPayload } from "@/api/checkout";

const MOCK_SHIPPING_METHODS: ShippingMethod[] = [
  { id: "ship-1", name: "Standard Delivery (Lagos)", price: 3500, estimatedDays: 3 },
  { id: "ship-2", name: "Express Delivery (Lagos)", price: 5000, estimatedDays: 1 },
  { id: "ship-3", name: "Standard Delivery (Other States)", price: 5000, estimatedDays: 5 },
  { id: "ship-4", name: "Pickup Station", price: 1000, estimatedDays: 2 },
];

export async function getShippingMethods(
  _address: ShippingAddress
): Promise<ApiResponse<ShippingMethod[]>> {
  await delay();
  return { success: true, data: MOCK_SHIPPING_METHODS };
}

export async function createOrder(
  _payload: CreateOrderPayload
): Promise<ApiResponse<Order>> {
  await delay();
  return {
    success: false,
    data: undefined as unknown as Order,
    error: "Mock checkout: backend not connected",
  };
}
