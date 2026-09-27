'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  count: number;
}

export default function Countdown({ count }: CountdownProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-blush/30 pointer-events-none rounded-xl">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-[120px] text-cream drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] font-bold"
        >
          {count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
