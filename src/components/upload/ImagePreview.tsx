// src/components/upload/ImagePreview.tsx
// CINEVISION AI — IMAGE PREVIEW WITH ACTIONS

import { motion } from 'framer-motion';
import { X, ZoomIn, RotateCw, Crop, ArrowRight } from 'lucide-react';
import { Button, Badge } from '../ui';
import { cn } from '../../lib/utils';

interface ImagePreviewProps {
  imageUrl: string;
  fileName?: string;
  fileSize?: number;
  onRemove: () => void;
  onContinue: () => void;
  isReady?: boolean;
  className?: string;
}

export function ImagePreview({
  imageUrl,
  fileName,
  fileSize,
  onRemove,
  onContinue,
  isReady = true,
  className,
}: ImagePreviewProps) {
  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('relative', className)}
    >
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/10">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full max-h-[500px] object-contain"
        />

        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={onRemove}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-sm text-white hover:bg-red-500/80 transition-colors"
            title="Remover imagem"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {fileName && (
                <span className="text-sm text-gray-300 truncate max-w-[200px]">{fileName}</span>
              )}
              {fileSize && (
                <Badge variant="default" size="sm">{formatSize(fileSize)}</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors" title="Ampliar">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors" title="Rotacionar">
                <RotateCw className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors" title="Recortar">
                <Crop className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button variant="ghost" className="flex-1" onClick={onRemove}>
          Trocar Foto
        </Button>
        <Button
          variant="gold"
          size="lg"
          className="flex-[2]"
          onClick={onContinue}
          disabled={!isReady}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Escolher Estilo
        </Button>
      </div>
    </motion.div>
  );
}

export default ImagePreview;
