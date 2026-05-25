// src/components/home/PricingPreview.tsx
// CINEVISION AI — PRICING PREVIEW SECTION

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Crown, Zap, ArrowRight } from 'lucide-react';
import { Button, Badge, Card } from '../ui';

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 5,
    description: 'Perfeito para experimentar',
    features: [
      '5 créditos grátis',
      'Resolução 512×512',
      '10 estilos básicos',
      'Download com marca d\'água',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 49.90,
    credits: 200,
    description: 'Para criadores de conteúdo',
    features: [
      '200 créditos/mês',
      'Resolução até 2K',
      '200+ estilos premium',
      'Sem marca d\'água',
      'Upscale 4K incluído',
      'Geração prioritária',
    ],
    cta: 'Assinar Pro',
    popular: true,
    badge: 'Mais Popular',
  },
  {
    name: 'Agency',
    price: 149.90,
    credits: 1000,
    description: 'Para equipes e agências',
    features: [
      '1000 créditos/mês',
      'Resolução até 8K',
      'Todos os estilos',
      'API completa',
      'White-label opcional',
      '5 usuários incluídos',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

export function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-4">
            <Zap className="w-4 h-4 mr-1" />
            Planos Flexíveis
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Escolha Seu <span className="text-amber-400">Plano</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando precisar. 
            Cancele a qualquer momento.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="gold" className="shadow-lg shadow-amber-500/20">
                    <Crown className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <Card
                variant={plan.popular ? 'gradient' : 'default'}
                className={`h-full p-8 ${
                  plan.popular
                    ? 'border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent'
                    : ''
                }`}
              >
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-4xl font-bold text-white">Grátis</span>
                    ) : (
                      <>
                        <span className="text-lg text-gray-500">R$</span>
                        <span className="text-4xl font-bold text-white">{plan.price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-gray-500">/mês</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-amber-400 mt-1">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {plan.credits} créditos
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to={plan.price === 0 ? '/register' : '/pricing'} className="block">
                  <Button
                    variant={plan.popular ? 'gold' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/pricing">
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Comparar todos os planos em detalhes
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingPreview;
