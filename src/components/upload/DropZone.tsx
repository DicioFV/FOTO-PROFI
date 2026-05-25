// src/components/upload/DropZone.tsx
// CINEVISION AI — ADVANCED DROPZONE COMPONENT

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Camera } from 'lucide-react';
import { Button, Alert } from '../ui';
import { cn } from '../../lib/utils';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface DropZoneProps {
  onFileAccepted: (file: File, preview: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export function DropZone({ onFileAccepted, onError, disabled = false, className }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCountRef = useRef(0);

  const showError = useCallback((msg: string) => {
    setError(msg);
    onError?.(msg);
    setTimeout(() => setError(null), 5000);
  }, [onError]);

  const validateAndProcessFile = useCallback(async (file: File) => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      showError('Formato não suportado. Use JPG, PNG ou WebP.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showError(`Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo: 10MB.`);
      return;
    }

    setIsProcessing(true);

    try {
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
        reader.readAsDataURL(file);
      });

      // Validate dimensions
      await new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          if (img.width < 200 || img.height < 200) {
            reject(new Error(`Imagem muito pequena (${img.width}×${img.height}). Mínimo: 200×200.`));
          } else {
            resolve();
          }
        };
        img.onerror = () => reject(new Error('Imagem corrompida ou inválida.'));
        img.src = preview;
      });

      onFileAccepted(file, preview);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Erro ao processar imagem.');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileAccepted, showError]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current += 1;
    if (dragCountRef.current === 1) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current -= 1;
    if (dragCountRef.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCountRef.current = 0;
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) validateAndProcessFile(file);
  }, [disabled, validateAndProcessFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcessFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [validateAndProcessFile]);

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden',
          isDragging
            ? 'border-amber-500 bg-amber-500/10 scale-[1.01]'
            : 'border-white/20 hover:border-white/40 hover:bg-white/[0.02]',
          disabled && 'opacity-50 pointer-events-none',
        )}
      >
        {/* Processing overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
                <p className="text-white font-medium">Processando imagem...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-amber-500/10 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <Upload className="w-16 h-16 text-amber-400 mx-auto mb-3" />
                <p className="text-xl font-bold text-white">Solte a imagem aqui</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-0 p-8 sm:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center mb-6"
            >
              <Image className="w-12 h-12 text-amber-400" />
            </motion.div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-white mb-2">
              Arraste sua foto aqui
            </h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Ou clique para selecionar um arquivo do seu dispositivo
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileInput}
                className="hidden"
                disabled={disabled}
              />
              <Button
                variant="primary"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload className="w-5 h-5" />}
                disabled={disabled}
              >
                Escolher Arquivo
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Camera className="w-5 h-5" />}
                disabled={disabled}
                onClick={() => {
                  // Camera capture handled by CameraCapture component
                  const event = new CustomEvent('cinevision:open-camera');
                  window.dispatchEvent(event);
                }}
              >
                Usar Câmera
              </Button>
            </div>

            {/* Specs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>JPG, PNG, WebP</span>
              <span className="hidden sm:inline">•</span>
              <span>Máximo 10MB</span>
              <span className="hidden sm:inline">•</span>
              <span>Mínimo 200×200px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4"
          >
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropZone;
