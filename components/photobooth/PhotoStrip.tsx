'use client';

import React, { useEffect, useState } from 'react';
import { composeStrip } from '@/lib/strip-composer';
import type { FilterName } from '@/lib/filters';
import type { FrameName } from '@/lib/frames';
import PhotoPreview from './PhotoPreview';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoStripProps {
  photos: string[];
  targetCount: 3 | 4;
  filter: FilterName;
  frame: FrameName;
  onComplete: () => void;
  onRetakeAll: () => void;
}

export default function PhotoStrip({
  photos,
  targetCount,
  filter,
  frame,
  onComplete,
  onRetakeAll,
}: PhotoStripProps) {
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (photos.length === targetCount && !stripUrl && !isComposing) {
      setIsComposing(true);
      const generateStrip = async () => {
        try {
          const stripPhotos = photos.map(p => ({ dataUrl: p, filter, frame }));
          const result = await composeStrip({ photos: stripPhotos, caption: 'Our Little Photobooth', date: new Date().toLocaleDateString() });
          setStripUrl(result);
        } catch (error) {
          console.error("Failed to compose strip:", error);
        } finally {
          setIsComposing(false);
          onComplete();
        }
      };
      generateStrip();
    }
  }, [photos, targetCount, filter, frame, stripUrl, isComposing, onComplete]);

  if (stripUrl) {
    return <PhotoPreview dataUrl={stripUrl} onRetake={onRetakeAll} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blush min-h-[300px] w-full max-w-md"
    >
      <div className="flex gap-3 mb-8">
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-14 h-20 rounded border-2 ${
              i < photos.length ? 'border-rose bg-petal/20' : 'border-dashed border-soft-brown/30 bg-cream/50'
            } flex items-center justify-center overflow-hidden transition-all duration-300`}
          >
            {i < photos.length ? (
              <img src={photos[i]} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif text-soft-brown/40">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
      
      {isComposing ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-rose" />
          <p className="font-handwritten text-2xl text-deep-rose">Creating your strip...</p>
        </div>
      ) : (
        <p className="font-handwritten text-3xl text-deep-rose animate-pulse">
          Photo {photos.length} of {targetCount}
        </p>
      )}
    </motion.div>
  );
}
