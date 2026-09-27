'use client';
import { motion } from 'framer-motion';
import { loveLetter } from '@/config/love-letter';

export default function LoveLetter() {
  return (
    <section id="love-letter" className="section-padding bg-blush relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto paper-card p-8 md:p-14 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 flex justify-center text-rose/80">
            <svg viewBox="0 0 100 40" fill="currentColor">
              <path d="M10,20 C10,10 30,10 50,20 C70,30 90,30 90,20 C90,10 70,10 50,20 C30,30 10,30 10,20 Z" />
              <path d="M40,20 L30,40 L45,35 L50,40 L55,35 L70,40 L60,20 Z" />
            </svg>
          </div>

          <div className="text-center mb-10 mt-4">
            <h2 className="heading-serif text-deep-rose mb-2">
              {loveLetter.title}
            </h2>
            <div className="divider-ornate mx-auto" />
          </div>

          <div className="space-y-6 text-soft-brown text-[1.1rem] leading-[1.8]">
            <p className="text-handwritten text-3xl text-deep-rose mb-6">
              {loveLetter.greeting}
            </p>
            
            {loveLetter.paragraphs.map((paragraph, index) => (
              <motion.p 
                key={index} 
                className="font-sans font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="mt-12 flex flex-col items-end text-right">
              <p className="text-handwritten text-2xl text-rose mb-1">
                {loveLetter.closing}
              </p>
              <p className="text-handwritten text-4xl text-deep-rose">
                {loveLetter.signature}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
