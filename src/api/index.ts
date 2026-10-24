// When NEXT_PUBLIC_API_URL is empty/unset, use mock adapters.
// When it has a value, use real API clients.
export const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

// ─── Products ────────────────────────────────────────────────────────
import * as realProducts from "./products";
import * as mockProducts from "./mock/products";
export const products = USE_MOCK ? mockProducts : realProducts;

// ─── Auth ────────────────────────────────────────────────────────────
import * as realAuth from "./auth";
import * as mockAuth from "./mock/auth";
export const auth = USE_MOCK ? mockAuth : realAuth;

// ─── Cart ────────────────────────────────────────────────────────────
import * as realCart from "./cart";
import * as mockCart from "./mock/cart";
export const cart = USE_MOCK ? mockCart : realCart;

// ─── Orders ──────────────────────────────────────────────────────────
import * as realOrders from "./orders";
import * as mockOrders from "./mock/orders";
export const orders = USE_MOCK ? mockOrders : realOrders;

// ─── Wishlist ────────────────────────────────────────────────────────
import * as realWishlist from "./wishlist";
import * as mockWishlist from "./mock/wishlist";
export const wishlist = USE_MOCK ? mockWishlist : realWishlist;

// ─── Checkout ────────────────────────────────────────────────────────
import * as realCheckout from "./checkout";
import * as mockCheckout from "./mock/checkout";
export const checkout = USE_MOCK ? mockCheckout : realCheckout;

// ─── Contact ─────────────────────────────────────────────────────────
import * as realContact from "./contact";
import * as mockContact from "./mock/contact";
export const contact = USE_MOCK ? mockContact : realContact;
