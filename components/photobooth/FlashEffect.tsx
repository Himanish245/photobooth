'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashEffectProps {
  isActive: boolean;
}

export default function FlashEffect({ isActive }: FlashEffectProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white z-40 pointer-events-none rounded-xl"
        />
      )}
    </AnimatePresence>
  );
}
