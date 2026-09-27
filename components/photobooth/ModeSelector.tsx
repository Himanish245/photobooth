'use client';

import React from 'react';
import { Camera, Film } from 'lucide-react';

export type Mode = 'single' | 'strip3' | 'strip4';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-1 p-1 bg-cream rounded-full shadow-sm border border-blush mx-auto w-fit mb-6">
      <button
        onClick={() => onModeChange('single')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          mode === 'single' ? 'bg-gradient-to-r from-rose to-petal text-cream shadow-md' : 'text-soft-brown hover:bg-blush/50'
        }`}
      >
        <Camera className="w-4 h-4" />
        Single
      </button>
      <button
        onClick={() => onModeChange('strip3')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          mode === 'strip3' ? 'bg-gradient-to-r from-rose to-petal text-cream shadow-md' : 'text-soft-brown hover:bg-blush/50'
        }`}
      >
        <Film className="w-4 h-4" />
        3 Strip
      </button>
      <button
        onClick={() => onModeChange('strip4')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          mode === 'strip4' ? 'bg-gradient-to-r from-rose to-petal text-cream shadow-md' : 'text-soft-brown hover:bg-blush/50'
        }`}
      >
        <Film className="w-4 h-4" />
        4 Strip
      </button>
    </div>
  );
}
