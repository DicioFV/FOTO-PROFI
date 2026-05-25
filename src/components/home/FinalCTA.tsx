// src/components/home/FinalCTA.tsx
// CINEVISION AI — FINAL CTA SECTION

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Star } from 'lucide-react';
import { Button, Badge } from '../ui';

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Card */}
          <div className="relative p-8 md:p-16 rounded-3xl overflow-hidden">
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-violet-500/10 border border-white/10 rounded-3xl" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-conic from-amber-500/50 via-transparent to-amber-500/50 animate-spin-slow opacity-20" style={{ animationDuration: '8s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <Badge variant="gold" className="mb-6">
                <Sparkles className="w-4 h-4 mr-1" />
                Comece em 30 segundos
              </Badge>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Sua Transformação
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Começa Agora
                </span>
              </h2>

              {/* Subheadline */}
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Junte-se a mais de 50.000 criadores que já transformaram suas fotos.
                Experimente gratuitamente, sem cartão de crédito.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link to="/register">
                  <Button
                    size="xl"
                    variant="gold"
                    className="text-lg px-10 group"
                    rightIcon={
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    }
                  >
                    Criar Conta Grátis
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  5 créditos grátis
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Sem cartão de crédito
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Cancele quando quiser
                </span>
              </div>

              {/* Rating */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-400">
                  <span className="text-white font-medium">4.9/5</span> de 50K+ avaliações
                </span>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30"
          >
            🎬
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/30"
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
