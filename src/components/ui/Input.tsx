// src/components/ui/Input.tsx
// CINEVISION AI — INPUT COMPONENT

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'filled' | 'ghost';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = 'default',
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white/5 border-white/10 focus:border-amber-500/50 focus:bg-white/[0.07]',
      filled: 'bg-white/10 border-transparent focus:border-amber-500/50',
      ghost: 'bg-transparent border-transparent focus:bg-white/5 focus:border-white/10',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full h-11 px-4 rounded-xl border text-white placeholder-gray-500 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-amber-500/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variants[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
