import { NextResponse } from "next/server";

// TODO: wire reset email flow when backend email provider is configured

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Standard security practice: return success regardless of email existence
    return NextResponse.json(
      {
        message:
          "If an account exists for that email, you'll receive a reset link shortly.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
