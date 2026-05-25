// src/components/dashboard/ActivityFeed.tsx
// CINEVISION AI — ACTIVITY FEED COMPONENT

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Image, Download, CreditCard, Sparkles, 
  Clock, CheckCircle, XCircle, Loader
} from 'lucide-react';
import { Card, CardHeader, CardContent, Button } from '../ui';
import { cn } from '../../lib/utils';

export interface Activity {
  id: string;
  type: 'generation' | 'download' | 'purchase' | 'credit';
  title: string;
  description?: string;
  timestamp: Date;
  status?: 'completed' | 'pending' | 'failed';
  imageUrl?: string;
  metadata?: Record<string, unknown>;
}

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
  showViewAll?: boolean;
  className?: string;
}

const activityIcons = {
  generation: Image,
  download: Download,
  purchase: CreditCard,
  credit: Sparkles,
};

const statusIcons = {
  completed: CheckCircle,
  pending: Loader,
  failed: XCircle,
};

const statusColors = {
  completed: 'text-emerald-400',
  pending: 'text-amber-400 animate-spin',
  failed: 'text-red-400',
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days}d atrás`;
  return date.toLocaleDateString('pt-BR');
}

export function ActivityFeed({
  activities,
  maxItems = 5,
  showViewAll = true,
  className,
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader
        title="Atividade Recente"
        action={
          showViewAll && activities.length > maxItems ? (
            <Link to="/history">
              <Button variant="ghost" size="sm">
                Ver tudo
              </Button>
            </Link>
          ) : undefined
        }
      />
      <CardContent>
        {displayedActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-500">Nenhuma atividade recente</p>
            <Link to="/upload">
              <Button variant="outline" size="sm" className="mt-4">
                Criar primeira geração
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {displayedActivities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              const StatusIcon = activity.status ? statusIcons[activity.status] : null;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  {/* Image or Icon */}
                  {activity.imageUrl ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      <img
                        src={activity.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate group-hover:text-amber-400 transition-colors">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                      {activity.description && (
                        <>
                          <span>•</span>
                          <span className="truncate">{activity.description}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  {StatusIcon && activity.status && (
                    <div className={cn('flex-shrink-0', statusColors[activity.status])}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
