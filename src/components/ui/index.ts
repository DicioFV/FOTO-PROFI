// src/components/ui/index.ts
// CINEVISION AI — UI COMPONENTS EXPORTS

// Basic Components
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export { Card, CardHeader, CardContent, CardFooter } from './Card';
export type { CardProps, CardHeaderProps } from './Card';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

// Feedback Components
export { Modal, ModalTrigger, ModalContent, ModalFooter } from './Modal';
export type { ModalProps, ModalContentProps } from './Modal';

export { ToastProvider, useToast, ToastContainer } from './Toast';
export type { Toast, ToastType } from './Toast';

export { Alert, InlineAlert } from './Alert';
export type { AlertProps } from './Alert';

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonImage } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

export { Progress, CircularProgress } from './Progress';
export type { ProgressProps, CircularProgressProps } from './Progress';

export { Tooltip, TooltipProvider } from './Tooltip';
export type { TooltipProps } from './Tooltip';

// Form Components
export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { Slider, RangeSlider } from './Slider';
export type { SliderProps } from './Slider';

// Navigation Components
export { Tabs, TabContent } from './Tabs';
export type { TabsProps, Tab } from './Tabs';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';

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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './DropdownMenu';

// Display Components
export { Avatar, AvatarGroup } from './Avatar';
export type { AvatarProps, AvatarGroupProps } from './Avatar';
