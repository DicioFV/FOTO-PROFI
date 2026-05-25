// src/components/gallery/StyleDetailModal.tsx
// CINEVISION AI — STYLE DETAIL MODAL

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Sparkles, Crown, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { Button, Badge } from '../ui';
import type { StyleItem, CategoryData } from '../../data/styles';
import { cn } from '../../lib/utils';

interface StyleDetailModalProps {
  style: StyleItem | null;
  category?: CategoryData;
  open: boolean;
  onClose: () => void;
}

export function StyleDetailModal({ style, category, open, onClose }: StyleDetailModalProps) {
  if (!style || !open) return null;

  const planLabels: Record<string, string> = { free: 'Grátis', starter: 'Starter', pro: 'Pro', agency: 'Agency' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Image */}
        <div className={cn('h-48 bg-gradient-to-br flex items-center justify-center relative', category?.gradient || 'from-amber-500/30 to-violet-500/30')}>
          <span className="text-7xl">{style.emoji}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {style.isNew && <Badge variant="gold" size="sm"><Sparkles className="w-3 h-3 mr-1" />Novo</Badge>}
            {style.isFeatured && <Badge variant="default" size="sm"><Star className="w-3 h-3 mr-1" />Destaque</Badge>}
            {style.isPopular && <Badge variant="default" size="sm"><TrendingUp className="w-3 h-3 mr-1" />Popular</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{style.name}</h2>
          <p className="text-gray-400 mb-4">{style.description}</p>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-white/5 text-center">
              <p className="text-lg font-bold text-amber-400">{style.creditsCost}</p>
              <p className="text-xs text-gray-500">Créditos</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 text-center">
              <p className="text-lg font-bold text-white">{(style.usageCount / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-500">Usos</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 text-center">
              <p className="text-lg font-bold text-white">{planLabels[style.minPlan]}</p>
              <p className="text-xs text-gray-500">Plano min.</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {style.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-400 border border-white/10">
                #{tag}
              </span>
            ))}
          </div>

          {/* Category */}
          {category && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-white/5">
              <span className="text-lg">{category.emoji}</span>
              <span className="text-sm text-gray-400">Categoria: <span className="text-white">{category.name}</span></span>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3">
            <Link to="/upload" className="flex-1" onClick={onClose}>
              <Button variant="gold" className="w-full" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Usar Este Estilo
              </Button>
            </Link>
          </div>

          {style.minPlan !== 'free' && (
            <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" />
              Requer plano {planLabels[style.minPlan]} ou superior
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default StyleDetailModal;
