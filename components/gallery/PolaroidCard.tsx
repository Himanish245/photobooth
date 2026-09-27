'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryPhoto } from '@/config/gallery-photos';

interface PolaroidCardProps {
  photo: GalleryPhoto;
  onClick: () => void;
}

export default function PolaroidCard({ photo, onClick }: PolaroidCardProps) {
  return (
    <motion.div
      className="polaroid cursor-pointer"
      style={{ rotate: photo.rotation }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05,
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] w-full bg-cream-dark mb-4 overflow-hidden rounded-sm">
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center text-center space-y-2">
        <p className="text-handwritten text-2xl text-deep-rose">
          {photo.caption}
        </p>
        <span className="text-xs font-sans text-soft-brown/70 tracking-widest uppercase">
          {photo.date}
        </span>
      </div>
    </motion.div>
  );
}
