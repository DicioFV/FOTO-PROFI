// src/components/ui/Avatar.tsx
// CINEVISION AI — AVATAR COMPONENT

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../lib/utils';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  className,
}: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getFallbackText = () => {
    if (fallback) return fallback.slice(0, 2).toUpperCase();
    if (alt) return alt.slice(0, 2).toUpperCase();
    return '?';
  };

  return (
    <div className="relative inline-flex">
      <AvatarPrimitive.Root
        className={cn(
          'relative flex shrink-0 overflow-hidden',
          shape === 'circle' ? 'rounded-full' : 'rounded-xl',
          sizes[size],
          className
        )}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center font-medium',
            'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
          )}
          delayMs={600}
        >
          {getFallbackText()}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-[#050507]',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

// Avatar Group
export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn('flex -space-x-3', className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-[#050507]"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'flex items-center justify-center bg-white/10 text-white font-medium ring-2 ring-[#050507]',
            size === 'sm' ? 'w-8 h-8 text-xs rounded-full' : 'w-10 h-10 text-sm rounded-full'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export default Avatar;
