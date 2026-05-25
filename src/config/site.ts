// src/config/site.ts
// CINEVISION AI — CONFIGURAÇÕES DO SITE

export const siteConfig = {
  name:        'CineVision AI',
  tagline:     'Transform. Elevate. Cinematic.',
  description: 'Transforme qualquer selfie em uma foto cinematográfica profissional com IA. Qualidade Hollywood em segundos.',
  url:         'https://cinevision.ai',
  
  social: {
    instagram: '@cinevisionai',
    youtube:   '@cinevisionai',
    tiktok:    '@cinevisionai',
  },
  
  contact: {
    email:   'hello@cinevision.ai',
    support: 'support@cinevision.ai',
  },
  
  seo: {
    defaultTitle:    'CineVision AI — Fotos Cinematográficas com IA',
    titleTemplate:   '%s | CineVision AI',
    defaultDesc:     'Transforme selfies em fotos estilo Hollywood com IA. Qualidade 8K, iluminação cinematográfica, resultados em segundos.',
    keywords: [
      'foto com IA', 'selfie profissional', 'foto cinematográfica',
      'IA foto', 'transformar foto', 'foto estilo hollywood',
      'foto profissional IA', 'editar foto IA', 'foto youtube',
      'foto instagram profissional', 'foto 8k IA'
    ],
  },
  
  limits: {
    maxFileSizeMB:    10,
    maxImageWidth:    4096,
    maxImageHeight:   4096,
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

export default siteConfig;
