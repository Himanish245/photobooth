"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "failed";

interface UseWebRTCOptions {
  signalingUrl: string;
  sessionId: string;
  role: "sender" | "receiver";
}

interface UseWebRTCReturn {
  connectionState: ConnectionState;
  remoteStream: MediaStream | null;
  startConnection: (localStream?: MediaStream) => Promise<void>;
  stopConnection: () => void;
  sessionDuration: number;
}

export function useWebRTC(options: UseWebRTCOptions): UseWebRTCReturn {
  const { signalingUrl, sessionId, role } = options;
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("idle");
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    setRemoteStream(null);
    setSessionDuration(0);
  }, []);

  const sendSignal = useCallback(
    async (type: string, payload: unknown) => {
      try {
        await fetch(`${signalingUrl}?sessionId=${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, payload, role }),
        });
      } catch (err) {
        console.error("Signaling error:", err);
      }
    },
    [signalingUrl, sessionId, role]
  );

  const startConnection = useCallback(
    async (localStream?: MediaStream) => {
      cleanup();
      setConnectionState("connecting");

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });
      pcRef.current = pc;

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal("ice-candidate", event.candidate.toJSON());
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        switch (pc.connectionState) {
          case "connected":
            setConnectionState("connected");
            // Start duration timer
            const startTime = Date.now();
            durationIntervalRef.current = setInterval(() => {
              setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            break;
          case "disconnected":
          case "closed":
            setConnectionState("disconnected");
            if (durationIntervalRef.current) {
              clearInterval(durationIntervalRef.current);
            }
            break;
          case "failed":
            setConnectionState("failed");
            if (durationIntervalRef.current) {
              clearInterval(durationIntervalRef.current);
            }
            break;
        }
      };

      // Handle incoming tracks (receiver side)
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0] || null);
      };

      // Add local stream tracks (sender side)
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      // Listen for signaling messages via SSE
      const es = new EventSource(
        `${signalingUrl}?sessionId=${sessionId}&role=${role}`
      );
      eventSourceRef.current = es;

      es.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "offer":
              if (role === "receiver") {
                await pc.setRemoteDescription(
                  new RTCSessionDescription(data.payload)
                );
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal("answer", answer);
              }
              break;

            case "answer":
              if (role === "sender") {
                await pc.setRemoteDescription(
                  new RTCSessionDescription(data.payload)
                );
              }
              break;

            case "ice-candidate":
              if (data.payload) {
                await pc.addIceCandidate(new RTCIceCandidate(data.payload));
              }
              break;

            case "disconnect":
              cleanup();
              setConnectionState("disconnected");
              break;
          }
        } catch (err) {
          console.error("Error handling signal:", err);
        }
      };

      es.onerror = () => {
        // SSE will auto-reconnect
      };

      // If sender, create and send offer
      if (role === "sender" && localStream) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendSignal("offer", offer);
      }
    },
    [cleanup, sendSignal, role, signalingUrl, sessionId]
  );

  const stopConnection = useCallback(() => {
    sendSignal("disconnect", null);
    cleanup();
    setConnectionState("disconnected");
  }, [cleanup, sendSignal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    connectionState,
    remoteStream,
    startConnection,
    stopConnection,
    sessionDuration,
  };
}
