// src/components/ui/Checkbox.tsx
// CINEVISION AI — CHECKBOX COMPONENT

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  disabled,
  label,
  description,
  error,
  size = 'md',
  className,
}: CheckboxProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const checkboxElement = (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center rounded-md border-2 transition-all',
        'bg-white/5 border-white/20',
        'hover:border-white/30 hover:bg-white/10',
        'focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:ring-offset-2 focus:ring-offset-[#050507]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500',
        'data-[state=indeterminate]:bg-amber-500 data-[state=indeterminate]:border-amber-500',
        sizes[size],
        error && 'border-red-500/50',
        className
      )}
    >
      <CheckboxPrimitive.Indicator className="text-black">
        {checked === 'indeterminate' ? (
          <Minus className={iconSizes[size]} />
        ) : (
          <Check className={iconSizes[size]} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {checkboxElement}
        <div className="flex-1">
          {label && (
            <label className={cn(
              'text-sm font-medium cursor-pointer',
              disabled ? 'text-gray-500' : 'text-white'
            )}>
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
          {error && (
            <p className="text-sm text-red-400 mt-1">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return checkboxElement;
}

export default Checkbox;
