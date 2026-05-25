// src/components/ui/Tabs.tsx
// CINEVISION AI — TABS COMPONENT

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface Tab {
  value: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export function Tabs({
  tabs,
  value,
  onValueChange,
  children,
  variant = 'default',
  className,
}: TabsProps) {
  const variantStyles = {
    default: {
      list: 'bg-white/[0.03] p-1 rounded-xl border border-white/10',
      trigger: 'data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg',
    },
    pills: {
      list: 'gap-2',
      trigger: 'data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-full border border-white/10 data-[state=active]:border-amber-500',
    },
    underline: {
      list: 'border-b border-white/10 gap-0',
      trigger: 'border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:text-amber-400 rounded-none pb-3',
    },
  };

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsPrimitive.List
        className={cn(
          'flex items-center',
          variantStyles[variant].list
        )}
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium',
              'text-gray-400 hover:text-white transition-all',
              'focus:outline-none focus:ring-2 focus:ring-amber-500/20',
              'disabled:opacity-50 disabled:pointer-events-none',
              variantStyles[variant].trigger
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">
                {tab.badge}
              </span>
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {children}
    </TabsPrimitive.Root>
  );
}

export function TabContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn('mt-4 focus:outline-none', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  );
}

export default Tabs;
