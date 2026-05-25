// src/components/auth/AuthLayout.tsx
// CINEVISION AI — AUTH LAYOUT

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

export function AuthLayout({ children, title, subtitle, showBackToHome = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050507] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                🎬
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  CineVision AI
                </h1>
                <p className="text-xs text-gray-500">Transform. Elevate. Cinematic.</p>
              </div>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-gray-400">{subtitle}</p>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>

          {/* Back to Home */}
          {showBackToHome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                ← Voltar para o início
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Side - Image/Decoration */}
      <div className="hidden lg:block relative flex-1">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-[#0a0a0f] to-violet-500/10" />
        
        {/* Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12">
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/4 left-1/4"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 backdrop-blur-sm" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/20 backdrop-blur-sm" />
          </motion.div>

          {/* Main content */}
          <div className="text-center max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-6xl shadow-2xl shadow-amber-500/30"
            >
              🎬
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-white mb-4"
            >
              Transforme suas fotos em obras de arte
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400"
            >
              Junte-se a mais de 50.000 criadores que já descobriram 
              o poder da transformação cinematográfica com IA.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-8 mt-8"
            >
              {[
                { value: '500K+', label: 'Fotos criadas' },
                { value: '500+', label: 'Estilos' },
                { value: '4.9★', label: 'Avaliação' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
