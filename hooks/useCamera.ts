"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type CameraFacing = "user" | "environment";
export type CameraPermission = "prompt" | "granted" | "denied" | "unsupported";

interface UseCameraOptions {
  initialFacing?: CameraFacing;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  permission: CameraPermission;
  facing: CameraFacing;
  isLoading: boolean;
  error: string | null;
  hasMultipleCameras: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => Promise<void>;
}

export function useCamera(options: UseCameraOptions = {}): UseCameraReturn {
  const { initialFacing = "user" } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permission, setPermission] = useState<CameraPermission>("prompt");
  const [facing, setFacing] = useState<CameraFacing>(initialFacing);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Check for multiple cameras
  useEffect(() => {
    async function checkCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setHasMultipleCameras(videoDevices.length > 1);
      } catch {
        // Silently handle - not critical
      }
    }
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      checkCameras();
    } else {
      setPermission("unsupported");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const startCamera = useCallback(
    async (requestedFacing?: CameraFacing) => {
      const facingToUse = requestedFacing ?? facing;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermission("unsupported");
        setError("Your device does not support camera access.");
        return;
      }

      setIsLoading(true);
      setError(null);

      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingToUse,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        setStream(mediaStream);
        setPermission("granted");

        // Re-check camera count after permission granted
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (err) {
        const e = err as DOMException;
        if (
          e.name === "NotAllowedError" ||
          e.name === "PermissionDeniedError"
        ) {
          setPermission("denied");
          setError("Camera permission was denied. Please allow camera access.");
        } else if (e.name === "NotFoundError") {
          setPermission("unsupported");
          setError("No camera found on this device.");
        } else if (e.name === "NotReadableError") {
          setError(
            "Camera is being used by another application. Please close it and try again."
          );
        } else {
          setError(`Could not access camera: ${e.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [facing, stream]
  );

  const switchCamera = useCallback(async () => {
    const newFacing = facing === "user" ? "environment" : "user";
    setFacing(newFacing);
    await startCamera(newFacing);
  }, [facing, startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    videoRef,
    stream,
    permission,
    facing,
    isLoading,
    error,
    hasMultipleCameras,
    startCamera,
    stopCamera,
    switchCamera,
  };
}
