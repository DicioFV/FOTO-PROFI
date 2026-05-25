// src/components/home/BeforeAfterShowcase.tsx
// CINEVISION AI — BEFORE/AFTER INTERACTIVE SHOWCASE

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '../ui';
import { BeforeAfterSlider } from '../editor';

const transformations = [
  {
    id: 1,
    style: 'Hollywood Portrait',
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
    category: 'Cinematográfico',
  },
  {
    id: 2,
    style: 'Corporate Pro',
    before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
    after: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
    category: 'Profissional',
  },
  {
    id: 3,
    style: 'Cyberpunk Neon',
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
    after: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600',
    category: 'Artístico',
  },
];

export function BeforeAfterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTransformation = transformations[activeIndex];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            Transformação Real
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Veja a <span className="text-amber-400">Magia</span> Acontecer
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Arraste para comparar o antes e depois. Cada transformação preserva sua identidade
            com qualidade cinematográfica.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <BeforeAfterSlider
                beforeImage={activeTransformation.before}
                afterImage={activeTransformation.after}
                beforeLabel="Original"
                afterLabel={activeTransformation.style}
                className="aspect-[4/5] max-w-lg mx-auto"
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-transparent to-violet-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <Badge variant="default" className="mb-4">
                {activeTransformation.category}
              </Badge>
              <h3 className="text-3xl font-bold text-white mb-4">
                {activeTransformation.style}
              </h3>
              <p className="text-gray-400 text-lg">
                Transformação cinematográfica completa com iluminação profissional,
                correção de cores e tratamento de pele natural que preserva
                suas características únicas.
              </p>
            </div>

            {/* Style Selector */}
            <div className="flex flex-wrap gap-3">
              {transformations.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    i === activeIndex
                      ? 'bg-amber-500 text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {t.style}
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Preservação Facial', value: '99%' },
                { label: 'Tempo de Processo', value: '~8s' },
                { label: 'Resolução', value: 'Até 8K' },
                { label: 'Qualidade', value: 'Ultra HD' },
              ].map((feature) => (
                <div key={feature.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-2xl font-bold text-amber-400">{feature.value}</p>
                  <p className="text-sm text-gray-500">{feature.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/upload">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Transformar Minha Foto
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterShowcase;
