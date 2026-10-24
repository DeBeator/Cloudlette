import type { ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Generic fetch wrapper that returns ApiResponse<T>.
 * All service files use this instead of calling fetch directly.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: body as T,
        error: body.error || body.message || `Request failed with status ${response.status}`,
      };
    }

    return {
      success: true,
      data: body as T,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return {
      success: false,
      data: undefined as unknown as T,
      error: message,
    };
  }
}
