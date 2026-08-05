import { CartItem } from "@/store/useCartStore";

// TODO: replace mock orders with GET /api/orders (authenticated)
// TODO: PUT /api/orders/:id/status

export interface MockOrder {
  id: string; // e.g. "CLD-C42PY7"
  date: string; // ISO date string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  deliveryType: "delivery" | "pickup";
  address?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "CLD-C42PY7",
    date: "2026-08-02T14:30:00Z",
    status: "confirmed",
    deliveryType: "delivery",
    address: "14 Admiralty Way, Lekki Phase 1, Lagos State",
    customer: {
      name: "Amara Okafor",
      email: "amara.okafor@example.com",
      phone: "08012345678",
    },
    subtotal: 100000,
    shippingFee: 3500,
    total: 103500,
    items: [
      {
        id: "var-1-1",
        productId: "prod-1",
        variantId: "var-1-1",
        name: "Aurelia Structured Leather Tote",
        category: "bag",
        price: 68000,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        color: "Tan Brown",
        size: null,
        quantity: 1,
      },
      {
        id: "var-2-1",
        productId: "prod-2",
        variantId: "var-2-1",
        name: "Sienna Silk Draped Blouse",
        category: "top",
        price: 32000,
        image:
          "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
        color: "Blush Pink",
        size: "S",
        quantity: 1,
      },
    ],
  },
  {
    id: "CLD-K98M3X",
    date: "2026-07-28T09:15:00Z",
    status: "shipped",
    deliveryType: "pickup",
    address: "Berger Park Pickup Station, Lagos",
    customer: {
      name: "Chidi Nnamdi",
      email: "chidi.nnamdi@example.com",
      phone: "08023456789",
    },
    subtotal: 45000,
    shippingFee: 1000,
    total: 46000,
    items: [
      {
        id: "var-3-1",
        productId: "prod-3",
        variantId: "var-3-1",
        name: "Lagos Statement Block Heels",
        category: "shoe",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        color: "Emerald Green",
        size: "38",
        quantity: 1,
      },
    ],
  },
  {
    id: "CLD-B71L90",
    date: "2026-07-15T16:45:00Z",
    status: "delivered",
    deliveryType: "delivery",
    address: "42 Isaac John Street, Ikeja GRA, Lagos State",
    customer: {
      name: "Folake Adebayo",
      email: "folake.adebayo@example.com",
      phone: "08034567890",
    },
    subtotal: 52000,
    shippingFee: 3500,
    total: 55500,
    items: [
      {
        id: "var-4-1",
        productId: "prod-4",
        variantId: "var-4-1",
        name: "Celeste Woven Shoulder Bag",
        category: "bag",
        price: 52000,
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
        color: "Honey Beige",
        size: null,
        quantity: 1,
      },
    ],
  },
  {
    id: "CLD-P34V12",
    date: "2026-06-30T11:20:00Z",
    status: "pending",
    deliveryType: "delivery",
    address: "8 Wuse Zone 4, Abuja FCT",
    customer: {
      name: "Ibrahim Musa",
      email: "ibrahim.musa@example.com",
      phone: "08045678901",
    },
    subtotal: 28500,
    shippingFee: 5000,
    total: 33500,
    items: [
      {
        id: "var-5-1",
        productId: "prod-5",
        variantId: "var-5-1",
        name: "Zaria Satin Wrap Top",
        category: "top",
        price: 28500,
        image:
          "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
        color: "Royal Burgundy",
        size: "M",
        quantity: 1,
      },
    ],
  },
  {
    id: "CLD-R82M19",
    date: "2026-06-18T13:10:00Z",
    status: "cancelled",
    deliveryType: "delivery",
    address: "21 Trans-Amadi Layout, Port Harcourt, Rivers State",
    customer: {
      name: "Zainab Bello",
      email: "zainab.bello@example.com",
      phone: "08056789012",
    },
    subtotal: 36000,
    shippingFee: 5000,
    total: 41000,
    items: [
      {
        id: "var-6-1",
        productId: "prod-6",
        variantId: "var-6-1",
        name: "Kano Leather Mules",
        category: "shoe",
        price: 36000,
        image:
          "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
        color: "Onyx Black",
        size: "39",
        quantity: 1,
      },
    ],
  },
  {
    id: "CLD-W55T84",
    date: "2026-06-05T08:50:00Z",
    status: "confirmed",
    deliveryType: "delivery",
    address: "15 Commercial Avenue, Yaba, Lagos State",
    customer: {
      name: "Emeka Nwosu",
      email: "emeka.nwosu@example.com",
      phone: "08067890123",
    },
    subtotal: 68000,
    shippingFee: 3500,
    total: 71500,
    items: [
      {
        id: "var-1-1",
        productId: "prod-1",
        variantId: "var-1-1",
        name: "Aurelia Structured Leather Tote",
        category: "bag",
        price: 68000,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        color: "Tan Brown",
        size: null,
        quantity: 1,
      },
    ],
  },
];

export function getMockOrders(): MockOrder[] {
  return MOCK_ORDERS;
}

export function getMockOrderById(id: string): MockOrder | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
