// src/config/ai-models.ts
// CINEVISION AI — CONFIGURAÇÃO DOS MODELOS DE IA

export interface AIModel {
  id: string;
  name: string;
  provider: 'fal' | 'replicate' | 'openai' | 'stability';
  quality: 'standard' | 'high' | 'ultra';
  speed: 'fast' | 'medium' | 'slow';
  cost: number;
  maxResolution: string;
  description: string;
}

export const aiModels: Record<string, AIModel> = {
  
  // Modelo principal — Flux Pro (Fal.ai)
  primary: {
    id:       'fal-ai/flux-pro',
    name:     'Flux Pro',
    provider: 'fal',
    quality:  'ultra',
    speed:    'medium', // ~8-15s
    cost:     2,        // créditos por geração
    maxResolution: '1440x1440',
    description: 'Máxima qualidade fotorrealista',
  },
  
  // Modelo rápido — Flux Schnell
  fast: {
    id:       'fal-ai/flux/schnell',
    name:     'Flux Schnell',
    provider: 'fal',
    quality:  'high',
    speed:    'fast', // ~2-4s
    cost:     1,
    maxResolution: '1024x1024',
    description: 'Alta qualidade, ultra rápido',
  },
  
  // Modelo Face — Consistent Face
  portrait: {
    id:       'fal-ai/face-to-many',
    name:     'Portrait Master',
    provider: 'fal',
    quality:  'ultra',
    speed:    'slow', // ~15-30s
    cost:     3,
    maxResolution: '1024x1024',
    description: 'Preservação facial máxima',
  },
  
  // Upscale — 8K
  upscale: {
    id:       'fal-ai/clarity-upscaler',
    name:     'Clarity 8K',
    provider: 'fal',
    quality:  'ultra',
    speed:    'medium',
    cost:     2,
    maxResolution: '4096x4096',
    description: 'Upscale para 8K real',
  },
  
  // Fallback — Replicate SDXL
  fallback: {
    id:       'stability-ai/sdxl',
    name:     'SDXL',
    provider: 'replicate',
    quality:  'high',
    speed:    'medium',
    cost:     1,
    maxResolution: '1024x1024',
    description: 'Fallback confiável',
  },
};

export default aiModels;
