import { delay } from "./delay";
import type { User, ApiResponse } from "@/types";

export async function login(
  _email: string,
  _password: string
): Promise<ApiResponse<{ user: User }>> {
  await delay();
  return {
    success: false,
    data: undefined as unknown as { user: User },
    error: "Mock auth: backend not connected",
  };
}

export async function signup(
  _fullName: string,
  _email: string,
  _phone: string,
  _password: string
): Promise<ApiResponse<{ user: User }>> {
  await delay();
  return {
    success: false,
    data: undefined as unknown as { user: User },
    error: "Mock auth: backend not connected",
  };
}

export async function logout(): Promise<ApiResponse<{ message: string }>> {
  await delay();
  return { success: true, data: { message: "Logged out" } };
}

export async function getMe(): Promise<ApiResponse<{ user: User }>> {
  await delay();
  return {
    success: false,
    data: undefined as unknown as { user: User },
    error: "Not authenticated",
  };
}
