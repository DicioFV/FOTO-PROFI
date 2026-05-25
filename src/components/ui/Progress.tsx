// src/components/ui/Progress.tsx
// CINEVISION AI — PROGRESS COMPONENT

import { cn } from '../../lib/utils';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gold' | 'success' | 'error';
  showValue?: boolean;
  animated?: boolean;
  className?: string;
  label?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  animated = true,
  className,
  label,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variants = {
    default: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    gold: 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 animate-shimmer bg-[length:200%_100%]',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    error: 'bg-gradient-to-r from-red-500 to-red-400',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {label && <span className="text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-white font-medium">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all',
            animated ? 'duration-500' : 'duration-0',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  variant?: 'default' | 'gold' | 'success';
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 60,
  strokeWidth = 4,
  showValue = true,
  variant = 'gold',
  className,
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: 'stroke-white',
    gold: 'stroke-amber-500',
    success: 'stroke-emerald-500',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-500', colors[variant])}
        />
      </svg>
      {showValue && (
        <span className="absolute text-sm font-medium text-white">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

export default Progress;
