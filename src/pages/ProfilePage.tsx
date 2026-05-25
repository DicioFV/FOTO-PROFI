// src/pages/ProfilePage.tsx
// CINEVISION AI — USER PROFILE PAGE

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Image, Star, Calendar, Crown, Sparkles } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, Avatar } from '../components/ui';
import { useAuthStore } from '../store';

export function ProfilePage() {
  const user = useAuthStore(s => s.user);
  const name = user?.fullName || 'Usuário Demo';
  const email = user?.email || 'user@demo.com';
  const plan = user?.plan || 'pro';
  const credits = user?.credits ?? 150;

  const stats = [
    { label: 'Gerações', value: '247', icon: Image },
    { label: 'Créditos usados', value: '1,842', icon: Sparkles },
    { label: 'Favoritos', value: '38', icon: Star },
    { label: 'Membro desde', value: 'Jan 2024', icon: Calendar },
  ];

  const achievements = [
    { emoji: '🏆', name: 'Primeiro Upload', desc: 'Fez a primeira geração', unlocked: true },
    { emoji: '🔥', name: 'Em Chamas', desc: '10 gerações em um dia', unlocked: true },
    { emoji: '💎', name: 'Colecionador', desc: '50 estilos diferentes usados', unlocked: true },
    { emoji: '⭐', name: 'Avaliador', desc: 'Avaliou 20 resultados', unlocked: false },
    { emoji: '🚀', name: 'Power User', desc: '100 gerações total', unlocked: true },
    { emoji: '👑', name: 'VIP', desc: 'Assinou plano Pro', unlocked: plan !== 'free' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="overflow-hidden mb-8">
              <div className="h-32 bg-gradient-to-r from-amber-500/20 via-violet-500/20 to-amber-500/20 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
              </div>
              <div className="px-6 pb-6 -mt-12 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <Avatar size="2xl" fallback={name.slice(0, 2)} className="ring-4 ring-[#050507]" />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{name}</h1>
                    <p className="text-gray-400">{email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="gold"><Crown className="w-3 h-3 mr-1" />{plan.charAt(0).toUpperCase() + plan.slice(1)}</Badge>
                      <Badge variant="default"><Sparkles className="w-3 h-3 mr-1" />{credits} créditos</Badge>
                    </div>
                  </div>
                  <Link to="/settings"><Button variant="outline" size="sm" leftIcon={<Settings className="w-4 h-4" />}>Editar Perfil</Button></Link>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <Card padding="md" hover>
                  <stat.icon className="w-5 h-5 text-amber-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader title="Conquistas" description={`${achievements.filter(a => a.unlocked).length} de ${achievements.length} desbloqueadas`} />
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {achievements.map((ach) => (
                    <div key={ach.name} className={`p-4 rounded-xl border text-center transition-all ${ach.unlocked ? 'bg-white/[0.03] border-white/10' : 'bg-white/[0.01] border-white/5 opacity-40'}`}>
                      <span className="text-3xl block mb-2">{ach.emoji}</span>
                      <p className="text-sm font-medium text-white">{ach.name}</p>
                      <p className="text-xs text-gray-500">{ach.desc}</p>
                      {ach.unlocked && <Badge variant="success" size="sm" className="mt-2">✓</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
