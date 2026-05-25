// src/components/ui/Alert.tsx
// CINEVISION AI — ALERT COMPONENT

import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  action,
  onClose,
  className,
}: AlertProps) {
  const variants = {
    info: {
      container: 'bg-blue-500/10 border-blue-500/20',
      icon: <Info className="w-5 h-5 text-blue-400" />,
      title: 'text-blue-400',
    },
    success: {
      container: 'bg-emerald-500/10 border-emerald-500/20',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      title: 'text-emerald-400',
    },
    warning: {
      container: 'bg-yellow-500/10 border-yellow-500/20',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      title: 'text-yellow-400',
    },
    error: {
      container: 'bg-red-500/10 border-red-500/20',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      title: 'text-red-400',
    },
  };

  const config = variants[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex gap-4 p-4 rounded-xl border',
        config.container,
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icon || config.icon}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className={cn('font-medium mb-1', config.title)}>
            {title}
          </h5>
        )}
        <div className="text-sm text-gray-400">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Inline Alert (simpler version)
export function InlineAlert({
  variant = 'info',
  children,
  className,
}: {
  variant?: AlertProps['variant'];
  children: ReactNode;
  className?: string;
}) {
  const colors = {
    info: 'text-blue-400',
    success: 'text-emerald-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  };

  const icons = {
    info: <Info className="w-4 h-4" />,
    success: <CheckCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    error: <AlertCircle className="w-4 h-4" />,
  };

  return (
    <p className={cn('flex items-center gap-2 text-sm', colors[variant], className)}>
      {icons[variant]}
      {children}
    </p>
  );
}

export default Alert;
