// src/data/roadmap.ts
// CINEVISION AI — ROADMAP COMPLETO DAS 20 FASES

import type { Phase } from '../types';

export const roadmap: Phase[] = [
  {
    number: 1,
    name: 'Planejamento Supremo',
    description: 'Arquitetura completa, estrutura, stack e roadmap',
    deliverable: 'Arquitetura completa',
    status: 'completed',
    progress: 100,
  },
  {
    number: 2,
    name: 'Setup & Fundação Técnica',
    description: 'Projeto rodando do zero no GitHub/Vercel',
    deliverable: 'Projeto rodando',
    status: 'pending',
    progress: 0,
  },
  {
    number: 3,
    name: 'Design System & UI Base',
    description: 'Componentes base do sistema de design',
    deliverable: 'Componentes base',
    status: 'pending',
    progress: 0,
  },
  {
    number: 4,
    name: 'Home Page Cinematográfica',
    description: 'Landing page impactante com animações',
    deliverable: 'Landing impactante',
    status: 'pending',
    progress: 0,
  },
  {
    number: 5,
    name: 'Sistema de Auth',
    description: 'Login, registro e autenticação completa',
    deliverable: 'Login/Register',
    status: 'pending',
    progress: 0,
  },
  {
    number: 6,
    name: 'Dashboard Principal',
    description: 'Área do usuário logado',
    deliverable: 'Área do usuário',
    status: 'pending',
    progress: 0,
  },
  {
    number: 7,
    name: 'Upload & Câmera',
    description: 'Sistema de upload e captura de câmera',
    deliverable: 'Sistema de upload',
    status: 'pending',
    progress: 0,
  },
  {
    number: 8,
    name: 'Editor IA — Core',
    description: 'Motor de geração de imagens com IA',
    deliverable: 'Geração de imagens',
    status: 'pending',
    progress: 0,
  },
  {
    number: 9,
    name: 'Catálogo de Estilos',
    description: 'Biblioteca com 500+ estilos cinematográficos',
    deliverable: '500+ estilos',
    status: 'pending',
    progress: 0,
  },
  {
    number: 10,
    name: 'Estúdios Especializados',
    description: 'Estúdios otimizados por plataforma',
    deliverable: 'Por plataforma',
    status: 'pending',
    progress: 0,
  },
  {
    number: 11,
    name: 'Sistema de Exportação',
    description: 'Exportação multi-formato e resoluções',
    deliverable: 'Multi-formato',
    status: 'pending',
    progress: 0,
  },
  {
    number: 12,
    name: 'Histórico & Galeria',
    description: 'Galeria pessoal do usuário',
    deliverable: 'Galeria pessoal',
    status: 'pending',
    progress: 0,
  },
  {
    number: 13,
    name: 'Sistema de Créditos',
    description: 'Economia da plataforma',
    deliverable: 'Economia da plat.',
    status: 'pending',
    progress: 0,
  },
  {
    number: 14,
    name: 'Pagamentos & Planos',
    description: 'Integração Stripe completa',
    deliverable: 'Stripe integrado',
    status: 'pending',
    progress: 0,
  },
  {
    number: 15,
    name: 'PWA — App Nativo',
    description: 'App instalável mobile/desktop',
    deliverable: 'Instalável mobile',
    status: 'pending',
    progress: 0,
  },
  {
    number: 16,
    name: 'Integrações de IA',
    description: 'Multi-provider de IA com fallback',
    deliverable: 'Multi-provider',
    status: 'pending',
    progress: 0,
  },
  {
    number: 17,
    name: 'Galeria Pública & Social',
    description: 'Comunidade e compartilhamento',
    deliverable: 'Comunidade',
    status: 'pending',
    progress: 0,
  },
  {
    number: 18,
    name: 'API Pública & Webhooks',
    description: 'API para desenvolvedores e agências',
    deliverable: 'Para devs/agências',
    status: 'pending',
    progress: 0,
  },
  {
    number: 19,
    name: 'Analytics & Admin Dashboard',
    description: 'Painel administrativo completo',
    deliverable: 'Painel admin',
    status: 'pending',
    progress: 0,
  },
  {
    number: 20,
    name: 'Performance, SEO & Launch',
    description: 'Otimização final para produção',
    deliverable: 'Produção final',
    status: 'pending',
    progress: 0,
  },
];

export const architectureComponents = [
  {
    name: 'FRONTEND',
    technologies: ['Next.js 14', 'React 18', 'TailwindCSS', 'Framer Motion'],
    description: 'Interface responsiva e animada',
  },
  {
    name: 'BACKEND',
    technologies: ['Node.js', 'Edge API', 'REST+WS', 'Queue'],
    description: 'API robusta com processamento assíncrono',
  },
  {
    name: 'IA PIPELINE',
    technologies: ['Orchestrator', 'Multi-Model', 'Prompt Engine', 'Quality Control'],
    description: 'Orquestração inteligente de múltiplos modelos',
  },
  {
    name: 'PWA',
    technologies: ['Manifest', 'SW Cache', 'Push Notif'],
    description: 'App nativo sem app store',
  },
  {
    name: 'DATABASE',
    technologies: ['Supabase', 'PostgreSQL', 'Redis'],
    description: 'Dados estruturados e cache',
  },
  {
    name: 'STORAGE & CDN',
    technologies: ['Cloudflare R2', 'Vercel Blob', 'Edge Delivery'],
    description: 'Entrega global otimizada',
  },
];

export const folderStructure = `
cinevision-ai/
├── .github/
│   └── workflows/
├── public/
│   ├── icons/
│   ├── splash/
│   ├── fonts/
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── (studio)/
│   │   ├── (marketing)/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── upload/
│   │   ├── editor/
│   │   └── gallery/
│   ├── lib/
│   │   ├── ai/
│   │   ├── integrations/
│   │   ├── storage/
│   │   └── auth/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   └── config/
├── database/
│   ├── migrations/
│   └── seeds/
└── docs/
`;

export default roadmap;
