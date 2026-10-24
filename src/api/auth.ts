import { apiClient } from "./client";
import type { User, ApiResponse } from "@/types";

export async function login(email: string, password: string): Promise<ApiResponse<{ user: User }>> {
  return apiClient<{ user: User }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(
  fullName: string,
  email: string,
  phone: string,
  password: string
): Promise<ApiResponse<{ user: User }>> {
  return apiClient<{ user: User }>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ fullName, email, phone, password }),
  });
}

export async function logout(): Promise<ApiResponse<{ message: string }>> {
  return apiClient<{ message: string }>("/api/auth/logout", {
    method: "POST",
  });
}

export async function getMe(): Promise<ApiResponse<{ user: User }>> {
  return apiClient<{ user: User }>("/api/auth/me");
}
