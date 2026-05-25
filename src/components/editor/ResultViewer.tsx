// src/components/editor/ResultViewer.tsx
// CINEVISION AI — RESULT VIEWER WITH EXPORT OPTIONS

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Share2, Copy, Heart, RefreshCw, 
  Maximize2, CheckCircle, Star
} from 'lucide-react';
import { Button, Badge, Card } from '../ui';
import { cn } from '../../lib/utils';

interface ResultViewerProps {
  imageUrl: string;
  originalUrl?: string;
  styleName: string;
  processingTime?: number;
  creditsUsed?: number;
  resolution?: string;
  onRegenerate?: () => void;
  onDownload?: (format: string) => void;
  onShare?: () => void;
  onFavorite?: () => void;
  className?: string;
}

export function ResultViewer({
  imageUrl,
  styleName,
  processingTime,
  creditsUsed = 1,
  resolution = '1024×1024',
  onRegenerate,
  onDownload,
  onShare,
  onFavorite,
  className,
}: ResultViewerProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const exportFormats = [
    { id: 'png', label: 'PNG', desc: 'Sem perda de qualidade', icon: '🖼️' },
    { id: 'jpg', label: 'JPG', desc: 'Menor tamanho', icon: '📷' },
    { id: 'webp', label: 'WebP', desc: 'Otimizado para web', icon: '🌐' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('space-y-4', className)}
    >
      {/* Success Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="flex items-center justify-center"
      >
        <Badge variant="success" className="px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          Transformação Concluída!
        </Badge>
      </motion.div>

      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <span className="text-gray-500">Estilo: <span className="text-white">{styleName}</span></span>
        {processingTime && <span className="text-gray-500">Tempo: <span className="text-amber-400">{(processingTime / 1000).toFixed(1)}s</span></span>}
        <span className="text-gray-500">Resolução: <span className="text-white">{resolution}</span></span>
        <span className="text-gray-500">Créditos: <span className="text-amber-400">{creditsUsed}</span></span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button
          variant="gold"
          onClick={() => setShowExport(true)}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download
        </Button>
        <Button
          variant="secondary"
          onClick={onShare}
          leftIcon={<Share2 className="w-4 h-4" />}
        >
          Compartilhar
        </Button>
        <Button
          variant="secondary"
          onClick={handleCopyLink}
          leftIcon={copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        >
          {copied ? 'Copiado!' : 'Copiar Link'}
        </Button>
        <Button
          variant={isFavorited ? 'primary' : 'ghost'}
          size="icon"
          onClick={handleFavorite}
        >
          <Heart className={cn('w-5 h-5', isFavorited && 'fill-current text-red-400')} />
        </Button>
        <Button
          variant="ghost"
          onClick={onRegenerate}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Regenerar
        </Button>
      </div>

      {/* Export Panel */}
      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card variant="glass" padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Exportar Imagem</h3>
                <button onClick={() => setShowExport(false)} className="text-gray-500 hover:text-white transition-colors text-sm">
                  Fechar
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {exportFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => onDownload?.(fmt.id)}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all text-center group"
                  >
                    <span className="text-2xl block mb-2">{fmt.icon}</span>
                    <p className="font-medium text-white group-hover:text-amber-400 transition-colors">{fmt.label}</p>
                    <p className="text-xs text-gray-500">{fmt.desc}</p>
                  </button>
                ))}
              </div>

              {/* Resolution selector */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Resolução</span>
                </div>
                <div className="flex gap-2">
                  {['1x', '2x', '4x'].map((scale) => (
                    <button
                      key={scale}
                      className={cn(
                        'px-3 py-1 rounded-lg text-sm font-medium transition-all',
                        scale === '1x'
                          ? 'bg-amber-500 text-black'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rate result */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <span className="text-sm text-gray-500 mr-2">Avalie o resultado:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} className="text-gray-500 hover:text-amber-400 transition-colors">
            <Star className="w-5 h-5" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default ResultViewer;
