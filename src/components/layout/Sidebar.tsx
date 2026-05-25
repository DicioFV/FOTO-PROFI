// src/components/layout/Sidebar.tsx
// CINEVISION AI — SIDEBAR COMPONENT (Dashboard)

import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Upload, Palette, History, Download,
  Settings, CreditCard, HelpCircle, Sparkles, Crown,
  Globe, Video, Image, User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui';

interface SidebarProps {
  credits?: number;
  plan?: string;
  collapsed?: boolean;
}

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Nova Foto', icon: Upload, highlight: true },
  { href: '/editor', label: 'Editor', icon: Palette },
  { href: '/history', label: 'Histórico', icon: History },
  { href: '/exports', label: 'Exportações', icon: Download },
];

const studioNavItems = [
  { href: '/studio/instagram', label: 'Instagram', icon: Globe },
  { href: '/studio/youtube', label: 'YouTube', icon: Video },
  { href: '/studio/thumbnails', label: 'Thumbnails', icon: Image },
];

const bottomNavItems = [
  { href: '/credits', label: 'Créditos', icon: CreditCard },
  { href: '/settings', label: 'Configurações', icon: Settings },
  { href: '/help', label: 'Ajuda', icon: HelpCircle },
];

export function Sidebar({ credits = 0, plan = 'free', collapsed = false }: SidebarProps) {
  const location = useLocation();

  const NavItem = ({ href, label, icon: Icon, highlight = false }: { href: string; label: string; icon: React.ElementType; highlight?: boolean }) => {
    const isActive = location.pathname === href;

    return (
      <Link
        to={href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
          isActive
            ? 'bg-amber-500/10 text-amber-400'
            : highlight
              ? 'text-amber-400 hover:bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
        )}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-amber-400')} />
        {!collapsed && (
          <>
            <span className="flex-1">{label}</span>
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
              />
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 border-r border-white/10 bg-[#0a0a0f] z-40',
      'flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Credits Card */}
      {!collapsed && (
        <div className="p-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-violet-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white">Seus Créditos</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{credits}</div>
            <div className="flex items-center gap-2">
              <Badge variant={plan === 'pro' ? 'gold' : 'default'} size="sm">
                {plan === 'pro' && <Crown className="w-3 h-3 mr-1" />}
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </Badge>
              {plan === 'free' && (
                <Link to="/pricing" className="text-xs text-amber-400 hover:underline">
                  Upgrade
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="mb-6">
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Principal
            </p>
          )}
          {mainNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>

        <div className="mb-6">
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estúdios
            </p>
          )}
          {studioNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        {/* User Profile */}
        {!collapsed && (
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors mt-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Meu Perfil</p>
              <p className="text-xs text-gray-500 truncate">Editar perfil</p>
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
