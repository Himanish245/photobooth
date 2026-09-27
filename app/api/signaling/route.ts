import { NextRequest, NextResponse } from "next/server";

// In-memory signaling store
// In production, use Redis or similar
interface SignalMessage {
  type: string;
  payload: unknown;
  role: string;
  timestamp: number;
}

interface Session {
  messages: SignalMessage[];
  controllers: ReadableStreamDefaultController[];
}

const sessions = new Map<string, Session>();

function getSession(sessionId: string): Session {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { messages: [], controllers: [] });
  }
  return sessions.get(sessionId)!;
}

// GET: SSE stream for receiving signaling messages
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const role = request.nextUrl.searchParams.get("role");

  if (!sessionId || !role) {
    return NextResponse.json(
      { error: "sessionId and role required" },
      { status: 400 }
    );
  }

  const session = getSession(sessionId);

  const stream = new ReadableStream({
    start(controller) {
      session.controllers.push(controller);

      // Send initial connection message
      const data = JSON.stringify({
        type: "connected",
        payload: { role, sessionId },
      });
      controller.enqueue(`data: ${data}\n\n`);

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        const idx = session.controllers.indexOf(controller);
        if (idx > -1) {
          session.controllers.splice(idx, 1);
        }
        // Clean up empty sessions
        if (session.controllers.length === 0) {
          sessions.delete(sessionId);
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Connection: "keep-alive",
    },
  });
}

// POST: Send signaling message to other peer
export async function POST(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const { type, payload, role } = body;

    const session = getSession(sessionId);

    const message: SignalMessage = {
      type,
      payload,
      role,
      timestamp: Date.now(),
    };

    session.messages.push(message);

    // Broadcast to all connected controllers (except sender)
    const data = JSON.stringify({ type, payload, fromRole: role });
    session.controllers.forEach((controller) => {
      try {
        controller.enqueue(`data: ${data}\n\n`);
      } catch {
        // Controller may be closed
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
