"use client";

import { motion } from "framer-motion";

interface LiveIndicatorProps {
  isActive: boolean;
  onStopSharing: () => void;
}

export default function LiveIndicator({
  isActive,
  onStopSharing,
}: LiveIndicatorProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-strawberry/30">
        {/* Pulsing red dot */}
        <div className="relative">
          <div className="w-3 h-3 bg-strawberry rounded-full animate-live-pulse" />
          <div className="absolute inset-0 w-3 h-3 bg-strawberry rounded-full animate-ping opacity-75" />
        </div>

        <span className="text-sm font-semibold text-strawberry tracking-wider">
          LIVE — Camera Sharing Active
        </span>

        <button
          onClick={onStopSharing}
          className="ml-2 px-3 py-1 bg-strawberry/10 hover:bg-strawberry/20 text-strawberry text-xs font-medium rounded-full transition-colors border border-strawberry/30"
        >
          Stop Sharing
        </button>
      </div>
    </motion.div>
  );
}
