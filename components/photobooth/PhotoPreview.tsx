'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';

interface PhotoPreviewProps {
  dataUrl: string;
  onRetake: () => void;
}

export default function PhotoPreview({ dataUrl, onRetake }: PhotoPreviewProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `photobooth-${new Date().getTime()}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="p-6 bg-white shadow-xl rounded-sm border border-blush/50 relative paper-card max-w-full"
      >
        <img src={dataUrl} alt="Captured moment" className="max-w-full max-h-[60vh] object-contain rounded-sm" />
      </motion.div>

      <div className="flex gap-4">
        <button onClick={onRetake} className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-full text-soft-brown bg-white border border-blush shadow-sm hover:bg-blush/30 transition-colors font-medium">
          <RotateCcw className="w-4 h-4" />
          Retake
        </button>
        <button onClick={handleDownload} className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full text-cream bg-gradient-to-r from-rose to-strawberry shadow-md hover:shadow-lg hover:scale-105 transition-all font-medium">
          <Download className="w-4 h-4" />
          Save Photo ♡
        </button>
      </div>
    </div>
  );
}
