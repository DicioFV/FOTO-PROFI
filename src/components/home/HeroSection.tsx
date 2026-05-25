// src/components/home/HeroSection.tsx
// CINEVISION AI — CINEMATIC HERO SECTION

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Star } from 'lucide-react';
import { Button, Badge } from '../ui';

const stats = [
  { value: '500K+', label: 'Fotos Criadas' },
  { value: '50K+', label: 'Usuários Ativos' },
  { value: '500+', label: 'Estilos Únicos' },
  { value: '4.9', label: 'Avaliação', icon: Star },
];

const floatingImages = [
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', delay: 0 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', delay: 0.2 },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', delay: 0.4 },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', delay: 0.6 },
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient glow */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-[150px] animate-pulse" />
          <div className="absolute inset-10 bg-violet-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/50 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating Preview Images */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              x: mousePosition.x * (i % 2 === 0 ? 1 : -1) * 0.5,
              y: mousePosition.y * (i % 2 === 0 ? -1 : 1) * 0.5,
            }}
            transition={{ 
              delay: img.delay,
              x: { duration: 0.3 },
              y: { duration: 0.3 },
            }}
            className="absolute w-24 h-24 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            style={{
              top: `${20 + (i * 15)}%`,
              left: i < 2 ? `${5 + (i * 5)}%` : 'auto',
              right: i >= 2 ? `${5 + ((i-2) * 5)}%` : 'auto',
              transform: `rotate(${(i - 1.5) * 5}deg)`,
            }}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="gold" className="mb-8 px-5 py-2.5 text-sm">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            IA de última geração • 500+ Estilos Cinematográficos
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
        >
          <span className="text-white block">Seu Rosto.</span>
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Nível Hollywood.
            </span>
            {/* Underline decoration */}
            <motion.svg
              className="absolute -bottom-2 left-0 w-full h-4"
              viewBox="0 0 300 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.path
                d="M0 6 Q 75 0, 150 6 T 300 6"
                fill="none"
                stroke="url(#gold-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Transforme qualquer selfie em uma foto <span className="text-white">cinematográfica profissional</span> com IA.
          <br className="hidden sm:block" />
          Qualidade <span className="text-amber-400">8K</span>, iluminação perfeita, resultados em <span className="text-amber-400">segundos</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/upload">
            <Button 
              size="xl" 
              variant="gold"
              className="group text-lg px-8"
              rightIcon={
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              }
            >
              Começar Grátis
            </Button>
          </Link>
          <Button 
            size="xl" 
            variant="outline"
            className="group text-lg"
            leftIcon={
              <motion.span
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-2"
                whileHover={{ scale: 1.1 }}
              >
                <Play className="w-4 h-4 ml-0.5" />
              </motion.span>
            }
          >
            Ver Demonstração
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                {stat.value}
                {stat.icon && <stat.icon className="w-6 h-6 text-amber-400 fill-amber-400" />}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
