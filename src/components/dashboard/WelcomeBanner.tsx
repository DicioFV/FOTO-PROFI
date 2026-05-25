// src/components/dashboard/WelcomeBanner.tsx
// CINEVISION AI — WELCOME BANNER COMPONENT

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { Button, Badge } from '../ui';
import { cn } from '../../lib/utils';

interface WelcomeBannerProps {
  userName?: string;
  isNewUser?: boolean;
  hasCompletedOnboarding?: boolean;
  className?: string;
}

export function WelcomeBanner({
  userName = 'Criador',
  isNewUser = false,
  hasCompletedOnboarding = true,
  className,
}: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // New user welcome
  if (isNewUser && !hasCompletedOnboarding) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-amber-500/20',
          'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-violet-500/10',
          className
        )}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative p-6 sm:p-8">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
                🎬
              </div>
            </div>

            <div className="flex-1">
              <Badge variant="gold" className="mb-3">
                <Gift className="w-3 h-3 mr-1" />
                5 créditos de boas-vindas
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-2">
                Bem-vindo ao CineVision AI, {userName}! 🎉
              </h2>
              <p className="text-gray-400 mb-4">
                Estamos felizes em ter você aqui! Comece transformando sua primeira foto
                em uma obra cinematográfica.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/upload">
                  <Button variant="gold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Criar Primeira Foto
                  </Button>
                </Link>
                <Link to="/styles">
                  <Button variant="outline">
                    Explorar Estilos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular greeting
  const hour = new Date().getHours();
  let greeting = 'Boa noite';
  if (hour < 12) greeting = 'Bom dia';
  else if (hour < 18) greeting = 'Boa tarde';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mb-8', className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            O que vamos criar hoje? Seu estúdio cinematográfico está pronto.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button variant="gold" leftIcon={<Sparkles className="w-4 h-4" />}>
              Nova Criação
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Tip of the day banner
export function TipBanner({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(true);

  const tips = [
    { icon: '💡', tip: 'Use fotos com boa iluminação para melhores resultados' },
    { icon: '🎯', tip: 'Rostos frontais geram transformações mais precisas' },
    { icon: '✨', tip: 'Experimente diferentes estilos para encontrar seu favorito' },
    { icon: '📱', tip: 'Instale o app para acesso rápido no celular' },
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'flex items-center gap-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20',
        className
      )}
    >
      <span className="text-2xl">{randomTip.icon}</span>
      <div className="flex-1">
        <p className="text-sm text-violet-300">
          <span className="font-medium">Dica:</span> {randomTip.tip}
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default WelcomeBanner;
