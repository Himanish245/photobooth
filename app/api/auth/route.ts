import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DASHBOARD_PASSWORD =
  process.env.DASHBOARD_PASSWORD || "photobooth-admin-2024";
const SESSION_TOKEN = "photobooth-dashboard-session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === DASHBOARD_PASSWORD) {
      // Generate a simple session token
      const token = Buffer.from(
        `${DASHBOARD_PASSWORD}-${Date.now()}`
      ).toString("base64");

      const cookieStore = await cookies();
      cookieStore.set(SESSION_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_TOKEN);

  if (token && token.value) {
    // Verify the token is valid (contains our password prefix)
    try {
      const decoded = Buffer.from(token.value, "base64").toString();
      if (decoded.startsWith(DASHBOARD_PASSWORD)) {
        return NextResponse.json({ authenticated: true });
      }
    } catch {
      // Invalid token
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
