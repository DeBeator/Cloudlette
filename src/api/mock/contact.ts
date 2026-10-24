import { delay } from "./delay";
import type { ApiResponse } from "@/types";
import type { ContactFormPayload } from "@/api/contact";

export async function submitContactForm(
  _payload: ContactFormPayload
): Promise<ApiResponse<{ message: string }>> {
  await delay();
  return { success: true, data: { message: "Message sent successfully" } };
}
