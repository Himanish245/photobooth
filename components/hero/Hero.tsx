"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { VintageCamera } from "./VintageCamera";
import { PetalAnimation } from "./PetalAnimation";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-blush px-4 py-20">
      <PetalAnimation />

      {/* Decorative Corner Elements */}
      <div className="absolute top-8 left-8 hidden sm:block opacity-70">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 C 20 50, 50 20, 90 10" stroke="#E8A0BF" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="#D4A574" />
          <circle cx="10" cy="90" r="4" fill="#D4A574" />
          <path d="M80 20 C 85 20, 90 25, 90 30" stroke="#8B3A5C" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 hidden sm:block opacity-70 rotate-180">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 C 20 50, 50 20, 90 10" stroke="#E8A0BF" strokeWidth="2" fill="none" />
          <circle cx="90" cy="10" r="4" fill="#D4A574" />
          <circle cx="10" cy="90" r="4" fill="#D4A574" />
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2 text-rose">
            <path d="M12 21C12 21 4 14 4 8.5C4 5.5 6.5 3 9.5 3C11.5 3 12 4.5 12 4.5C12 4.5 12.5 3 14.5 3C17.5 3 20 5.5 20 8.5C20 14 12 21 12 21Z" fill="currentColor" opacity="0.8" />
          </svg>
          <span className="font-sans text-xs tracking-[0.2em] text-deep-rose uppercase">Welcome To</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-deep-rose mb-4 drop-shadow-sm"
        >
          Our Little Photobooth
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="font-handwritten text-3xl md:text-5xl text-soft-brown mb-12 transform -rotate-2"
        >
          a dreamy corner just for us
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <VintageCamera />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/photobooth" className="group relative inline-flex items-center justify-center px-8 py-4 bg-deep-rose text-ivory font-serif text-lg md:text-xl rounded-full overflow-hidden transition-all hover:bg-strawberry hover:shadow-[0_0_20px_rgba(201,76,76,0.3)] hover:-translate-y-1">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
            <span className="relative flex items-center gap-2">
              Enter the Photobooth <span>♡</span>
            </span>
          </Link>
        </motion.div>

        {/* Scattered Strawberries & Ribbons */}
        <motion.div variants={itemVariants} className="absolute left-[10%] top-[30%] opacity-80 hidden md:block animate-[bounce_6s_infinite]">
          <span className="text-3xl">🍓</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="absolute right-[15%] top-[25%] opacity-80 hidden md:block animate-[bounce_5s_infinite_0.5s]">
           <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
             <path d="M50 50 Q30 20 10 40 Q30 60 50 50 Q70 20 90 40 Q70 60 50 50" fill="#E8A0BF" />
             <path d="M50 50 L30 90 L40 90 L50 60 L60 90 L70 90 Z" fill="#E8A0BF" />
           </svg>
        </motion.div>

        <motion.div variants={itemVariants} className="absolute left-[20%] bottom-[20%] opacity-80 hidden md:block animate-[bounce_7s_infinite_1s]">
          <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="10" fill="#FFFFF0" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            <circle cx="20" cy="40" r="8" fill="#FFFFF0" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            <circle cx="80" cy="60" r="8" fill="#FFFFF0" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            <path d="M20 40 Q50 30 50 50 Q50 70 80 60" stroke="#F8D7DA" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
