'use client';
import { motion } from 'framer-motion';
import { PatisserieItem } from '@/config/patisserie-items';

interface PatisserieCardProps {
  item: PatisserieItem;
  index: number;
}

export default function PatisserieCard({ item, index }: PatisserieCardProps) {
  return (
    <motion.div
      className="glass-card relative overflow-hidden group flex flex-col items-center text-center p-6 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
    >
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: item.color }}
      />
      
      <div className="text-5xl md:text-6xl mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300 animate-float-slow">
        {item.emoji}
      </div>
      
      <h3 className="heading-serif text-2xl text-deep-rose mb-1 relative z-10">
        {item.name}
      </h3>
      
      <p className="text-handwritten text-xl text-rose mb-4 relative z-10">
        {item.subtitle}
      </p>
      
      <p className="font-sans text-sm text-soft-brown/80 relative z-10 mt-auto">
        {item.description}
      </p>
    </motion.div>
  );
}
