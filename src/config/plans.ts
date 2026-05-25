// src/config/plans.ts
// CINEVISION AI — PLANOS E PREÇOS

export interface Plan {
  name: string;
  credits: number;
  price: number;
  priceYearly?: number;
  resolution: string;
  features: string[];
  limitations?: {
    watermark: boolean;
    maxResolution: string;
    styles: number;
    priority: 'low' | 'normal' | 'high' | 'ultra';
  };
  popular?: boolean;
}

export const plansConfig: Record<string, Plan> = {
  free: {
    name:       'Free',
    credits:    5,
    price:      0,
    resolution: '512x512',
    features: [
      '5 créditos grátis',
      'Resolução básica',
      '10 estilos disponíveis',
      'Download com marca d\'água',
    ],
    limitations: {
      watermark:     true,
      maxResolution: '512x512',
      styles:        10,
      priority:      'low',
    }
  },
  
  starter: {
    name:         'Starter',
    credits:      50,
    price:        19.90,
    priceYearly:  179.00,
    resolution:   '1024x1024',
    features: [
      '50 créditos/mês',
      'Resolução Full HD',
      '50+ estilos',
      'Sem marca d\'água',
      'Download PNG/JPG',
    ],
    limitations: {
      watermark:     false,
      maxResolution: '1024x1024',
      styles:        50,
      priority:      'normal',
    }
  },
  
  pro: {
    name:         'Pro',
    credits:      200,
    price:        49.90,
    priceYearly:  449.00,
    resolution:   '2048x2048',
    popular:      true,
    features: [
      '200 créditos/mês',
      'Resolução 2K',
      '200+ estilos premium',
      'Sem marca d\'água',
      'Download todos formatos',
      'Upscale 4K incluído',
      'Geração prioritária',
      'API básica',
    ],
  },
  
  agency: {
    name:         'Agency',
    credits:      1000,
    price:        149.90,
    priceYearly:  1349.00,
    resolution:   '4096x4096',
    features: [
      '1000 créditos/mês',
      'Resolução 4K/8K',
      'Todos os estilos',
      'White-label opcional',
      'API completa',
      'Geração em lote',
      'Dashboard analytics',
      'Suporte prioritário',
      '5 usuários incluídos',
    ],
  },
};

export default plansConfig;
