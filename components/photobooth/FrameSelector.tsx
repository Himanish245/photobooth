'use client';

import React from 'react';
import { FRAMES, FrameName, getFrameCSS } from '@/lib/frames';

interface FrameSelectorProps {
  selectedFrame: FrameName;
  onSelectFrame: (frame: FrameName) => void;
}

export default function FrameSelector({ selectedFrame, onSelectFrame }: FrameSelectorProps) {
  return (
    <div className="w-full py-2">
      <h3 className="font-handwritten text-2xl text-deep-rose mb-3 px-2">Choose a Frame</h3>
      <div className="flex overflow-x-auto gap-4 px-2 pb-4 snap-x hide-scrollbar">
        {FRAMES.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id as FrameName)}
            className={`flex flex-col items-center gap-2 snap-center shrink-0 transition-all ${
              selectedFrame === frame.id ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            <div
              className={`w-16 h-20 shadow-sm border-[3px] bg-white ${
                selectedFrame === frame.id ? 'border-rose ring-4 ring-rose/20' : 'border-transparent'
              }`}
              style={{ ...getFrameCSS(frame.id as FrameName) }}
            />
            <span className={`text-xs font-medium ${selectedFrame === frame.id ? 'text-rose font-semibold' : 'text-soft-brown'}`}>
              {frame.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
