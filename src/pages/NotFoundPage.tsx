// src/pages/NotFoundPage.tsx
// CINEVISION AI — 404 PAGE

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-4 max-w-lg"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <h1 className="text-[10rem] sm:text-[12rem] font-bold leading-none bg-gradient-to-b from-amber-400 to-amber-600/30 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-bold text-white mb-4">Cena Não Encontrada</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Parece que esta página saiu do roteiro. 
            Vamos voltar para a produção principal? 🎬
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button variant="gold" size="lg" leftIcon={<Home className="w-5 h-5" />}>
                Página Inicial
              </Button>
            </Link>
            <Link to="/styles">
              <Button variant="outline" size="lg" leftIcon={<Search className="w-5 h-5" />}>
                Explorar Estilos
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Film strip decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-2"
        >
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-10 h-8 bg-white/50 rounded-sm" />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
