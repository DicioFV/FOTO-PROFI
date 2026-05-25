// src/components/home/StylesShowcase.tsx
// CINEVISION AI — STYLES SHOWCASE SECTION

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button, Badge } from '../ui';

const styleCategories = [
  {
    id: 'cinematic',
    name: 'Cinematográfico',
    emoji: '🎬',
    color: 'from-amber-500 to-orange-600',
    styles: ['Hollywood Portrait', 'Film Noir', 'Blade Runner', 'Golden Hour'],
  },
  {
    id: 'social',
    name: 'Redes Sociais',
    emoji: '📱',
    color: 'from-pink-500 to-rose-600',
    styles: ['Instagram Glow', 'YouTube Thumbnail', 'TikTok Viral', 'LinkedIn Pro'],
  },
  {
    id: 'artistic',
    name: 'Artístico',
    emoji: '🎨',
    color: 'from-violet-500 to-purple-600',
    styles: ['Pop Art', 'Oil Painting', 'Anime Style', 'Renaissance'],
  },
  {
    id: 'professional',
    name: 'Profissional',
    emoji: '💼',
    color: 'from-blue-500 to-cyan-600',
    styles: ['Corporate Headshot', 'Executive Portrait', 'Author Photo', 'Speaker Profile'],
  },
  {
    id: 'fantasy',
    name: 'Fantasia',
    emoji: '✨',
    color: 'from-emerald-500 to-teal-600',
    styles: ['Ethereal Glow', 'Dark Fantasy', 'Sci-Fi Hero', 'Mythical Creature'],
  },
  {
    id: 'vintage',
    name: 'Vintage',
    emoji: '📷',
    color: 'from-yellow-600 to-amber-700',
    styles: ['70s Retro', 'Polaroid', 'Black & White', 'Sepia Classic'],
  },
];

const showcaseImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
];

export function StylesShowcase() {
  const [activeCategory, setActiveCategory] = useState('cinematic');
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            500+ Estilos Disponíveis
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Estilos para <span className="text-amber-400">Toda Ocasião</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            De retratos cinematográficos a thumbnails de YouTube, 
            encontre o estilo perfeito para você.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white hover:bg-black transition-colors lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white hover:bg-black transition-colors lg:hidden"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-4 lg:justify-center"
          >
            {styleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Styles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {showcaseImages.map((img, i) => {
              const category = styleCategories.find(c => c.id === activeCategory);
              const styleName = category?.styles[i % category.styles.length] || 'Style';
              
              return (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={img}
                    alt={styleName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity`} />
                  
                  {/* Colored overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-0 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-medium text-white">{styleName}</p>
                    <p className="text-xs text-gray-400">{category?.name}</p>
                  </div>

                  {/* New badge for some */}
                  {i === 2 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="gold" size="sm">Novo</Badge>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/styles">
            <Button variant="outline" size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
              Explorar Todos os Estilos
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default StylesShowcase;
