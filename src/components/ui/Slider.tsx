// src/components/ui/Slider.tsx
// CINEVISION AI — SLIDER COMPONENT

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../lib/utils';

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  variant?: 'default' | 'gold';
  className?: string;
}

export function Slider({
  value,
  defaultValue = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  label,
  showValue = true,
  formatValue = (v) => String(v),
  variant = 'gold',
  className,
}: SliderProps) {
  const currentValue = value ?? defaultValue;

  const trackColors = {
    default: 'bg-white',
    gold: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  const thumbColors = {
    default: 'bg-white border-white/50',
    gold: 'bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/50',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-3">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-amber-400">
              {formatValue(currentValue[0])}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
          <SliderPrimitive.Range
            className={cn(
              'absolute h-full',
              trackColors[variant]
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border-2 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-[#050507]',
            'hover:scale-110 active:scale-95',
            thumbColors[variant]
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
}

// Range Slider for dual values
export function RangeSlider({
  value,
  defaultValue = [25, 75],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  className,
}: Omit<SliderProps, 'defaultValue' | 'value'> & {
  value?: [number, number];
  defaultValue?: [number, number];
}) {
  const currentValue = value ?? defaultValue;

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-3">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-amber-400">
              {currentValue[0]} - {currentValue[1]}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-amber-500 to-yellow-400" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-amber-500 border-2 border-amber-400 shadow-lg shadow-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 hover:scale-110 transition-transform" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-amber-500 border-2 border-amber-400 shadow-lg shadow-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 hover:scale-110 transition-transform" />
      </SliderPrimitive.Root>
    </div>
  );
}

export default Slider;
