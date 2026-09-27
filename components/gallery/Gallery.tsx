'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PolaroidCard from './PolaroidCard';
import Lightbox from './Lightbox';
import { galleryPhotos } from '@/config/gallery-photos';

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
  };
  
  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <section id="gallery" className="section-padding bg-ivory relative overflow-hidden">
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none w-24 h-24 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-rose">
          <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z" strokeWidth="2" strokeDasharray="5,5"/>
          <path d="M50 20 C35 20 20 35 20 50 C20 65 35 80 50 80 C65 80 80 65 80 50 C80 35 65 20 50 20 Z" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none w-24 h-24 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-rose">
          <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z" strokeWidth="2" strokeDasharray="5,5"/>
          <path d="M50 20 C35 20 20 35 20 50 C20 65 35 80 50 80 C65 80 80 65 80 50 C80 35 65 20 50 20 Z" strokeWidth="1"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            className="heading-serif text-deep-rose mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Little Moments
          </motion.h2>
          <motion.p 
            className="text-handwritten text-4xl text-rose"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            snapshots of us
          </motion.p>
          <motion.div 
            className="divider-ornate mx-auto mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {galleryPhotos.map((photo, index) => (
            <div key={photo.id} className={index % 2 === 0 ? "mt-0 md:mt-12" : "mt-0 md:-mt-4"}>
                <PolaroidCard
                photo={photo}
                onClick={() => openLightbox(index)}
                />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        photos={galleryPhotos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />
    </section>
  );
}
