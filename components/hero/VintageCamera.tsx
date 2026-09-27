"use client";

import { motion } from "framer-motion";

export function VintageCamera() {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        {/* Camera Body Base */}
        <rect x="20" y="50" width="160" height="110" rx="20" fill="#F4C2C2" stroke="#D4A574" strokeWidth="4" />
        <rect x="24" y="54" width="152" height="102" rx="16" fill="#F8D7DA" />
        
        {/* Leather/Texture detailing */}
        <rect x="20" y="90" width="160" height="50" fill="#E8A0BF" opacity="0.3" />
        
        {/* Top elements */}
        <path d="M40 50 L50 30 h 30 l 10 20 Z" fill="#D4A574" />
        <circle cx="55" cy="40" r="6" fill="#FFFFF0" />
        <rect x="130" y="40" width="20" height="10" rx="2" fill="#D4A574" />
        <rect x="135" y="35" width="10" height="5" rx="1" fill="#8B3A5C" />
        
        {/* Main Lens Base */}
        <circle cx="100" cy="105" r="45" fill="#D4A574" stroke="#8B3A5C" strokeWidth="2" />
        <circle cx="100" cy="105" r="38" fill="#6B4C3B" />
        <circle cx="100" cy="105" r="30" fill="#2c1e16" />
        
        {/* Lens Glare */}
        <path d="M 80 85 A 25 25 0 0 1 110 80" stroke="#FFFFF0" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <circle cx="115" cy="115" r="4" fill="#FFFFF0" opacity="0.8" />
        
        {/* Flash/Viewfinder */}
        <rect x="140" y="65" width="25" height="15" rx="4" fill="#FFFFF0" stroke="#D4A574" strokeWidth="2" />
        <circle cx="152.5" cy="72.5" r="4" fill="#8B3A5C" />
        
        {/* Decorative Engravings */}
        <path d="M 30 65 Q 40 55 50 65" stroke="#D4A574" strokeWidth="1.5" fill="none" />
        <path d="M 30 145 Q 40 155 50 145" stroke="#D4A574" strokeWidth="1.5" fill="none" />
        <path d="M 150 145 Q 160 155 170 145" stroke="#D4A574" strokeWidth="1.5" fill="none" />
        
        {/* Ribbon attached to camera */}
        <path d="M 20 80 Q 0 100 10 130 Q 20 160 0 180" stroke="#F4C2C2" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M 180 80 Q 200 100 190 130 Q 180 160 200 180" stroke="#F4C2C2" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
      </svg>
    </motion.div>
  );
}
