// ─── Shared Types ────────────────────────────────────────────────────
// Single source of truth for all domain types used across the app.
// Do not define types anywhere else — import from "@/types" instead.

// ─── Product ─────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorHex?: string;
  size: string | null;
  price: number;
  stockQty: number;
  sku: string;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  material?: string;
  fit?: string;
  careInstructions?: string;
  sku?: string;
  tags: string[];
}

// ─── Category ────────────────────────────────────────────────────────

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
}

// ─── Cart ────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string | null;
  qty: number;
  slug: string;
}

// ─── Order ───────────────────────────────────────────────────────────

export interface OrderItem {
  name: string;
  sku: string;
  color: string;
  size: string | null;
  unitPrice: number;
  qty: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  deliveryType: "delivery" | "pickup";
  address?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// ─── User ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: "admin" | "customer";
}

// ─── Shipping ────────────────────────────────────────────────────────

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}

// ─── API Response ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
