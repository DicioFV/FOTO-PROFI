// src/components/ui/Skeleton.tsx
// CINEVISION AI — SKELETON LOADING COMPONENT

import { cn } from '../../lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        'bg-white/10',
        animate && 'animate-pulse',
        variants[variant],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

// Skeleton variants
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 rounded-2xl bg-white/[0.03] border border-white/10', className)}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar />
        <div className="flex-1">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <Skeleton variant="rounded" className="w-full h-40 mb-4" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonImage({ className, aspectRatio = '16/9' }: { className?: string; aspectRatio?: string }) {
  return (
    <div
      className={cn('bg-white/10 animate-pulse rounded-xl', className)}
      style={{ aspectRatio }}
    />
  );
}

export default Skeleton;
