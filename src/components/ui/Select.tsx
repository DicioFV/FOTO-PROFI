// src/components/ui/Select.tsx
// CINEVISION AI — SELECT COMPONENT

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  placeholder = 'Selecione...',
  options,
  label,
  error,
  disabled,
  className,
}: SelectProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            'flex items-center justify-between w-full h-11 px-4 rounded-xl',
            'bg-white/5 border border-white/10 text-white',
            'hover:bg-white/[0.07] hover:border-white/20',
            'focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'overflow-hidden bg-[#0f0f18] border border-white/10 rounded-xl shadow-xl shadow-black/50',
              'animate-in fade-in-0 zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
            )}
            position="popper"
            sideOffset={8}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-[#0f0f18] cursor-default">
              <ChevronUp className="w-4 h-4 text-gray-500" />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer',
                    'text-gray-300 hover:text-white hover:bg-white/5',
                    'focus:outline-none focus:bg-white/5 focus:text-white',
                    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
                    'data-[highlighted]:bg-amber-500/10 data-[highlighted]:text-amber-400',
                    'transition-colors'
                  )}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ml-auto">
                    <Check className="w-4 h-4 text-amber-400" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-[#0f0f18] cursor-default">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default Select;
