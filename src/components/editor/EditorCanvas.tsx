// src/components/editor/EditorCanvas.tsx
// CINEVISION AI — EDITOR CANVAS - IMAGE DISPLAY AREA

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, Eye, Columns2 } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { cn } from '../../lib/utils';

export type ViewMode = 'original' | 'result' | 'compare' | 'sideBySide';

interface EditorCanvasProps {
  originalImage: string;
  resultImage?: string | null;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function EditorCanvas({
  originalImage,
  resultImage,
  viewMode,
  onViewModeChange,
  className,
}: EditorCanvasProps) {
  const [zoom, setZoom] = useState(1);

  const viewModes: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
    { value: 'original', label: 'Original', icon: <Eye className="w-4 h-4" /> },
    { value: 'result', label: 'Resultado', icon: <Eye className="w-4 h-4" /> },
    { value: 'compare', label: 'Comparar', icon: <Columns2 className="w-4 h-4" /> },
    { value: 'sideBySide', label: 'Lado a Lado', icon: <Columns2 className="w-4 h-4" /> },
  ];

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Canvas Area */}
      <div className="relative flex-1 bg-black/40 rounded-2xl border border-white/10 overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          {viewMode === 'compare' && resultImage ? (
            <motion.div
              key="compare"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <BeforeAfterSlider
                beforeImage={originalImage}
                afterImage={resultImage}
                beforeLabel="Original"
                afterLabel="Transformado"
                className="w-full h-full rounded-none"
              />
            </motion.div>
          ) : viewMode === 'sideBySide' && resultImage ? (
            <motion.div
              key="side"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 h-full gap-px bg-white/10"
            >
              <div className="relative bg-black/50 flex items-center justify-center overflow-hidden">
                <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" style={{ transform: `scale(${zoom})` }} />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 text-xs text-gray-300">Original</span>
              </div>
              <div className="relative bg-black/50 flex items-center justify-center overflow-hidden">
                <img src={resultImage} alt="Resultado" className="max-w-full max-h-full object-contain" style={{ transform: `scale(${zoom})` }} />
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-amber-500/80 text-xs text-black font-medium">Transformado</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full p-4"
            >
              <img
                src={viewMode === 'result' && resultImage ? resultImage : originalImage}
                alt={viewMode === 'result' ? 'Resultado' : 'Original'}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No result overlay */}
        {(viewMode === 'result' || viewMode === 'compare' || viewMode === 'sideBySide') && !resultImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <Eye className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">Gere uma transformação primeiro</p>
            </div>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-3">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          {viewModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onViewModeChange(mode.value)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                viewMode === mode.value
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {mode.icon}
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.25))} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom(1)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorCanvas;
