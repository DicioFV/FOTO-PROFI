// src/components/dashboard/RecentGenerations.tsx
// CINEVISION AI — RECENT GENERATIONS COMPONENT

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, Clock, Download, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui';

interface Generation {
  id: string;
  imageUrl: string;
  styleName: string;
  createdAt: Date;
  status: 'completed' | 'processing' | 'failed';
}

interface RecentGenerationsProps {
  generations: Generation[];
  maxItems?: number;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}min`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
}

export function RecentGenerations({
  generations,
  maxItems = 6,
  onView,
  onDownload,
  onDelete,
  className,
}: RecentGenerationsProps) {
  const displayedGenerations = generations.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader
        title="Gerações Recentes"
        description="Suas últimas criações"
        action={
          generations.length > maxItems ? (
            <Link to="/history">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          ) : undefined
        }
      />
      <CardContent>
        {displayedGenerations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
              <Image className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Nenhuma geração ainda</h3>
            <p className="text-gray-500 mb-4">Comece criando sua primeira foto cinematográfica</p>
            <Link to="/upload">
              <Button variant="gold">Criar Primeira Foto</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {displayedGenerations.map((gen, index) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 cursor-pointer"
                onClick={() => onView?.(gen.id)}
              >
                {/* Image */}
                {gen.status === 'completed' ? (
                  <img
                    src={gen.imageUrl}
                    alt={gen.styleName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {gen.status === 'processing' ? (
                      <div className="animate-spin">
                        <Clock className="w-8 h-8 text-amber-400" />
                      </div>
                    ) : (
                      <span className="text-red-400">Falhou</span>
                    )}
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-sm font-medium text-white truncate">{gen.styleName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(gen.createdAt)}
                  </div>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onView?.(gen.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDownload?.(gen.id)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(gen.id)}
                        className="text-red-400 focus:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status Badge */}
                {gen.status !== 'completed' && (
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant={gen.status === 'processing' ? 'warning' : 'error'}
                      size="sm"
                    >
                      {gen.status === 'processing' ? 'Processando' : 'Falhou'}
                    </Badge>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentGenerations;
