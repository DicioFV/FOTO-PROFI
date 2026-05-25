// src/pages/CreditsPage.tsx
// CINEVISION AI — CREDITS MANAGEMENT PAGE

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Plus, Crown, TrendingUp, TrendingDown,
  CreditCard, Gift, Image, RefreshCw, Clock, Zap, ShoppingCart
} from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, Progress, Tabs, TabContent } from '../components/ui';
import { useAuthStore } from '../store';

// Mock data
interface CreditTransaction {
  id: string;
  type: 'generation' | 'purchase' | 'bonus' | 'refund' | 'reset';
  amount: number;
  description: string;
  createdAt: Date;
}

const transactions: CreditTransaction[] = [
  { id: '1', type: 'generation', amount: -1, description: 'Hollywood Portrait — Geração', createdAt: new Date(Date.now() - 300000) },
  { id: '2', type: 'generation', amount: -2, description: 'Cyberpunk Neon — Geração (Pro)', createdAt: new Date(Date.now() - 3600000) },
  { id: '3', type: 'generation', amount: -1, description: 'YouTube Thumbnail — Geração', createdAt: new Date(Date.now() - 7200000) },
  { id: '4', type: 'purchase', amount: 50, description: 'Pacote de 50 créditos', createdAt: new Date(Date.now() - 86400000) },
  { id: '5', type: 'bonus', amount: 10, description: 'Bônus de referência', createdAt: new Date(Date.now() - 172800000) },
  { id: '6', type: 'generation', amount: -1, description: 'LinkedIn Pro — Geração', createdAt: new Date(Date.now() - 259200000) },
  { id: '7', type: 'reset', amount: 200, description: 'Renovação mensal — Plano Pro', createdAt: new Date(Date.now() - 2592000000) },
  { id: '8', type: 'refund', amount: 2, description: 'Reembolso — Geração falhou', createdAt: new Date(Date.now() - 345600000) },
];

const creditPacks = [
  { id: 'pack-10', amount: 10, price: 9.90, popular: false, discount: null },
  { id: 'pack-25', amount: 25, price: 19.90, popular: false, discount: '20% off' },
  { id: 'pack-50', amount: 50, price: 34.90, popular: true, discount: '30% off' },
  { id: 'pack-100', amount: 100, price: 59.90, popular: false, discount: '40% off' },
];

const txIcons: Record<string, React.ElementType> = {
  generation: Image,
  purchase: ShoppingCart,
  bonus: Gift,
  refund: RefreshCw,
  reset: CreditCard,
};

const txColors: Record<string, string> = {
  generation: 'text-red-400',
  purchase: 'text-emerald-400',
  bonus: 'text-violet-400',
  refund: 'text-blue-400',
  reset: 'text-amber-400',
};

function timeAgo(d: Date) {
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000); const h = Math.floor(diff / 3600000); const dd = Math.floor(diff / 86400000);
  if (m < 60) return `${m}min`; if (h < 24) return `${h}h`; return `${dd}d`;
}

export function CreditsPage() {
  const user = useAuthStore(s => s.user);
  const credits = user?.credits ?? 150;
  const maxCredits = 200;
  const plan = user?.plan ?? 'pro';

  const tabs = [
    { value: 'overview', label: '📊 Visão Geral' },
    { value: 'history', label: '📋 Extrato' },
    { value: 'buy', label: '🛒 Comprar' },
  ];

  const totalUsed = transactions.filter(t => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0);
  const totalPurchased = transactions.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">Créditos</h1>
            <p className="text-gray-400">Gerencie seus créditos e veja seu histórico de uso</p>
          </motion.div>

          {/* Credits Overview Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-violet-500/10 pointer-events-none" />
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                      <span className="text-gray-400">Saldo atual</span>
                      <Badge variant={plan === 'pro' ? 'gold' : 'default'}><Crown className="w-3 h-3 mr-1" />{plan.charAt(0).toUpperCase() + plan.slice(1)}</Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-white">{credits}</span>
                      <span className="text-xl text-gray-500">/ {maxCredits}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Renova em 15 dias</p>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/pricing">
                      <Button variant="outline" leftIcon={<Crown className="w-4 h-4" />}>Upgrade</Button>
                    </Link>
                    <Button variant="gold" leftIcon={<Plus className="w-4 h-4" />}>Comprar Créditos</Button>
                  </div>
                </div>
                <Progress value={credits} max={maxCredits} variant="gold" size="lg" className="mt-6" />
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Usados este mês', value: totalUsed, icon: TrendingDown, color: 'text-red-400' },
              { label: 'Comprados', value: totalPurchased, icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'Gerações', value: transactions.filter(t => t.type === 'generation').length, icon: Image, color: 'text-violet-400' },
              { label: 'Economia', value: '40%', icon: Zap, color: 'text-amber-400' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                <Card padding="md">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} value="history" variant="underline">
            {/* Overview */}
            <TabContent value="overview">
              <div className="text-center py-12 text-gray-500">Visão geral detalhada em breve</div>
            </TabContent>

            {/* History */}
            <TabContent value="history">
              <Card>
                <CardHeader title="Extrato de Créditos" description="Todas as transações" />
                <CardContent>
                  <div className="space-y-1">
                    {transactions.map((tx, i) => {
                      const Icon = txIcons[tx.type] || CreditCard;
                      const isPositive = tx.amount > 0;
                      return (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 ${txColors[tx.type]}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{tx.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {timeAgo(tx.createdAt)} atrás
                            </div>
                          </div>
                          <span className={`text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{tx.amount}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            {/* Buy */}
            <TabContent value="buy">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {creditPacks.map((pack) => (
                  <Card key={pack.id} className={pack.popular ? 'border-amber-500/30 bg-amber-500/5' : ''} hover padding="lg">
                    {pack.popular && <Badge variant="gold" className="mb-3"><Crown className="w-3 h-3 mr-1" />Popular</Badge>}
                    <div className="text-center">
                      <p className="text-4xl font-bold text-white mb-1">{pack.amount}</p>
                      <p className="text-sm text-gray-500 mb-3">créditos</p>
                      <p className="text-2xl font-bold text-amber-400 mb-1">R${pack.price.toFixed(2).replace('.', ',')}</p>
                      {pack.discount && <Badge variant="success" size="sm">{pack.discount}</Badge>}
                      <Button variant={pack.popular ? 'gold' : 'outline'} className="w-full mt-4" size="sm">Comprar</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default CreditsPage;
