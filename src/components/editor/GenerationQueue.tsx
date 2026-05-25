// src/components/editor/GenerationQueue.tsx
// CINEVISION AI — GENERATION QUEUE STATUS

import { motion } from 'framer-motion';
import { Clock, Loader, CheckCircle, XCircle, Image } from 'lucide-react';
import { Badge, Progress } from '../ui';
import { cn } from '../../lib/utils';

export interface QueueItem {
  id: string;
  styleName: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  imageUrl?: string;
  createdAt: Date;
}

interface GenerationQueueProps {
  items: QueueItem[];
  onRetry?: (id: string) => void;
  onView?: (id: string) => void;
  className?: string;
}

const statusConfig = {
  queued: { icon: Clock, color: 'text-gray-400', label: 'Na fila', badge: 'default' as const },
  processing: { icon: Loader, color: 'text-amber-400', label: 'Processando', badge: 'gold' as const },
  completed: { icon: CheckCircle, color: 'text-emerald-400', label: 'Concluído', badge: 'success' as const },
  failed: { icon: XCircle, color: 'text-red-400', label: 'Falhou', badge: 'error' as const },
};

export function GenerationQueue({ items, onRetry, onView, className }: GenerationQueueProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="text-sm font-medium text-gray-400 mb-3">Fila de Geração</h4>
      {items.map((item) => {
        const config = statusConfig[item.status];

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
          >
            {/* Thumbnail or Icon */}
            {item.imageUrl ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Image className="w-5 h-5 text-gray-500" />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.styleName}</p>
              {item.status === 'processing' && (
                <Progress value={item.progress} variant="gold" size="sm" className="mt-1" />
              )}
            </div>

            {/* Status */}
            <Badge variant={config.badge} size="sm" dot={item.status === 'processing'} pulse={item.status === 'processing'}>
              {config.label}
            </Badge>

            {/* Actions */}
            {item.status === 'completed' && onView && (
              <button onClick={() => onView(item.id)} className="text-xs text-amber-400 hover:underline">
                Ver
              </button>
            )}
            {item.status === 'failed' && onRetry && (
              <button onClick={() => onRetry(item.id)} className="text-xs text-amber-400 hover:underline">
                Tentar
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default GenerationQueue;
