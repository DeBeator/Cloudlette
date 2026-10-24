import { apiClient } from "./client";
import type { Product, Category, ApiResponse } from "@/types";

export interface ProductFilters {
  category?: string;
  tag?: string;
  search?: string;
  sort?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
  const params = new URLSearchParams();
  if (filters?.category) params.set("category", filters.category);
  if (filters?.tag) params.set("tag", filters.tag);
  if (filters?.search) params.set("search", filters.search);
  if (filters?.sort) params.set("sort", filters.sort);

  const query = params.toString();
  return apiClient<Product[]>(`/api/products${query ? `?${query}` : ""}`);
}

export async function getProduct(slug: string): Promise<ApiResponse<Product>> {
  return apiClient<Product>(`/api/products/${slug}`);
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiClient<Category[]>("/api/categories");
}

export async function getCategory(slug: string): Promise<ApiResponse<Category>> {
  return apiClient<Category>(`/api/categories/${slug}`);
}
