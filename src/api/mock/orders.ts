import { delay } from "./delay";
import { getMockOrders, getMockOrderById } from "@/lib/mock-orders";
import type { Order, ApiResponse } from "@/types";

// Map MockOrder shape to the shared Order type
function toOrder(mock: ReturnType<typeof getMockOrders>[number]): Order {
  return {
    id: mock.id,
    orderNumber: mock.id,
    date: mock.date,
    status: mock.status,
    deliveryType: mock.deliveryType,
    address: mock.address,
    customer: mock.customer,
    items: mock.items.map((item) => ({
      name: item.name,
      sku: "",
      color: item.color,
      size: item.size,
      unitPrice: item.price,
      qty: item.quantity,
      totalPrice: item.price * item.quantity,
    })),
    subtotal: mock.subtotal,
    shippingFee: mock.shippingFee,
    total: mock.total,
  };
}

export async function getOrders(): Promise<ApiResponse<Order[]>> {
  await delay();
  const orders = getMockOrders().map(toOrder);
  return { success: true, data: orders };
}

export async function getOrder(id: string): Promise<ApiResponse<Order>> {
  await delay();
  const mock = getMockOrderById(id);
  if (!mock) {
    return { success: false, data: undefined as unknown as Order, error: "Order not found" };
  }
  return { success: true, data: toOrder(mock) };
}

export async function trackOrder(
  orderNumber: string,
  _contact: string
): Promise<ApiResponse<Order>> {
  await delay();
  const mock = getMockOrderById(orderNumber);
  if (!mock) {
    return { success: false, data: undefined as unknown as Order, error: "Order not found" };
  }
  return { success: true, data: toOrder(mock) };
}
