// src/components/ui/Accordion.tsx
// CINEVISION AI — ACCORDION COMPONENT

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  collapsible = true,
  className,
}: AccordionProps) {
  const rootProps = type === 'single'
    ? { type: 'single' as const, defaultValue: defaultValue as string, collapsible }
    : { type: 'multiple' as const, defaultValue: defaultValue as string[] };

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      className={cn('space-y-2', className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
            'rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden',
            'data-[disabled]:opacity-50',
            'focus-within:ring-2 focus-within:ring-amber-500/20'
          )}
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                'flex items-center justify-between w-full px-5 py-4 text-left',
                'text-white font-medium',
                'hover:bg-white/5 transition-colors',
                'focus:outline-none',
                'group'
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-gray-400">{item.icon}</span>}
                {item.title}
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-500 transition-transform duration-200',
                  'group-data-[state=open]:rotate-180'
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              'overflow-hidden',
              'data-[state=open]:animate-accordion-down',
              'data-[state=closed]:animate-accordion-up'
            )}
          >
            <div className="px-5 pb-4 text-gray-400">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export default Accordion;
