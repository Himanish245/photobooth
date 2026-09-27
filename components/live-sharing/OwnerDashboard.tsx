"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useWebRTC } from "@/hooks/useWebRTC";

export default function OwnerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sessionId = "photobooth-live-session";
  const { connectionState, remoteStream, startConnection, stopConnection, sessionDuration } =
    useWebRTC({
      signalingUrl: "/api/signaling",
      sessionId,
      role: "receiver",
    });

  // Check existing auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        if (res.ok) {
          setIsAuthenticated(true);
        }
      } catch {
        // Not authenticated
      } finally {
        setIsAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Start listening when authenticated
  useEffect(() => {
    if (isAuthenticated && connectionState === "idle") {
      startConnection();
    }
  }, [isAuthenticated, connectionState, startConnection]);

  // Attach remote stream to video element
  useEffect(() => {
    if (videoRef.current && remoteStream) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setAuthError("Invalid password");
      }
    } catch {
      setAuthError("Connection error");
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse-soft text-rose text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-sm w-full"
        >
          <div className="text-center mb-6">
            <span className="text-3xl mb-3 block">🔐</span>
            <h1 className="heading-serif text-xl">Owner Dashboard</h1>
            <p className="text-sm text-soft-brown mt-1">
              Enter password to access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-rose/30 bg-white/80 text-soft-brown placeholder:text-soft-brown/40 focus:outline-none focus:ring-2 focus:ring-rose/50 focus:border-rose"
              autoFocus
            />

            {authError && (
              <p className="text-strawberry text-sm text-center">
                {authError}
              </p>
            )}

            <button type="submit" className="btn-primary w-full">
              Enter Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-serif text-2xl">Owner Dashboard</h1>
            <p className="text-handwritten text-lg text-rose">
              live camera viewer
            </p>
          </div>
          <a
            href="/"
            className="text-sm text-rose hover:text-deep-rose transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        {/* Connection Status */}
        <div className="glass-card p-4 mb-6 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionState === "connected"
                  ? "bg-green-500 animate-pulse"
                  : connectionState === "connecting"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-gray-400"
              }`}
            />
            <span className="text-sm font-medium text-soft-brown capitalize">
              {connectionState}
            </span>
          </div>

          {connectionState === "connected" && (
            <>
              <div className="text-sm text-soft-brown">
                Duration: <span className="font-mono">{formatDuration(sessionDuration)}</span>
              </div>
              <button
                onClick={stopConnection}
                className="ml-auto px-4 py-2 bg-strawberry/10 hover:bg-strawberry/20 text-strawberry text-sm rounded-full transition-colors border border-strawberry/30"
              >
                Disconnect
              </button>
            </>
          )}

          {connectionState === "idle" && (
            <button
              onClick={() => startConnection()}
              className="ml-auto btn-primary text-sm px-4 py-2"
            >
              Start Listening
            </button>
          )}
        </div>

        {/* Video Feed */}
        <div className="glass-card p-4 aspect-video flex items-center justify-center overflow-hidden rounded-2xl">
          {remoteStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="text-center text-soft-brown/50">
              <span className="text-4xl mb-4 block">📹</span>
              <p className="heading-serif text-lg">Waiting for visitor...</p>
              <p className="text-sm mt-2">
                {connectionState === "connecting"
                  ? "Establishing connection..."
                  : "The live feed will appear here when a visitor shares their camera."}
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 text-xs text-soft-brown/60 text-center space-y-1">
          <p>
            Live feed uses WebRTC peer-to-peer connection. No video is
            recorded or stored.
          </p>
          <p>
            The visitor must explicitly enable camera sharing for you to see
            their feed.
          </p>
        </div>
      </div>
    </div>
  );
}
