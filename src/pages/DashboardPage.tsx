// src/pages/DashboardPage.tsx
// CINEVISION AI — DASHBOARD PAGE

import { useMemo } from 'react';
import { Sparkles, Image, Zap, Clock } from 'lucide-react';
import { 
  StatsCard, 
  WelcomeBanner, 
  TipBanner,
  QuickActions, 
  CreditsWidget, 
  ActivityFeed,
  RecentGenerations,
  UsageChart,
  WeeklyActivityChart,
} from '../components/dashboard';
import { Card, CardHeader, CardContent } from '../components/ui';
import { useAuthStore } from '../store';
import type { Activity } from '../components/dashboard';

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'generation',
    title: 'Hollywood Portrait',
    description: 'Estilo cinematográfico',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: '2',
    type: 'generation',
    title: 'YouTube Thumbnail',
    description: 'Estilo redes sociais',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: '3',
    type: 'credit',
    title: 'Créditos adicionados',
    description: '+200 créditos (Plano Pro)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'completed',
  },
  {
    id: '4',
    type: 'generation',
    title: 'LinkedIn Pro',
    description: 'Estilo profissional',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
  },
];

const mockGenerations = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    styleName: 'Hollywood Portrait',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    status: 'completed' as const,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    styleName: 'YouTube Thumbnail',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    status: 'completed' as const,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    styleName: 'LinkedIn Pro',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'completed' as const,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    styleName: 'Cyberpunk Neon',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'completed' as const,
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    styleName: 'Film Noir',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    status: 'completed' as const,
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    styleName: 'Corporate Headshot',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    status: 'completed' as const,
  },
];

const usageData = [
  { label: 'Cinematográfico', value: 45 },
  { label: 'Redes Sociais', value: 32 },
  { label: 'Profissional', value: 18 },
  { label: 'Artístico', value: 12 },
];

const weeklyData = [3, 5, 2, 8, 4, 6, 3];

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  
  const credits = user?.credits ?? 150;
  const maxCredits = 200;
  const plan = user?.plan ?? 'pro';
  const isNewUser = user?.onboarded === false;

  const stats = useMemo(() => [
    {
      title: 'Créditos Disponíveis',
      value: credits,
      subtitle: `de ${maxCredits} este mês`,
      icon: <Sparkles className="w-6 h-6" />,
      variant: 'gold' as const,
    },
    {
      title: 'Gerações Este Mês',
      value: 47,
      icon: <Image className="w-6 h-6" />,
      variant: 'violet' as const,
      trend: { value: 12, label: 'vs mês passado', isPositive: true },
    },
    {
      title: 'Tempo Economizado',
      value: '3.5h',
      subtitle: 'comparado a edição manual',
      icon: <Clock className="w-6 h-6" />,
      variant: 'emerald' as const,
    },
    {
      title: 'Estilos Usados',
      value: 12,
      subtitle: 'de 500+ disponíveis',
      icon: <Zap className="w-6 h-6" />,
      variant: 'blue' as const,
    },
  ], [credits, maxCredits]);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Banner */}
          <WelcomeBanner 
            userName={user?.fullName?.split(' ')[0] || 'Criador'} 
            isNewUser={isNewUser}
            hasCompletedOnboarding={user?.onboarded ?? true}
          />

          {/* Tip Banner */}
          <TipBanner className="mb-8" />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions className="mb-8" />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Recent Generations */}
            <div className="lg:col-span-2">
              <RecentGenerations 
                generations={mockGenerations}
                onView={(id) => console.log('View', id)}
                onDownload={(id) => console.log('Download', id)}
                onDelete={(id) => console.log('Delete', id)}
              />
            </div>

            {/* Right Column - Credits Widget */}
            <div className="space-y-6">
              <CreditsWidget
                credits={credits}
                maxCredits={maxCredits}
                plan={plan}
                nextReset={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
              />

              {/* Weekly Activity Mini Chart */}
              <Card>
                <CardHeader title="Atividade Semanal" />
                <CardContent>
                  <WeeklyActivityChart data={weeklyData} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <ActivityFeed activities={mockActivities} />

            {/* Usage Chart */}
            <UsageChart 
              data={usageData} 
              title="Uso por Categoria"
              description="Distribuição das suas gerações"
              type="horizontal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
