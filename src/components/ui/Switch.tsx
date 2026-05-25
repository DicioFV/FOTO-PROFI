// src/components/ui/Switch.tsx
// CINEVISION AI — SWITCH COMPONENT

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  label,
  description,
  size = 'md',
  className,
}: SwitchProps) {
  const sizes = {
    sm: { root: 'w-8 h-5', thumb: 'w-3.5 h-3.5 data-[state=checked]:translate-x-3.5' },
    md: { root: 'w-11 h-6', thumb: 'w-5 h-5 data-[state=checked]:translate-x-5' },
    lg: { root: 'w-14 h-7', thumb: 'w-6 h-6 data-[state=checked]:translate-x-7' },
  };

  const switchElement = (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:ring-offset-2 focus:ring-offset-[#050507]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-white/20',
        sizes[size].root,
        className
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-lg ring-0',
          'transition-transform duration-200 ease-in-out',
          'data-[state=unchecked]:translate-x-0.5',
          sizes[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {switchElement}
        <div className="flex-1">
          {label && (
            <label className="text-sm font-medium text-white cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return switchElement;
}

export default Switch;
