import { delay } from "./delay";
import {
  MOCK_PRODUCTS,
  getProductById,
} from "@/lib/mock-data";
import type { Product, Category, ApiResponse } from "@/types";
import type { ProductFilters } from "@/api/products";

// Categories derived from mock products
const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "bag", name: "Bags", description: "Premium leather bags and clutches" },
  { id: "cat-2", slug: "shoe", name: "Shoes", description: "Statement heels, mules, and slides" },
  { id: "cat-3", slug: "top", name: "Tops", description: "Silk, satin, and linen tops" },
];

export async function getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
  await delay();
  let products = MOCK_PRODUCTS as unknown as Product[];

  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category);
  }
  if (filters?.tag) {
    products = products.filter((p) => p.tags.includes(filters.tag!));
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(q));
  }

  return { success: true, data: products };
}

export async function getProduct(slug: string): Promise<ApiResponse<Product>> {
  await delay();
  // Support lookup by slug or id for backwards compatibility
  const product = (MOCK_PRODUCTS as unknown as Product[]).find(
    (p) => p.slug === slug || p.id === slug
  );
  if (!product) {
    return { success: false, data: undefined as unknown as Product, error: "Product not found" };
  }
  return { success: true, data: product };
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  await delay();
  return { success: true, data: MOCK_CATEGORIES };
}

export async function getCategory(slug: string): Promise<ApiResponse<Category>> {
  await delay();
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return { success: false, data: undefined as unknown as Category, error: "Category not found" };
  }
  return { success: true, data: category };
}
