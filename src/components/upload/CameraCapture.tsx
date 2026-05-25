// src/components/upload/CameraCapture.tsx
// CINEVISION AI — CAMERA CAPTURE COMPONENT

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Check, SwitchCamera, FlipHorizontal } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '../../lib/utils';

export interface CameraCaptureProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File, preview: string) => void;
}

export function CameraCapture({ open, onClose, onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [mirrored, setMirrored] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  }, [facingMode, stream]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Handle open/close
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }
    return () => stopCamera();
  }, [open]);

  // Switch camera
  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  useEffect(() => {
    if (open && stream) {
      startCamera();
    }
  }, [facingMode]);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (mirrored && facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  }, [mirrored, facingMode]);

  // Capture with countdown
  const captureWithCountdown = useCallback(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setTimeout(capturePhoto, 100);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [capturePhoto]);

  // Accept captured image
  const acceptPhoto = useCallback(async () => {
    if (!capturedImage) return;

    const res = await fetch(capturedImage);
    const blob = await res.blob();
    const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: 'image/jpeg' });

    onCapture(file, capturedImage);
    onClose();
  }, [capturedImage, onCapture, onClose]);

  // Retake
  const retake = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  }, [stopCamera, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 relative z-10">
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-white font-medium">Câmera</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMirrored(!mirrored)}
                className={cn(
                  'p-2 rounded-xl transition-colors',
                  mirrored ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white'
                )}
              >
                <FlipHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={switchCamera}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Camera View */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            {error ? (
              <div className="text-center p-8">
                <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <Button variant="outline" onClick={startCamera}>
                  Tentar Novamente
                </Button>
              </div>
            ) : capturedImage ? (
              // Captured image preview
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={capturedImage}
                alt="Captured"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              // Live video
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    'max-w-full max-h-full object-contain',
                    mirrored && facingMode === 'user' && '-scale-x-100'
                  )}
                />
                {/* Face guide overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-80 border-2 border-white/30 rounded-[40%] opacity-50" />
                </div>
              </>
            )}

            {/* Countdown overlay */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <motion.span
                    key={countdown}
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="text-8xl font-bold text-white"
                  >
                    {countdown}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="p-6 pb-8">
            {capturedImage ? (
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={retake}
                  leftIcon={<RotateCcw className="w-5 h-5" />}
                >
                  Tirar Outra
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={acceptPhoto}
                  leftIcon={<Check className="w-5 h-5" />}
                >
                  Usar Esta Foto
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-6">
                {/* Timer button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={captureWithCountdown}
                  className="w-14 h-14 text-white"
                >
                  <span className="text-lg font-bold">3s</span>
                </Button>

                {/* Main capture button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl shadow-white/20"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-gray-800" />
                </motion.button>

                {/* Placeholder for balance */}
                <div className="w-14 h-14" />
              </div>
            )}
          </div>

          {/* Hidden canvas */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CameraCapture;
