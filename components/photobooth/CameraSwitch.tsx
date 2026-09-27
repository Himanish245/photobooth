'use client';

import React from 'react';
import { RefreshCcw } from 'lucide-react';

interface CameraSwitchProps {
  onSwitch: () => void;
  hasMultipleCameras: boolean;
}

export default function CameraSwitch({ onSwitch, hasMultipleCameras }: CameraSwitchProps) {
  if (!hasMultipleCameras) return null;

  return (
    <button
      onClick={onSwitch}
      className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 transition-colors shadow-sm text-deep-rose group"
      aria-label="Switch camera"
    >
      <RefreshCcw className="w-5 h-5 group-active:rotate-180 transition-transform duration-300" />
    </button>
  );
}
