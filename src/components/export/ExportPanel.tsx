// src/components/export/ExportPanel.tsx
// CINEVISION AI — EXPORT PANEL COMPONENT

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, FileImage, Maximize2,
  CheckCircle, Loader, Copy, Share2
} from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, Progress } from '../ui';
import { cn } from '../../lib/utils';

export interface ExportConfig {
  format: 'png' | 'jpg' | 'webp';
  quality: number;
  scale: '1x' | '2x' | '4x';
  watermark: boolean;
}

interface ExportPanelProps {
  imageUrl: string;
  fileName?: string;
  baseWidth?: number;
  baseHeight?: number;
  isPro?: boolean;
  onExport?: (config: ExportConfig) => void;
  onShare?: () => void;
  onCopyLink?: () => void;
  className?: string;
}

const formatInfo = {
  png: { icon: '🖼️', label: 'PNG', color: 'text-blue-400', desc: 'Lossless, transparência' },
  jpg: { icon: '📷', label: 'JPG', color: 'text-amber-400', desc: 'Compressão, universal' },
  webp: { icon: '🌐', label: 'WebP', color: 'text-emerald-400', desc: 'Moderno, leve' },
};

export function ExportPanel({
  imageUrl,
  fileName = 'cinevision-export',
  baseWidth = 1024,
  baseHeight = 1024,
  isPro = false,
  onExport,
  onShare,
  onCopyLink,
  className,
}: ExportPanelProps) {
  const [config, setConfig] = useState<ExportConfig>({
    format: 'png',
    quality: 95,
    scale: '1x',
    watermark: !isPro,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportDone, setExportDone] = useState(false);

  const scaleMultiplier = config.scale === '1x' ? 1 : config.scale === '2x' ? 2 : 4;
  const finalWidth = baseWidth * scaleMultiplier;
  const finalHeight = baseHeight * scaleMultiplier;
  const estimatedSize = Math.round((finalWidth * finalHeight * (config.format === 'png' ? 4 : 0.3) * (config.quality / 100)) / 1024);
  const sizeLabel = estimatedSize > 1024 ? `${(estimatedSize / 1024).toFixed(1)} MB` : `${estimatedSize} KB`;

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportDone(false);

    // Simulate export processing
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(r => setTimeout(r, 300));
      setExportProgress(i);
    }

    // Trigger download
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${fileName}.${config.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch { /* fallback */ }

    setExportProgress(100);
    setExportDone(true);
    setIsExporting(false);
    onExport?.(config);
  }, [imageUrl, fileName, config, onExport]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader title="Exportar Imagem" description="Escolha formato, qualidade e resolução" />
      <CardContent>
        <div className="space-y-5">
          {/* Format Selection — Visual */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Formato</label>
            <div className="grid grid-cols-3 gap-2">
              {(['png', 'jpg', 'webp'] as const).map((fmt) => {
                const info = formatInfo[fmt];
                return (
                  <button
                    key={fmt}
                    onClick={() => setConfig(c => ({ ...c, format: fmt }))}
                    className={cn(
                      'p-3 rounded-xl border text-center transition-all',
                      config.format === fmt
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    )}
                  >
                    <span className="text-2xl block mb-1">{info.icon}</span>
                    <p className={cn('text-sm font-medium', config.format === fmt ? 'text-amber-400' : 'text-white')}>{info.label}</p>
                    <p className="text-[10px] text-gray-500">{info.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scale Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resolução</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: '1x', label: `${baseWidth}×${baseHeight}`, tag: 'Padrão' },
                { value: '2x', label: `${baseWidth * 2}×${baseHeight * 2}`, tag: '2K' },
                { value: '4x', label: `${baseWidth * 4}×${baseHeight * 4}`, tag: '4K' },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setConfig(c => ({ ...c, scale: opt.value }))}
                  disabled={opt.value === '4x' && !isPro}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-all relative',
                    config.scale === opt.value
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20',
                    opt.value === '4x' && !isPro && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <p className={cn('text-sm font-bold', config.scale === opt.value ? 'text-amber-400' : 'text-white')}>{opt.value}</p>
                  <p className="text-[10px] text-gray-500">{opt.label}</p>
                  {opt.value === '4x' && !isPro && (
                    <Badge variant="gold" size="sm" className="absolute -top-2 -right-2">PRO</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider (JPG/WebP only) */}
          {config.format !== 'png' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Qualidade</label>
                <span className="text-sm text-amber-400">{config.quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={config.quality}
                onChange={(e) => setConfig(c => ({ ...c, quality: parseInt(e.target.value) }))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Menor arquivo</span>
                <span>Maior qualidade</span>
              </div>
            </div>
          )}

          {/* Info Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{finalWidth}×{finalHeight}</span>
              <span className="flex items-center gap-1"><FileImage className="w-3.5 h-3.5" />~{sizeLabel}</span>
            </div>
            {config.watermark && (
              <Badge variant="warning" size="sm">Marca d'água</Badge>
            )}
          </div>

          {/* Export Progress */}
          <AnimatePresence>
            {isExporting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Progress value={exportProgress} variant="gold" size="md" animated />
                <p className="text-sm text-center text-gray-400 mt-2">
                  {exportProgress < 100 ? 'Preparando export...' : 'Concluído!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {exportDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-medium text-emerald-400">Download Iniciado!</p>
                <p className="text-sm text-gray-500 mt-1">{fileName}.{config.format}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={handleExport}
              isLoading={isExporting}
              leftIcon={isExporting ? <Loader className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            >
              {isExporting ? 'Exportando...' : exportDone ? 'Baixar Novamente' : 'Baixar Imagem'}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={onShare} leftIcon={<Share2 className="w-4 h-4" />}>
                Compartilhar
              </Button>
              <Button variant="outline" onClick={onCopyLink} leftIcon={<Copy className="w-4 h-4" />}>
                Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExportPanel;
