// src/pages/PricingPage.tsx
// CINEVISION AI — PRICING PAGE

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, Crown, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button, Card, Badge, Switch, Accordion } from '../components/ui';
import { cn } from '../lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Experimente grátis',
    price: { monthly: 0, yearly: 0 },
    credits: 5,
    features: [
      { text: '5 créditos grátis', included: true },
      { text: 'Resolução 512×512', included: true },
      { text: '10 estilos básicos', included: true },
      { text: 'Download com marca d\'água', included: true },
      { text: 'Sem marca d\'água', included: false },
      { text: 'Upscale', included: false },
      { text: 'API', included: false },
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Para uso pessoal',
    price: { monthly: 19.90, yearly: 179 },
    credits: 50,
    features: [
      { text: '50 créditos/mês', included: true },
      { text: 'Resolução até 1K', included: true },
      { text: '50+ estilos', included: true },
      { text: 'Sem marca d\'água', included: true },
      { text: 'Download PNG/JPG', included: true },
      { text: 'Upscale 2x', included: true },
      { text: 'API', included: false },
    ],
    cta: 'Assinar Starter',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para criadores',
    price: { monthly: 49.90, yearly: 449 },
    credits: 200,
    features: [
      { text: '200 créditos/mês', included: true },
      { text: 'Resolução até 2K', included: true },
      { text: '200+ estilos premium', included: true },
      { text: 'Sem marca d\'água', included: true },
      { text: 'Todos os formatos', included: true },
      { text: 'Upscale 4K', included: true },
      { text: 'Geração prioritária', included: true },
      { text: 'API básica', included: true },
    ],
    cta: 'Assinar Pro',
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Para equipes',
    price: { monthly: 149.90, yearly: 1349 },
    credits: 1000,
    features: [
      { text: '1000 créditos/mês', included: true },
      { text: 'Resolução até 8K', included: true },
      { text: 'Todos os estilos', included: true },
      { text: 'White-label', included: true },
      { text: 'API completa', included: true },
      { text: 'Geração em lote', included: true },
      { text: '5 usuários', included: true },
      { text: 'Suporte prioritário', included: true },
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

const faqs = [
  { value: 'q1', title: 'Posso cancelar a qualquer momento?', content: 'Sim! Você pode cancelar sua assinatura a qualquer momento. Seus créditos restantes continuam válidos até o fim do período pago.' },
  { value: 'q2', title: 'Os créditos acumulam?', content: 'Créditos não utilizados não acumulam para o mês seguinte. Cada renovação reseta seu saldo para o total do plano.' },
  { value: 'q3', title: 'Posso fazer upgrade ou downgrade?', content: 'Sim! Você pode mudar de plano a qualquer momento. O valor será calculado proporcionalmente (pro-rata).' },
  { value: 'q4', title: 'O que é marca d\'água?', content: 'No plano Free, as imagens exportadas possuem uma pequena marca d\'água do CineVision AI. Nos planos pagos, as imagens são limpas.' },
  { value: 'q5', title: 'Como funciona a API?', content: 'Os planos Pro e Agency incluem acesso à API REST para integrar o CineVision em suas aplicações. Documentação completa disponível.' },
  { value: 'q6', title: 'Aceitam quais formas de pagamento?', content: 'Cartão de crédito, débito, PIX e boleto via Stripe. Pagamentos recorrentes apenas em cartão.' },
];

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="gold" className="mb-4"><Zap className="w-4 h-4 mr-1" />Planos Flexíveis</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Escolha o Plano <span className="text-amber-400">Perfeito</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Comece grátis, escale conforme precisar. Todos os planos incluem acesso a estilos cinematográficos de nível mundial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn('text-sm font-medium', !isYearly ? 'text-white' : 'text-gray-500')}>Mensal</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={cn('text-sm font-medium', isYearly ? 'text-white' : 'text-gray-500')}>
              Anual
              <Badge variant="success" size="sm" className="ml-2">Economize 25%</Badge>
            </span>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan, i) => {
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const monthlyPrice = isYearly && plan.price.yearly > 0 ? (plan.price.yearly / 12) : plan.price.monthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="gold" className="shadow-lg shadow-amber-500/30 px-4 py-1">
                      <Crown className="w-3 h-3 mr-1" />Mais Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={cn(
                    'h-full flex flex-col',
                    plan.popular ? 'border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent' : ''
                  )}
                  padding="lg"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {price === 0 ? (
                      <span className="text-4xl font-bold text-white">Grátis</span>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-gray-500">R$</span>
                          <span className="text-4xl font-bold text-white">{monthlyPrice.toFixed(2).replace('.', ',')}</span>
                          <span className="text-gray-500">/mês</span>
                        </div>
                        {isYearly && price > 0 && (
                          <p className="text-sm text-emerald-400 mt-1">R${price.toFixed(2).replace('.', ',')} /ano</p>
                        )}
                      </div>
                    )}
                    <p className="text-sm text-amber-400 mt-2">
                      <Sparkles className="w-3 h-3 inline mr-1" />{plan.credits} créditos{price > 0 ? '/mês' : ''}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-3">
                        {f.included ? (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        )}
                        <span className={cn('text-sm', f.included ? 'text-gray-300' : 'text-gray-600')}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to={price === 0 ? '/register' : '/login'}>
                    <Button variant={plan.popular ? 'gold' : 'outline'} className="w-full" size="lg">
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-400">Tudo o que você precisa saber sobre nossos planos</p>
          </div>
          <Accordion items={faqs} />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">Tem mais perguntas?</p>
          <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>Falar com Suporte</Button>
        </motion.div>
      </div>
    </div>
  );
}

export default PricingPage;
