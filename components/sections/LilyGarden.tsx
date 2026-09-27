'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function LilyGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles only on the client
    const generatedParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      isPetal: Math.random() > 0.5
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section 
      id="lily-garden" 
      ref={containerRef}
      className="min-h-[60vh] md:min-h-[80vh] relative overflow-hidden flex items-center justify-center py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#E6F0E6] via-cream to-blush" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-3xl bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full opacity-40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.isPetal ? '#F8D7DA' : '#FFF8F0',
              boxShadow: p.isPetal ? '0 0 10px rgba(248, 215, 218, 0.5)' : 'none',
              borderRadius: p.isPetal ? '100% 0 100% 0' : '50%'
            }}
            animate={{
              y: ['-10vh', '110vh'],
              x: ['-5vw', '5vw', '-5vw'],
              rotate: [0, 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      <motion.div style={{ y: y1 }} className="absolute bottom-10 left-10 opacity-30 w-48 h-48 md:w-64 md:h-64 pointer-events-none text-rose">
        <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 20 Q120 70 180 80 Q130 110 120 180 Q80 130 20 120 Q70 90 100 20 Z" />
        </svg>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute top-20 right-20 opacity-20 w-32 h-32 md:w-48 md:h-48 pointer-events-none text-white">
         <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 20 Q120 70 180 80 Q130 110 120 180 Q80 130 20 120 Q70 90 100 20 Z" />
        </svg>
      </motion.div>
      
      <motion.div style={{ y: y3 }} className="absolute bottom-32 right-1/4 opacity-10 w-24 h-24 pointer-events-none text-green-800">
         <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 40 100 50 100 50 C100 50 70 60 50 100 C30 60 0 50 0 50 C0 50 30 40 50 0 Z" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/50 bg-white/20 backdrop-blur-xl"
        >
          <motion.h2 
            className="heading-serif text-5xl md:text-7xl text-deep-rose mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Lily Garden
          </motion.h2>
          <motion.p 
            className="text-handwritten text-4xl md:text-6xl text-rose"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            where dreams bloom
          </motion.p>
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose to-blush flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(232,160,191,0.5)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="animate-sparkle">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
