import { NextResponse } from "next/server";

// TODO: update BACKEND_URL env var to point to api.cloudlette.com when backend is live
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required" },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await backendRes.json();

      if (!backendRes.ok) {
        return NextResponse.json(
          { error: data.error || data.message || "Failed to create account" },
          { status: backendRes.status }
        );
      }

      const response = NextResponse.json({ user: data.user }, { status: 200 });

      if (data.token) {
        response.cookies.set("auth_token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }

      return response;
    } catch {
      // Backend is offline / not running during local dev fallback
      return NextResponse.json(
        { error: "Unable to connect to authentication server" },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
