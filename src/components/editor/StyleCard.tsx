// src/components/editor/StyleCard.tsx
// CINEVISION AI — STYLE CARD COMPONENT

import { motion } from 'framer-motion';
import { Lock, Sparkles, Star, Crown } from 'lucide-react';
import { Badge } from '../ui';
import { cn } from '../../lib/utils';
import type { Style } from '../../types';

export interface StyleCardProps {
  style: Partial<Style> & { 
    id: string; 
    name: string; 
    previewUrl?: string;
    category?: string;
    isNew?: boolean;
    isFeatured?: boolean;
    minPlan?: string;
    creditsCost?: number;
  };
  selected?: boolean;
  locked?: boolean;
  onSelect?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StyleCard({
  style,
  selected = false,
  locked = false,
  onSelect,
  size = 'md',
  className,
}: StyleCardProps) {
  const sizes = {
    sm: 'w-32',
    md: 'w-40',
    lg: 'w-48',
  };

  const imageHeights = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48',
  };

  return (
    <motion.div
      whileHover={{ scale: locked ? 1 : 1.02 }}
      whileTap={{ scale: locked ? 1 : 0.98 }}
      className={cn(
        'relative group rounded-2xl overflow-hidden cursor-pointer',
        'border-2 transition-all duration-300',
        selected
          ? 'border-amber-500 shadow-lg shadow-amber-500/20'
          : 'border-transparent hover:border-white/20',
        locked && 'opacity-70 cursor-not-allowed',
        sizes[size],
        className
      )}
      onClick={() => !locked && onSelect?.()}
    >
      {/* Preview Image */}
      <div className={cn('relative bg-white/5', imageHeights[size])}>
        {style.previewUrl ? (
          <img
            src={style.previewUrl}
            alt={style.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-amber-500/20">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity'
        )} />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {style.isNew && (
            <Badge variant="gold" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Novo
            </Badge>
          )}
          {style.isFeatured && (
            <Badge variant="default" size="sm">
              <Star className="w-3 h-3 mr-1" />
              Destaque
            </Badge>
          )}
        </div>

        {/* Plan Badge */}
        {style.minPlan && style.minPlan !== 'free' && (
          <div className="absolute top-2 right-2">
            <Badge variant="gold" size="sm">
              <Crown className="w-3 h-3 mr-1" />
              {style.minPlan === 'pro' ? 'Pro' : style.minPlan}
            </Badge>
          </div>
        )}

        {/* Locked Overlay */}
        {locked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <p className="text-sm text-white/80">Upgrade para desbloquear</p>
            </div>
          </div>
        )}

        {/* Selected Indicator */}
        {selected && (
          <div className="absolute inset-0 border-4 border-amber-500 rounded-2xl">
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-white/[0.03]">
        <h3 className="font-medium text-white text-sm truncate">{style.name}</h3>
        <div className="flex items-center justify-between mt-1">
          {style.category && (
            <p className="text-xs text-gray-500 truncate">{style.category}</p>
          )}
          {style.creditsCost !== undefined && (
            <span className="text-xs text-amber-400">{style.creditsCost} crédito{style.creditsCost !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Style Grid Component
export function StyleGrid({
  styles,
  selectedId,
  onSelect,
  columns = 4,
  className,
}: {
  styles: StyleCardProps['style'][];
  selectedId?: string;
  onSelect?: (id: string) => void;
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}) {
  const gridCols = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {styles.map((style) => (
        <StyleCard
          key={style.id}
          style={style}
          selected={selectedId === style.id}
          onSelect={() => onSelect?.(style.id)}
        />
      ))}
    </div>
  );
}

export default StyleCard;
