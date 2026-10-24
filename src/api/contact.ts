import { apiClient } from "./client";
import type { ApiResponse } from "@/types";

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<ApiResponse<{ message: string }>> {
  return apiClient<{ message: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
