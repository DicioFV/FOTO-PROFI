// src/components/ui/Modal.tsx
// CINEVISION AI — MODAL COMPONENT

import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export interface ModalContentProps {
  className?: string;
  children: ReactNode;
  title?: string;
  description?: string;
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

const ModalTrigger = Dialog.Trigger;

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, title, description, showClose = true, size = 'md' }, ref) => {
    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[95vw] h-[90vh]',
    };

    return (
      <Dialog.Portal>
        <AnimatePresence>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full',
                'bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50',
                'p-6 focus:outline-none',
                sizes[size],
                className
              )}
            >
              {(title || description || showClose) && (
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    {title && (
                      <Dialog.Title className="text-xl font-semibold text-white">
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="text-sm text-gray-400 mt-1">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                  {showClose && (
                    <Dialog.Close asChild>
                      <button
                        className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Fechar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  )}
                </div>
              )}
              {children}
            </motion.div>
          </Dialog.Content>
        </AnimatePresence>
      </Dialog.Portal>
    );
  }
);

ModalContent.displayName = 'ModalContent';

const ModalFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3', className)}
    {...props}
  >
    {children}
  </div>
);

export { Modal, ModalTrigger, ModalContent, ModalFooter };
export default Modal;
