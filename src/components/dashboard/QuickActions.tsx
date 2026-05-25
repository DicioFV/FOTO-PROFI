// src/components/dashboard/QuickActions.tsx
// CINEVISION AI — QUICK ACTIONS COMPONENT

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, Palette, History, Download, 
  Sparkles, Camera, Wand2, Share2
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui';
import { cn } from '../../lib/utils';

interface QuickAction {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const actions: QuickAction[] = [
  {
    href: '/upload',
    label: 'Nova Foto',
    description: 'Upload ou câmera',
    icon: Upload,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'hover:border-amber-500/30',
  },
  {
    href: '/styles',
    label: 'Estilos',
    description: '500+ opções',
    icon: Palette,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'hover:border-violet-500/30',
  },
  {
    href: '/history',
    label: 'Histórico',
    description: 'Suas criações',
    icon: History,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'hover:border-blue-500/30',
  },
  {
    href: '/exports',
    label: 'Downloads',
    description: 'Exportar imagens',
    icon: Download,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'hover:border-emerald-500/30',
  },
];

const studios = [
  { href: '/studio/instagram', label: 'Instagram', icon: Camera, emoji: '📸' },
  { href: '/studio/youtube', label: 'YouTube', icon: Wand2, emoji: '📺' },
  { href: '/studio/thumbnails', label: 'Thumbnails', icon: Sparkles, emoji: '🎨' },
  { href: '/studio/linkedin', label: 'LinkedIn', icon: Share2, emoji: '💼' },
];

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Main Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.href}>
                <Card
                  hover
                  className={cn(
                    'p-5 cursor-pointer group border-transparent',
                    action.borderColor
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      'group-hover:scale-110 transition-transform',
                      action.bgColor
                    )}
                  >
                    <Icon className={cn('w-6 h-6', action.color)} />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Studios */}
      <Card>
        <CardHeader 
          title="Estúdios Especializados" 
          description="Otimizados para cada plataforma"
        />
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {studios.map((studio) => (
              <Link key={studio.href} to={studio.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer"
                >
                  <span className="text-2xl">{studio.emoji}</span>
                  <span className="text-sm font-medium text-white">{studio.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickActions;
