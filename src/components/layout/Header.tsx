// src/components/layout/Header.tsx
// CINEVISION AI — HEADER COMPONENT

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sparkles, CreditCard, LogOut, 
  Settings, History, Upload, LayoutDashboard 
} from 'lucide-react';
import { Button, Badge } from '../ui';
import { cn } from '../../lib/utils';

interface HeaderProps {
  isAuthenticated?: boolean;
  credits?: number;
  userName?: string;
  userAvatar?: string;
}

export function Header({ 
  isAuthenticated = false, 
  credits = 0,
  userName = 'Usuário',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/styles', label: 'Estilos', icon: Sparkles },
    { href: '/pricing', label: 'Planos', icon: CreditCard },
    { href: '/gallery', label: 'Galeria', icon: History },
  ];

  const userMenuLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/upload', label: 'Nova Foto', icon: Upload },
    { href: '/history', label: 'Histórico', icon: History },
    { href: '/settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              🎬
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                CineVision AI
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Transform. Elevate. Cinematic.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive 
                      ? 'text-amber-400 bg-amber-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Credits */}
                <Badge variant="gold" className="hidden sm:flex">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {credits} créditos
                </Badge>

                {/* CTA Button */}
                <Link to="/upload">
                  <Button size="sm" variant="primary" className="hidden sm:flex">
                    <Upload className="w-4 h-4 mr-1" />
                    Nova Foto
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-[#0f0f18] border border-white/10 shadow-xl z-50"
                        >
                          <div className="px-3 py-2 border-b border-white/10 mb-2">
                            <p className="font-medium text-white">{userName}</p>
                            <p className="text-sm text-gray-500">{credits} créditos</p>
                          </div>
                          {userMenuLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <Icon className="w-4 h-4" />
                                {link.label}
                              </Link>
                            );
                          })}
                          <div className="border-t border-white/10 mt-2 pt-2">
                            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                              <LogOut className="w-4 h-4" />
                              Sair
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button variant="primary" size="sm">
                    Começar Grátis
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95"
          >
            <nav className="p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
