// src/components/ui/DropdownMenu.tsx
// CINEVISION AI — DROPDOWN MENU COMPONENT

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = ({
  className,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[200px] overflow-hidden rounded-xl p-1',
        'bg-[#0f0f18] border border-white/10 shadow-xl shadow-black/50',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

const DropdownMenuItem = ({
  className,
  inset,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'relative flex items-center gap-3 select-none rounded-lg px-3 py-2.5 text-sm',
      'text-gray-300 outline-none transition-colors',
      'focus:bg-white/5 focus:text-white',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-pointer',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      'relative flex items-center select-none rounded-lg py-2.5 pl-10 pr-3 text-sm',
      'text-gray-300 outline-none transition-colors',
      'focus:bg-white/5 focus:text-white',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-pointer',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-amber-400" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'relative flex items-center select-none rounded-lg py-2.5 pl-10 pr-3 text-sm',
      'text-gray-300 outline-none transition-colors',
      'focus:bg-white/5 focus:text-white',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-pointer',
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-amber-400 text-amber-400" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      'px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
);

const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    className={cn('my-1 h-px bg-white/10', className)}
    {...props}
  />
);

const DropdownMenuSubTrigger = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      'flex items-center select-none rounded-lg px-3 py-2.5 text-sm',
      'text-gray-300 outline-none transition-colors',
      'focus:bg-white/5 focus:text-white',
      'data-[state=open]:bg-white/5',
      'cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'z-50 min-w-[200px] overflow-hidden rounded-xl p-1',
      'bg-[#0f0f18] border border-white/10 shadow-xl shadow-black/50',
      'animate-in fade-in-0 zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
