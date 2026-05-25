// src/components/home/HowItWorks.tsx
// CINEVISION AI — HOW IT WORKS SECTION

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Palette, Sparkles, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Faça Upload',
    description: 'Envie sua foto ou tire uma selfie diretamente no app. Funciona com qualquer imagem!',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Escolha o Estilo',
    description: 'Navegue por 500+ estilos cinematográficos ou deixe nossa IA sugerir o melhor para você.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'IA Transforma',
    description: 'Nossa IA de última geração processa sua foto mantendo sua identidade com perfeição.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    number: '04',
    icon: Download,
    title: 'Baixe em 8K',
    description: 'Receba sua foto transformada em alta resolução, pronta para usar em qualquer lugar.',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Como <span className="text-amber-400">Funciona</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transformação cinematográfica em 4 passos simples. 
            Do upload ao download em menos de 30 segundos.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative group"
                >
                  {/* Arrow connector (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-24 -right-4 hidden lg:block z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                      >
                        <ArrowRight className="w-8 h-8 text-white/20" />
                      </motion.div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative p-6 rounded-2xl ${step.bgColor} border ${step.borderColor} hover:border-opacity-50 transition-all duration-300 group-hover:-translate-y-1`}>
                    {/* Number */}
                    <div className="absolute -top-3 -right-3">
                      <span className={`text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link to="/upload">
            <Button variant="gold" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Começar Agora — É Grátis
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            5 créditos grátis • Sem cartão de crédito
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
