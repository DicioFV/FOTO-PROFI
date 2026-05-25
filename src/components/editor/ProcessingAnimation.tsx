// src/components/editor/ProcessingAnimation.tsx
// CINEVISION AI — AI PROCESSING ANIMATION

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Camera, Palette, Zap } from 'lucide-react';
import { Progress } from '../ui';
import { cn } from '../../lib/utils';

export interface ProcessingAnimationProps {
  isProcessing: boolean;
  progress?: number;
  stage?: 'uploading' | 'analyzing' | 'generating' | 'enhancing' | 'finalizing';
  estimatedTime?: number;
  className?: string;
}

const stages = {
  uploading: { icon: Camera, label: 'Enviando imagem...', color: 'text-blue-400' },
  analyzing: { icon: Sparkles, label: 'Analisando características...', color: 'text-violet-400' },
  generating: { icon: Wand2, label: 'Gerando transformação...', color: 'text-amber-400' },
  enhancing: { icon: Palette, label: 'Aplicando melhorias...', color: 'text-emerald-400' },
  finalizing: { icon: Zap, label: 'Finalizando...', color: 'text-amber-400' },
};

export function ProcessingAnimation({
  isProcessing,
  progress = 0,
  stage = 'generating',
  estimatedTime,
  className,
}: ProcessingAnimationProps) {
  const [dots, setDots] = useState('');
  const currentStage = stages[stage];
  const Icon = currentStage.icon;

  useEffect(() => {
    if (!isProcessing) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            'bg-black/90 backdrop-blur-xl',
            className
          )}
        >
          <div className="max-w-md w-full mx-4 text-center">
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-32 h-32 mx-auto mb-8"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />
              
              {/* Icon Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-500/20 to-violet-500/20 border border-amber-500/30 flex items-center justify-center">
                <Icon className={cn('w-16 h-16', currentStage.color)} />
              </div>

              {/* Orbiting Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-amber-400"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${-30 - i * 10}px 0`,
                  }}
                />
              ))}
            </motion.div>

            {/* Stage Label */}
            <motion.h2
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {currentStage.label}{dots}
            </motion.h2>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress value={progress} variant="gold" size="lg" animated />
            </div>

            {/* Progress Percentage */}
            <p className="text-3xl font-bold text-amber-400 mb-2">{Math.round(progress)}%</p>

            {/* Estimated Time */}
            {estimatedTime && (
              <p className="text-sm text-gray-500">
                Tempo estimado: ~{estimatedTime}s
              </p>
            )}

            {/* Fun Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8"
            >
              <p className="text-sm text-gray-500 italic">
                💡 Nossa IA está trabalhando para criar algo incrível...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple inline loading indicator
export function ProcessingIndicator({ text = 'Processando' }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 text-amber-400">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
      <span className="text-sm font-medium">{text}...</span>
    </div>
  );
}

export default ProcessingAnimation;
