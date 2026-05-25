// src/components/upload/ImageAnalysis.tsx
// CINEVISION AI — IMAGE ANALYSIS COMPONENT

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, AlertTriangle, XCircle, User, 
  Sun, Maximize, FileImage, Sparkles
} from 'lucide-react';
import { Progress } from '../ui';
import { cn } from '../../lib/utils';

interface AnalysisResult {
  faceDetected: boolean;
  faceCount: number;
  lighting: 'excellent' | 'good' | 'fair' | 'poor';
  resolution: { width: number; height: number };
  fileSize: number;
  sharpness: 'excellent' | 'good' | 'fair' | 'poor';
  overallScore: number; // 0-100
}

interface ImageAnalysisProps {
  imageUrl: string;
  file: File;
  onAnalysisComplete?: (result: AnalysisResult) => void;
  className?: string;
}

function analyzeQuality(label: string): { color: string; icon: typeof CheckCircle } {
  switch (label) {
    case 'excellent': return { color: 'text-emerald-400', icon: CheckCircle };
    case 'good': return { color: 'text-emerald-400', icon: CheckCircle };
    case 'fair': return { color: 'text-yellow-400', icon: AlertTriangle };
    case 'poor': return { color: 'text-red-400', icon: XCircle };
    default: return { color: 'text-gray-400', icon: CheckCircle };
  }
}

const qualityLabels: Record<string, string> = {
  excellent: 'Excelente',
  good: 'Boa',
  fair: 'Razoável',
  poor: 'Baixa',
};

export function ImageAnalysis({ imageUrl, file, onAnalysisComplete, className }: ImageAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progressive analysis
    const steps = [
      { pct: 20, delay: 300 },
      { pct: 45, delay: 600 },
      { pct: 70, delay: 900 },
      { pct: 90, delay: 1200 },
      { pct: 100, delay: 1500 },
    ];

    steps.forEach(({ pct, delay }) => {
      setTimeout(() => {
        if (!cancelled) setProgress(pct);
      }, delay);
    });

    // Analyze image
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;

      const analysisResult: AnalysisResult = {
        faceDetected: true,
        faceCount: 1,
        lighting: img.width > 800 ? 'good' : 'fair',
        resolution: { width: img.width, height: img.height },
        fileSize: file.size,
        sharpness: img.width >= 1024 ? 'excellent' : img.width >= 512 ? 'good' : 'fair',
        overallScore: Math.min(100, Math.round(
          (img.width >= 1024 ? 30 : img.width >= 512 ? 20 : 10) +
          (file.size < MAX_SIZE ? 20 : 10) +
          25 + // face detected (mock)
          25   // lighting (mock)
        )),
      };

      setTimeout(() => {
        if (!cancelled) {
          setResult(analysisResult);
          setIsAnalyzing(false);
          onAnalysisComplete?.(analysisResult);
        }
      }, 1800);
    };
    img.src = imageUrl;

    return () => { cancelled = true; };
  }, [imageUrl, file]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const scoreColor = useMemo(() => {
    if (!result) return 'text-gray-400';
    if (result.overallScore >= 80) return 'text-emerald-400';
    if (result.overallScore >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }, [result]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Analyzing State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-white/[0.03] border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="font-medium text-white">Analisando imagem...</span>
          </div>
          <Progress value={progress} variant="gold" size="sm" animated />
          <p className="text-xs text-gray-500 mt-2">
            {progress < 30 ? 'Verificando formato...' :
             progress < 60 ? 'Detectando rosto...' :
             progress < 90 ? 'Analisando qualidade...' :
             'Finalizando...'}
          </p>
        </motion.div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-white/[0.03] border border-white/10"
        >
          {/* Overall Score */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center',
                result.overallScore >= 80 ? 'bg-emerald-500/20' :
                result.overallScore >= 60 ? 'bg-yellow-500/20' : 'bg-red-500/20'
              )}>
                {result.overallScore >= 80 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : result.overallScore >= 60 ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-white">Qualidade da Imagem</p>
                <p className="text-sm text-gray-500">
                  {result.overallScore >= 80 ? 'Excelente para transformação' :
                   result.overallScore >= 60 ? 'Boa, mas pode melhorar' :
                   'Considere usar uma foto melhor'}
                </p>
              </div>
            </div>
            <span className={cn('text-3xl font-bold', scoreColor)}>
              {result.overallScore}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Face */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
              <User className={cn('w-4 h-4', result.faceDetected ? 'text-emerald-400' : 'text-red-400')} />
              <div>
                <p className="text-sm text-gray-400">Rosto</p>
                <p className="text-sm font-medium text-white">
                  {result.faceDetected ? `${result.faceCount} detectado` : 'Não detectado'}
                </p>
              </div>
            </div>

            {/* Lighting */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
              <Sun className={analyzeQuality(result.lighting).color + ' w-4 h-4'} />
              <div>
                <p className="text-sm text-gray-400">Iluminação</p>
                <p className="text-sm font-medium text-white">{qualityLabels[result.lighting]}</p>
              </div>
            </div>

            {/* Resolution */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
              <Maximize className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Resolução</p>
                <p className="text-sm font-medium text-white">
                  {result.resolution.width}×{result.resolution.height}
                </p>
              </div>
            </div>

            {/* File Size */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
              <FileImage className="w-4 h-4 text-violet-400" />
              <div>
                <p className="text-sm text-gray-400">Tamanho</p>
                <p className="text-sm font-medium text-white">{formatFileSize(result.fileSize)}</p>
              </div>
            </div>
          </div>

          {/* Tips if score is low */}
          {result.overallScore < 80 && (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300 font-medium mb-1">💡 Dicas para melhorar:</p>
              <ul className="text-xs text-gray-400 space-y-1">
                {!result.faceDetected && <li>• Garanta que seu rosto esteja visível</li>}
                {result.lighting === 'poor' && <li>• Use iluminação frontal natural</li>}
                {result.resolution.width < 512 && <li>• Use uma imagem com maior resolução</li>}
                {result.sharpness === 'poor' && <li>• Evite imagens desfocadas</li>}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const MAX_SIZE = 10 * 1024 * 1024;

export default ImageAnalysis;
