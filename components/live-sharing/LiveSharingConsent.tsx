"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveSharingConsentProps {
  onConsent: () => void;
  onDecline: () => void;
  partnerName?: string;
}

export default function LiveSharingConsent({
  onConsent,
  onDecline,
  partnerName = "your partner",
}: LiveSharingConsentProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="glass-card p-6 max-w-md mx-auto"
      >
        <div className="text-center mb-4">
          <span className="text-2xl mb-2 block">📹</span>
          <h3 className="heading-serif text-lg mb-2">Share Camera?</h3>
          <p className="text-handwritten text-lg text-rose">
            Let {partnerName} see you live ♡
          </p>
        </div>

        <div className="bg-blush-light rounded-xl p-4 mb-4 text-sm text-soft-brown">
          <p className="font-medium text-deep-rose mb-2">
            What this means:
          </p>
          <p>
            Your live camera preview will be visible to {partnerName} in
            real-time while you use the photobooth.
          </p>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-rose underline mb-4 block mx-auto"
        >
          {showDetails ? "Hide details" : "Show privacy details"}
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <ul className="text-xs text-soft-brown space-y-1 bg-cream rounded-lg p-3">
                <li>• Uses standard browser camera permissions</li>
                <li>• No video is recorded or stored</li>
                <li>• You can stop sharing at any time</li>
                <li>• Sharing stops when you leave the photobooth</li>
                <li>• Direct peer-to-peer connection (WebRTC)</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="btn-secondary flex-1 text-sm"
          >
            No thanks
          </button>
          <button
            onClick={onConsent}
            className="btn-primary flex-1 text-sm"
          >
            Share camera ♡
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
