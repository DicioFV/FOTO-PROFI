// src/components/dashboard/StatsCard.tsx
// CINEVISION AI — STATS CARD COMPONENT

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: 'default' | 'gold' | 'violet' | 'emerald' | 'blue';
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}: StatsCardProps) {
  const variants = {
    default: {
      bg: 'bg-white/[0.03]',
      iconBg: 'bg-white/10',
      iconColor: 'text-gray-400',
      border: 'border-white/10',
    },
    gold: {
      bg: 'bg-amber-500/10',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    violet: {
      bg: 'bg-violet-500/10',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-400',
      border: 'border-violet-500/20',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    blue: {
      bg: 'bg-blue-500/10',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      border: 'border-blue-500/20',
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'p-5 border transition-all hover:shadow-lg',
          style.bg,
          style.border,
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend.isPositive !== false ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.isPositive !== false ? 'text-emerald-400' : 'text-red-400'
                  )}
                >
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
                <span className="text-sm text-gray-500">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                style.iconBg,
                style.iconColor
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default StatsCard;
