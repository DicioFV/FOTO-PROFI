// src/config/styles-catalog.ts
// CINEVISION AI — CATÁLOGO DE ESTILOS

export interface StyleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  styles: Style[];
}

export interface Style {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  negativePrompt: string;
  category: string;
  tags: string[];
  minPlan: 'free' | 'starter' | 'pro' | 'agency';
  creditsCost: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const styleCategories: StyleCategory[] = [
  {
    id: 'cinematic',
    name: 'Cinematográfico',
    description: 'Estilos de cinema hollywoodiano',
    icon: '🎬',
    styles: [
      {
        id: 'hollywood-portrait',
        name: 'Hollywood Portrait',
        description: 'Retrato estilo grandes produções de cinema',
        basePrompt: 'cinematic hollywood portrait, dramatic lighting, movie poster quality, professional photography, 8K resolution, sharp focus, Rembrandt lighting',
        negativePrompt: 'blurry, low quality, amateur, cartoon, anime',
        category: 'cinematic',
        tags: ['portrait', 'dramatic', 'professional'],
        minPlan: 'free',
        creditsCost: 1,
        isFeatured: true,
      },
      {
        id: 'film-noir',
        name: 'Film Noir',
        description: 'Estética clássica do cinema noir',
        basePrompt: 'film noir style, black and white, dramatic shadows, high contrast, 1940s aesthetic, moody atmosphere, detective movie',
        negativePrompt: 'color, bright, cheerful, cartoon',
        category: 'cinematic',
        tags: ['noir', 'dramatic', 'vintage'],
        minPlan: 'starter',
        creditsCost: 1,
      },
      {
        id: 'blade-runner',
        name: 'Blade Runner',
        description: 'Cyberpunk neon futurista',
        basePrompt: 'cyberpunk style, neon lights, rain, futuristic city, blade runner aesthetic, cinematic, purple and blue tones, dramatic',
        negativePrompt: 'natural lighting, daytime, cartoon',
        category: 'cinematic',
        tags: ['cyberpunk', 'neon', 'futuristic'],
        minPlan: 'pro',
        creditsCost: 2,
        isNew: true,
      },
    ]
  },
  {
    id: 'social',
    name: 'Redes Sociais',
    description: 'Otimizado para cada plataforma',
    icon: '📱',
    styles: [
      {
        id: 'instagram-influencer',
        name: 'Instagram Influencer',
        description: 'Estética perfeita para Instagram',
        basePrompt: 'instagram influencer photo, perfect lighting, lifestyle photography, warm tones, professional quality, bokeh background',
        negativePrompt: 'bad lighting, amateur, grainy',
        category: 'social',
        tags: ['instagram', 'lifestyle', 'influencer'],
        minPlan: 'free',
        creditsCost: 1,
      },
      {
        id: 'youtube-thumbnail',
        name: 'YouTube Thumbnail',
        description: 'Impacto visual para thumbnails',
        basePrompt: 'youtube thumbnail style, high contrast, bold colors, expressive face, eye-catching, professional photography, dramatic lighting',
        negativePrompt: 'boring, low contrast, dull colors',
        category: 'social',
        tags: ['youtube', 'thumbnail', 'bold'],
        minPlan: 'starter',
        creditsCost: 1,
        isFeatured: true,
      },
      {
        id: 'linkedin-professional',
        name: 'LinkedIn Professional',
        description: 'Foto corporativa profissional',
        basePrompt: 'professional corporate headshot, clean background, business attire, confident expression, studio lighting, high quality',
        negativePrompt: 'casual, unprofessional, distracting background',
        category: 'social',
        tags: ['linkedin', 'corporate', 'professional'],
        minPlan: 'free',
        creditsCost: 1,
      },
    ]
  },
  {
    id: 'artistic',
    name: 'Artístico',
    description: 'Estilos artísticos únicos',
    icon: '🎨',
    styles: [
      {
        id: 'oil-painting',
        name: 'Oil Painting',
        description: 'Pintura a óleo clássica',
        basePrompt: 'oil painting portrait, classical art style, brush strokes visible, museum quality, renaissance inspired, masterpiece',
        negativePrompt: 'photo, digital, modern',
        category: 'artistic',
        tags: ['painting', 'classical', 'art'],
        minPlan: 'pro',
        creditsCost: 2,
      },
      {
        id: 'pop-art',
        name: 'Pop Art',
        description: 'Estilo Andy Warhol',
        basePrompt: 'pop art portrait, Andy Warhol style, bold colors, halftone dots, graphic design, vibrant, artistic',
        negativePrompt: 'realistic, photographic, muted colors',
        category: 'artistic',
        tags: ['pop-art', 'warhol', 'colorful'],
        minPlan: 'starter',
        creditsCost: 1,
      },
    ]
  },
];

export default styleCategories;
