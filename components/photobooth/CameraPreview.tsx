'use client';

import React, { useEffect } from 'react';
import { getFrameCSS, FrameName } from '@/lib/frames';
import { getCSSFilter, FilterName } from '@/lib/filters';
import { Loader2, Camera, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  permission: 'prompt' | 'granted' | 'denied' | null;
  isLoading: boolean;
  error: string | null;
  frame: FrameName;
  filter: FilterName;
}

export default function CameraPreview({
  videoRef,
  stream,
  permission,
  isLoading,
  error,
  frame,
  filter,
}: CameraPreviewProps) {
  const frameCSS = getFrameCSS(frame);
  const filterCSS = getCSSFilter(filter);

  useEffect(() => {
    if (videoRef.current && stream) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => {
          // Ignore AbortError as it's common in React Strict Mode double-renders
          if (e.name !== 'AbortError') console.error(e);
        });
      }
    }
  }, [stream, videoRef]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto overflow-hidden rounded-xl bg-soft-brown/10 flex items-center justify-center shadow-md">
      <div className="absolute inset-0 z-10 pointer-events-none" style={frameCSS} />
      
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/80 z-20">
          <Loader2 className="w-8 h-8 animate-spin text-rose mb-2" />
          <p className="font-serif text-deep-rose">Warming up the camera...</p>
        </div>
      )}

      {error || permission === 'denied' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream z-20 p-6 text-center">
          <AlertCircle className="w-10 h-10 text-strawberry mb-4" />
          <p className="font-serif text-deep-rose mb-2 text-xl">Oops! We couldn't access your camera.</p>
          <p className="text-sm text-soft-brown mb-6 max-w-sm">{error || 'Please allow camera permissions in your browser.'}</p>
          <label className="btn-secondary cursor-pointer flex items-center gap-2 bg-white px-4 py-2 border border-blush rounded-full shadow-sm hover:bg-blush/30 transition-colors">
            <ImageIcon className="w-4 h-4 text-rose" />
            <span className="text-sm font-medium text-soft-brown">Upload a Photo Instead</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>
      ) : permission === 'prompt' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream z-20 p-6 text-center">
          <Camera className="w-12 h-12 text-rose mb-4 animate-pulse" />
          <p className="font-serif text-deep-rose text-lg">Allow camera access to begin</p>
        </div>
      ) : null}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ filter: filterCSS, transform: 'scaleX(-1)' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
