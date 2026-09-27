import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Photobooth from '@/components/photobooth/Photobooth';

export const metadata = {
  title: 'Our Little Photobooth',
  description: 'A luxury romantic photobooth experience',
};

export default function PhotoboothPage() {
  return (
    <main className="min-h-screen bg-ivory selection:bg-rose/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blush/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-petal/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center relative">
          <Link 
            href="/"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-soft-brown hover:text-rose transition-colors flex items-center gap-2 group hidden md:flex"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium font-sans">Home</span>
          </Link>
          
          <h1 className="font-serif text-4xl sm:text-5xl text-deep-rose text-center w-full tracking-tight drop-shadow-sm">
            Our Little Photobooth
          </h1>
        </header>

        <Photobooth />
      </div>
    </main>
  );
}
