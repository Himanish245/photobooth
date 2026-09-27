"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseCountdownReturn {
  count: number | null;
  isActive: boolean;
  start: (from?: number) => void;
  cancel: () => void;
}

export function useCountdown(
  onComplete: () => void,
  defaultFrom: number = 3
): UseCountdownReturn {
  const [count, setCount] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref updated
  onCompleteRef.current = onComplete;

  const cancel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCount(null);
    setIsActive(false);
  }, []);

  const start = useCallback(
    (from: number = defaultFrom) => {
      cancel();
      setCount(from);
      setIsActive(true);

      intervalRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsActive(false);
            // Call onComplete after the final tick
            setTimeout(() => onCompleteRef.current(), 100);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [cancel, defaultFrom]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { count, isActive, start, cancel };
}
