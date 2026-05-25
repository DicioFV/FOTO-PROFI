// src/components/dashboard/CreditsWidget.tsx
// CINEVISION AI — CREDITS WIDGET COMPONENT

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Crown, Zap, ArrowRight } from 'lucide-react';
import { Card, Button, Badge, Progress, CircularProgress } from '../ui';
import { cn } from '../../lib/utils';

interface CreditsWidgetProps {
  credits: number;
  maxCredits: number;
  plan: string;
  nextReset?: Date;
  className?: string;
}

export function CreditsWidget({
  credits,
  maxCredits,
  plan,
  nextReset,
  className,
}: CreditsWidgetProps) {
  const percentage = Math.round((credits / maxCredits) * 100);
  const isLow = percentage < 20;
  const isPro = plan === 'pro' || plan === 'agency';

  const daysUntilReset = nextReset
    ? Math.ceil((nextReset.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-violet-500/10 pointer-events-none" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Seus Créditos</h3>
              <p className="text-sm text-gray-500">
                {daysUntilReset !== null && `Renova em ${daysUntilReset} dias`}
              </p>
            </div>
          </div>
          <Badge variant={isPro ? 'gold' : 'default'}>
            {isPro && <Crown className="w-3 h-3 mr-1" />}
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </Badge>
        </div>

        {/* Credits Display */}
        <div className="flex items-center gap-6 mb-6">
          <CircularProgress
            value={credits}
            max={maxCredits}
            size={80}
            strokeWidth={6}
            variant={isLow ? 'default' : 'gold'}
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{credits}</span>
              <span className="text-lg text-gray-500">/ {maxCredits}</span>
            </div>
            <p className="text-sm text-gray-400">créditos disponíveis</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress
          value={credits}
          max={maxCredits}
          variant={isLow ? 'default' : 'gold'}
          size="md"
          className="mb-4"
        />

        {/* Low Credits Warning */}
        {isLow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4"
          >
            <Zap className="w-5 h-5 text-amber-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-400">Créditos baixos</p>
              <p className="text-xs text-gray-400">Considere fazer upgrade</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/credits" className="flex-1">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Comprar Créditos
            </Button>
          </Link>
          {!isPro && (
            <Link to="/pricing">
              <Button variant="gold">
                Upgrade
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

export default CreditsWidget;
