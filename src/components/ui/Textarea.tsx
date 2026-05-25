// src/components/ui/Textarea.tsx
// CINEVISION AI — TEXTAREA COMPONENT

import { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
  variant?: 'default' | 'filled' | 'ghost';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      maxLength,
      showCount = false,
      variant = 'default',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      typeof value === 'string' ? value.length : 0
    );

    const variants = {
      default: 'bg-white/5 border-white/10 focus:border-amber-500/50 focus:bg-white/[0.07]',
      filled: 'bg-white/10 border-transparent focus:border-amber-500/50',
      ghost: 'bg-transparent border-transparent focus:bg-white/5 focus:border-white/10',
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            className={cn(
              'w-full min-h-[100px] px-4 py-3 rounded-xl border text-white placeholder-gray-500 resize-y transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-amber-500/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variants[variant],
              error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
          </div>
          {showCount && maxLength && (
            <p className={cn(
              'text-sm',
              charCount >= maxLength ? 'text-red-400' : 'text-gray-500'
            )}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
