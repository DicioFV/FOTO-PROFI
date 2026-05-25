// src/pages/AboutPage.tsx
// CINEVISION AI — ABOUT PAGE

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, Heart, Globe } from 'lucide-react';
import { Button, Badge, Card } from '../components/ui';

const values = [
  { icon: Zap, title: 'Inovação', desc: 'Usamos IA de última geração para transformar fotos comuns em obras cinematográficas.' },
  { icon: Shield, title: 'Privacidade', desc: 'Suas fotos são processadas com segurança e nunca compartilhadas. LGPD compliant.' },
  { icon: Heart, title: 'Acessibilidade', desc: 'Fotografia profissional de nível Hollywood, acessível a qualquer pessoa.' },
  { icon: Globe, title: 'Comunidade', desc: 'Uma comunidade global de criadores transformando o mundo visual.' },
];

const milestones = [
  { year: '2024', event: 'Fundação do CineVision AI' },
  { year: '2024', event: '500K fotos transformadas' },
  { year: '2024', event: '50K usuários ativos' },
  { year: '2025', event: '500+ estilos cinematográficos' },
  { year: '2025', event: 'API pública lançada' },
  { year: '2025', event: '1M fotos/mês processadas' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <Badge variant="gold" className="mb-4"><Sparkles className="w-4 h-4 mr-1" />Nossa História</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Democratizando a <span className="text-amber-400">Fotografia Cinematográfica</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            O CineVision AI nasceu de uma visão simples: toda pessoa merece fotos de nível profissional. 
            Combinamos inteligência artificial de ponta com estética cinematográfica para tornar isso realidade.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <Card padding="lg" hover>
                <v.icon className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nossa Jornada</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm text-amber-400 font-medium">{m.year}</p>
                  <p className="text-white font-medium">{m.event}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-amber-500 border-4 border-[#050507] relative z-10 flex-shrink-0" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
          <p className="text-gray-400 mb-8">Junte-se à revolução da fotografia com IA</p>
          <Link to="/register"><Button variant="gold" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>Começar Grátis</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
