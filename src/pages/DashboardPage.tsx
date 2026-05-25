// src/pages/DashboardPage.tsx
// CINEVISION AI — DASHBOARD PAGE

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload, Sparkles, History, Download, TrendingUp,
  ArrowRight, Clock, Image, Zap
} from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, Progress } from '../components/ui';
import { useAuthStore } from '../store';

const quickActions = [
  { href: '/upload', label: 'Nova Foto', icon: Upload, color: 'amber' },
  { href: '/styles', label: 'Estilos', icon: Sparkles, color: 'violet' },
  { href: '/history', label: 'Histórico', icon: History, color: 'blue' },
  { href: '/exports', label: 'Downloads', icon: Download, color: 'emerald' },
];

const recentGenerations = [
  { id: 1, style: 'Hollywood Portrait', time: '2 min atrás', status: 'completed' },
  { id: 2, style: 'YouTube Thumbnail', time: '15 min atrás', status: 'completed' },
  { id: 3, style: 'LinkedIn Pro', time: '1 hora atrás', status: 'completed' },
];

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const credits = user?.credits ?? 50;

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Olá, {user?.fullName?.split(' ')[0] || 'Criador'} 👋
            </motion.h1>
            <p className="text-gray-400">
              Bem-vindo ao seu estúdio criativo. O que vamos criar hoje?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => {
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
                      className={`p-5 group cursor-pointer border-${action.color}-500/20 hover:border-${action.color}-500/40`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 text-${action.color}-400`} />
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {action.label}
                      </h3>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Credits & Usage */}
            <Card variant="gradient" padding="lg" className="lg:col-span-2">
              <CardHeader
                title="Uso Este Mês"
                description="Acompanhe seus créditos e gerações"
                action={
                  <Link to="/credits">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Ver Detalhes
                    </Button>
                  </Link>
                }
              />
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Credits */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-gray-400">Créditos</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{credits}</div>
                    <Progress value={credits} max={200} variant="gold" size="sm" />
                    <p className="text-xs text-gray-500 mt-2">de 200 este mês</p>
                  </div>

                  {/* Generations */}
                  <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="w-4 h-4 text-violet-400" />
                      <span className="text-sm text-gray-400">Gerações</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">47</div>
                    <div className="flex items-center gap-1 text-emerald-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      +12% vs mês passado
                    </div>
                  </div>

                  {/* Time Saved */}
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-gray-400">Tempo Salvo</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">3.5h</div>
                    <p className="text-xs text-gray-500">comparado a edição manual</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Generate */}
            <Card variant="glass" padding="lg">
              <CardHeader title="Geração Rápida" />
              <CardContent>
                <div className="space-y-4">
                  <Link to="/upload" className="block">
                    <div className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-amber-500/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-amber-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-white">Upload de Foto</p>
                        <p className="text-sm text-gray-500">ou arraste aqui</p>
                      </div>
                    </div>
                  </Link>
                  <Button variant="primary" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Nova Geração
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card variant="default" padding="lg" className="mt-6">
            <CardHeader
              title="Atividade Recente"
              action={
                <Link to="/history">
                  <Button variant="ghost" size="sm">
                    Ver Tudo
                  </Button>
                </Link>
              }
            />
            <CardContent>
              <div className="divide-y divide-white/10">
                {recentGenerations.map((gen) => (
                  <div key={gen.id} className="py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 flex items-center justify-center">
                      <Image className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{gen.style}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {gen.time}
                      </div>
                    </div>
                    <Badge variant="success" size="sm">
                      Concluído
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
