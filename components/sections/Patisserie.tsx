'use client';
import { motion } from 'framer-motion';
import PatisserieCard from './PatisserieCard';
import { patisserieItems } from '@/config/patisserie-items';

export default function Patisserie() {
  return (
    <section id="patisserie" className="section-padding bg-gradient-to-b from-blush to-ivory relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-8 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgNDBjMTEuMDQ2IDAgMjAtOC45NTQgMjAtMjBTMzEuMDQ2IDAgMjAgMCAwIDguOTU0IDAgMjBzOC45NTQgMjAgMjAgMjB6bTAgLTJjLTkuOTQxIDAtMTgtOC4wNTktMTgtMThTMTAuMDU5IDIgMjAgMnMxOCA4LjA1OSAxOCAxOC04LjA1OSAxOC0xOCAxOHoiIGZpbGw9IiNFOEEwQkYiIGZpbGwtb3BhY2l0eT0iMC41IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] bg-repeat-x bg-[length:40px_40px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            className="heading-serif text-deep-rose mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            La Patisserie
          </motion.h2>
          <motion.p 
            className="text-handwritten text-4xl text-rose"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            sweet little indulgences
          </motion.p>
          <motion.div 
            className="divider-ornate mx-auto mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {patisserieItems.map((item, index) => (
            <PatisserieCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
