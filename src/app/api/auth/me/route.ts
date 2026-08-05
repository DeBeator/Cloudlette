import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// TODO: update BACKEND_URL env var to point to api.cloudlette.com when backend is live
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `auth_token=${token}`,
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const data = await backendRes.json();
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch {
    // Graceful 401 response when backend is offline/unreachable
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
}
