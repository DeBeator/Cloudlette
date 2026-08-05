import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// TODO: update BACKEND_URL env var to point to api.cloudlette.com when backend is live
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export async function POST() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `auth_token=${token}`,
        },
      });
    } catch {
      // Ignore backend connectivity errors during logout
    }
  }

  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
