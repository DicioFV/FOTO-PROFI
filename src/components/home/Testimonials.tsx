// src/components/home/Testimonials.tsx
// CINEVISION AI — TESTIMONIALS CAROUSEL

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Avatar, Badge } from '../ui';

const testimonials = [
  {
    id: 1,
    name: 'Ana Carolina Silva',
    role: 'YouTuber • 1.2M inscritos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    content: 'Minhas thumbnails nunca tiveram tantos cliques! O CineVision transformou completamente a qualidade visual do meu canal. Recomendo demais!',
    rating: 5,
    platform: 'YouTube',
  },
  {
    id: 2,
    name: 'Rafael Mendes',
    role: 'Fotógrafo Profissional',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    content: 'Como fotógrafo, sou muito exigente com qualidade. O CineVision me impressionou com a preservação facial e a qualidade 8K. Uso diariamente!',
    rating: 5,
    platform: 'Profissional',
  },
  {
    id: 3,
    name: 'Juliana Costa',
    role: 'Influenciadora Digital • 500K seguidores',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    content: 'Meu feed do Instagram nunca ficou tão bonito! Os estilos são incríveis e o resultado parece que fiz uma sessão de fotos profissional.',
    rating: 5,
    platform: 'Instagram',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    role: 'CEO • Startup Tech',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    content: 'Precisava de fotos profissionais para o LinkedIn urgente. Em 5 minutos tinha resultados melhores que estúdios que cobram fortunas.',
    rating: 5,
    platform: 'LinkedIn',
  },
  {
    id: 5,
    name: 'Mariana Santos',
    role: 'Designer Gráfica',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    content: 'A variedade de estilos é impressionante! Do cinematográfico ao artístico, sempre encontro o que preciso para meus projetos.',
    rating: 5,
    platform: 'Criativo',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-4">
            <Star className="w-4 h-4 mr-1 fill-current" />
            4.9/5 de 50K+ avaliações
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Amado por <span className="text-amber-400">Criadores</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Veja o que nossos usuários estão dizendo sobre suas transformações.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Quote icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="w-16 h-16 text-amber-500/20" />
          </div>

          {/* Card */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 min-h-[300px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <Avatar
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  size="xl"
                  className="mb-6"
                />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 max-w-2xl">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-white text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>

                {/* Platform Badge */}
                <Badge variant="default" className="mt-4">
                  {testimonials[currentIndex].platform}
                </Badge>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-8 bg-amber-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
