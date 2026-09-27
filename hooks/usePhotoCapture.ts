"use client";

import { useCallback, useRef } from "react";
import { type FilterName, applyFilter } from "@/lib/filters";
import { type FrameName, drawFrame } from "@/lib/frames";

interface CaptureOptions {
  filter: FilterName;
  frame: FrameName;
}

interface UsePhotoCaptureReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  capturePhoto: (
    videoElement: HTMLVideoElement,
    options: CaptureOptions
  ) => string | null;
}

export function usePhotoCapture(): UsePhotoCaptureReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const capturePhoto = useCallback(
    (videoElement: HTMLVideoElement, options: CaptureOptions): string | null => {
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const width = videoElement.videoWidth || 640;
      const height = videoElement.videoHeight || 480;

      canvas.width = width;
      canvas.height = height;

      // Draw the current video frame
      // Mirror the image if using front camera (for natural selfie experience)
      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoElement, 0, 0, width, height);
      ctx.restore();

      // Apply filter
      if (options.filter !== "none") {
        applyFilter(ctx, width, height, options.filter);
      }

      // Draw frame
      if (options.frame !== "none") {
        drawFrame(ctx, width, height, options.frame);
      }

      return canvas.toDataURL("image/png");
    },
    []
  );

  return { canvasRef, capturePhoto };
}
