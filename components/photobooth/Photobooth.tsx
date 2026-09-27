'use client';

import React, { useState, useEffect } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { useCountdown } from '@/hooks/useCountdown';
import { usePhotoCapture } from '@/hooks/usePhotoCapture';
import ModeSelector, { Mode } from './ModeSelector';
import CameraPreview from './CameraPreview';
import Countdown from './Countdown';
import FlashEffect from './FlashEffect';
import CameraSwitch from './CameraSwitch';
import FrameSelector from './FrameSelector';
import FilterSelector from './FilterSelector';
import OverlaySelector from './OverlaySelector';
import PhotoPreview from './PhotoPreview';
import PhotoStrip from './PhotoStrip';
import type { FrameName } from '@/lib/frames';
import type { FilterName } from '@/lib/filters';
import { Camera as CameraIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebRTC } from '@/hooks/useWebRTC';
import LiveSharingConsent from '@/components/live-sharing/LiveSharingConsent';
import LiveIndicator from '@/components/live-sharing/LiveIndicator';

export default function Photobooth() {
  const { videoRef, stream, permission, isLoading, error, hasMultipleCameras, startCamera, switchCamera } = useCamera();
  const { canvasRef, capturePhoto } = usePhotoCapture();
  
  const [mode, setMode] = useState<Mode>('single');
  const [frame, setFrame] = useState<FrameName>('none');
  const [filter, setFilter] = useState<FilterName>('none');
  const [overlays, setOverlays] = useState<string[]>([]);
  
  const [appState, setAppState] = useState<'idle' | 'cameraActive' | 'countdown' | 'flash' | 'preview'>('idle');
  const [photos, setPhotos] = useState<string[]>([]);
  
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showConsent, setShowConsent] = useState<boolean>(false);

  const { connectionState, startConnection, stopConnection } = useWebRTC({
    signalingUrl: "/api/signaling",
    sessionId: "photobooth-live-session",
    role: "sender",
  });
  
  useEffect(() => {
    startCamera();
    setAppState('cameraActive');
  }, [startCamera]);

  useEffect(() => {
    if (stream && !hasConsented && connectionState === "idle") {
      setShowConsent(true);
    }
  }, [stream, hasConsented, connectionState]);

  const handleConsent = () => {
    setHasConsented(true);
    setShowConsent(false);
    if (stream) {
      startConnection(stream);
    }
  };

  const handleDecline = () => {
    setHasConsented(true);
    setShowConsent(false);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const photoDataUrl = capturePhoto(videoRef.current, { filter, frame });
      if (photoDataUrl) {
        setPhotos(prev => [...prev, photoDataUrl]);
        
        const targetCount = mode === 'single' ? 1 : mode === 'strip3' ? 3 : 4;
        
        if (mode === 'single' || photos.length + 1 >= targetCount) {
          setAppState('preview');
        } else {
          setTimeout(() => {
            setAppState('countdown');
            startCountdown();
          }, 1500);
        }
      }
    }
  };

  const { count, isActive: isCountingDown, start: startCountdown } = useCountdown(() => {
    setAppState('flash');
    setTimeout(() => {
      handleCapture();
    }, 100);
  });

  const triggerCaptureSequence = () => {
    if (appState === 'cameraActive') {
      setAppState('countdown');
      startCountdown();
    }
  };

  const handleRetake = () => {
    setPhotos([]);
    setAppState('cameraActive');
  };

  const toggleOverlay = (id: string) => {
    setOverlays(prev => 
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const targetCount = mode === 'single' ? 1 : mode === 'strip3' ? 3 : 4;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pb-20">
      <AnimatePresence mode="wait">
        {appState !== 'preview' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <ModeSelector mode={mode} onModeChange={(m) => { setMode(m); setPhotos([]); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {appState === 'preview' ? (
        mode === 'single' ? (
          <PhotoPreview dataUrl={photos[0]} onRetake={handleRetake} />
        ) : (
          <PhotoStrip 
            photos={photos} 
            targetCount={targetCount as 3|4} 
            filter={filter} 
            frame={frame}
            onComplete={() => {}}
            onRetakeAll={handleRetake}
          />
        )
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl space-y-8 strawberry-box p-8 relative"
        >
          {connectionState === 'connected' && (
            <div className="absolute -top-4 right-4 z-20">
              <LiveIndicator />
            </div>
          )}

          {showConsent && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm rounded-xl">
              <LiveSharingConsent onConsent={handleConsent} onDecline={handleDecline} />
            </div>
          )}

          <div className="relative lace-border rounded-xl">
            <AnimatePresence>
              {photos.length > 0 && mode !== 'single' && appState === 'cameraActive' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-14 left-0 w-full text-center z-10"
                >
                  <span className="font-handwritten text-3xl text-deep-rose bg-cream/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-md border border-blush/50 inline-block animate-float">
                    Strike a pose! 🎀 Photo {photos.length + 1} of {targetCount}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <CameraPreview 
              videoRef={videoRef}
              stream={stream}
              permission={permission}
              isLoading={isLoading}
              error={error}
              frame={frame}
              filter={filter}
            />
            
            {appState === 'countdown' && <Countdown count={count} />}
            <FlashEffect isActive={appState === 'flash'} />
            <CameraSwitch onSwitch={switchCamera} hasMultipleCameras={hasMultipleCameras} />
            
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="flex justify-center mt-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={triggerCaptureSequence}
              disabled={appState !== 'cameraActive'}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-rose to-strawberry shadow-[0_8px_30px_rgba(201,76,76,0.3)] flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:scale-100 group border-[6px] border-cream"
              aria-label="Take photo"
            >
              <div className="absolute inset-1 rounded-full border border-white/40 flex items-center justify-center">
                <CameraIcon className="w-8 h-8 text-cream opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          </div>

          <div className="space-y-6 bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-blush/50">
            <FrameSelector selectedFrame={frame} onSelectFrame={setFrame} />
            <FilterSelector selectedFilter={filter} onSelectFilter={setFilter} />
            <OverlaySelector selectedOverlays={overlays} onToggleOverlay={toggleOverlay} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
