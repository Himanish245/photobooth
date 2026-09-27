'use client';

import React from 'react';

const OVERLAYS = [
  { id: 'strawberries', icon: '🍓', label: 'Strawberries' },
  { id: 'lilies', icon: '🌸', label: 'Lily Petals' },
  { id: 'bows', icon: '🎀', label: 'Bows' },
  { id: 'lace', icon: '✿', label: 'Lace' },
  { id: 'pearls', icon: '○', label: 'Pearls' },
  { id: 'sparkles', icon: '✨', label: 'Sparkles' },
];

interface OverlaySelectorProps {
  selectedOverlays: string[];
  onToggleOverlay: (id: string) => void;
}

export default function OverlaySelector({ selectedOverlays, onToggleOverlay }: OverlaySelectorProps) {
  return (
    <div className="w-full py-2">
      <h3 className="font-handwritten text-2xl text-deep-rose mb-3 px-2">Add Magic</h3>
      <div className="flex flex-wrap gap-2 px-2">
        {OVERLAYS.map((overlay) => {
          const isSelected = selectedOverlays.includes(overlay.id);
          return (
            <button
              key={overlay.id}
              onClick={() => onToggleOverlay(overlay.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all ${
                isSelected
                  ? 'bg-rose border-rose text-cream shadow-md scale-105'
                  : 'bg-cream border-blush text-soft-brown hover:border-rose/50 hover:bg-blush/20'
              }`}
            >
              <span className="text-base">{overlay.icon}</span>
              <span className="font-medium">{overlay.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
