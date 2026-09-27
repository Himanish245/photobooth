'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/music.mp3" 
        loop 
        preload="none"
      />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <div className="glass-card rounded-full p-2 pr-5 flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-md border border-white/60">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blush to-rose flex items-center justify-center text-white shadow-inner relative overflow-hidden"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-full border-4 border-zinc-900"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-4 h-4 rounded-full bg-rose border-2 border-white shadow-inner" />
                  <div className="absolute inset-1 rounded-full border border-zinc-700/50" />
                  <div className="absolute inset-2 rounded-full border border-zinc-700/50" />
                  <div className="absolute inset-3 rounded-full border border-zinc-700/50" />
                </motion.div>
                
                <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-sm">
                    {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <path d="M5 3L19 12L5 21V3Z" />
                    </svg>
                    )}
                </div>
              </button>
              
              <div className="flex flex-col">
                <span className="text-xs font-sans font-medium text-soft-brown uppercase tracking-wider">
                  {isPlaying ? 'Now Playing' : 'Play Music'}
                </span>
                <span className="text-sm text-handwritten text-deep-rose truncate max-w-[120px]">
                  La Vie En Rose
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
