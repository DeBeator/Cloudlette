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

    // A reset provider has not been integrated. Do not claim an email was sent.
    return NextResponse.json(
      {
        error: "Password reset is not available yet. Please try again after account services are connected.",
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
