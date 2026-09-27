'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DECOR_ITEMS = ['🍓', '✨', '🎀', '🌸', '✨'];

interface DecorElement {
  id: number;
  icon: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingDecor() {
  const [elements, setElements] = useState<DecorElement[]>([]);

  useEffect(() => {
    // Generate random decor elements only on the client to avoid hydration mismatch
    const count = 15;
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      icon: DECOR_ITEMS[Math.floor(Math.random() * DECOR_ITEMS.length)],
      x: Math.random() * 100, // percentage vw
      y: Math.random() * 100, // percentage vh
      size: Math.random() * 1.5 + 0.8, // rem
      duration: Math.random() * 10 + 15, // seconds (very slow float)
      delay: Math.random() * 5, // stagger start
    }));
    setElements(newElements);
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}vw`,
            top: `${el.y}vh`,
            fontSize: `${el.size}rem`,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
}
