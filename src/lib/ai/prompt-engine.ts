// src/lib/ai/prompt-engine.ts
// CINEVISION AI — MOTOR DE PROMPTS CINEMATOGRÁFICOS

export interface PromptContext {
  userInput:       string;
  styleId:         string;
  platform:        string;
  aspectRatio:     string;
  qualityLevel:    'standard' | 'high' | 'ultra';
  faceDetected?:   boolean;
  skinTone?:       string;
}

export interface GeneratedPrompt {
  positive:   string;
  negative:   string;
  parameters: Record<string, number | string>;
}

// Bases de qualidade cinematográfica
const QUALITY_BASES: Record<string, string> = {
  ultra: [
    'ultra realistic photography',
    'cinematic 8K resolution',
    'shot on ARRI Alexa 65',
    'Zeiss Supreme Prime lenses',
    'professional studio lighting',
    'Hollywood cinematography',
    'award-winning photography',
    'hyper-detailed skin texture',
    'perfect composition',
    'Rembrandt lighting setup',
    'professional color grading',
    'emotional depth',
    'premium visual storytelling',
  ].join(', '),
  
  high: [
    'professional photography',
    'cinematic quality',
    '4K resolution',
    'DSLR camera',
    'studio lighting',
    'sharp focus',
    'high detail',
  ].join(', '),
  
  standard: [
    'professional photo',
    'good lighting',
    'clear focus',
    'high quality',
  ].join(', '),
};

// Negativos universais
const UNIVERSAL_NEGATIVES = [
  'blurry', 'low quality', 'pixelated', 'distorted face',
  'deformed', 'ugly', 'bad anatomy', 'watermark', 'text',
  'logo', 'amateur photography', 'overexposed', 'underexposed',
  'noise', 'grain', 'artifacts', 'cartoon', 'anime',
  'illustration', 'painting', 'drawing', 'sketch',
].join(', ');

// Modificadores por plataforma
const PLATFORM_MODIFIERS: Record<string, string> = {
  instagram:  'vertical portrait 4:5, vibrant colors, lifestyle photography',
  youtube:    'professional thumbnail, bold composition, 16:9 horizontal',
  facebook:   'engaging portrait, warm tones, social media optimized',
  tiktok:     'vertical 9:16, dynamic composition, youth aesthetic',
  spotify:    'album cover aesthetic, artistic, square format, moody',
  linkedin:   'professional corporate, clean background, authoritative',
  poster:     'movie poster quality, dramatic, cinematic composition',
  thumbnail:  'high contrast, eye-catching, bold, professional',
};

// Aspect ratios suportados
export const ASPECT_RATIOS = {
  'square':     { width: 1024, height: 1024, label: '1:1 Square' },
  'portrait':   { width: 768,  height: 1024, label: '3:4 Portrait' },
  'landscape':  { width: 1024, height: 768,  label: '4:3 Landscape' },
  'instagram':  { width: 864,  height: 1080, label: '4:5 Instagram' },
  'youtube':    { width: 1280, height: 720,  label: '16:9 YouTube' },
  'tiktok':     { width: 576,  height: 1024, label: '9:16 TikTok' },
  'poster':     { width: 768,  height: 1152, label: '2:3 Poster' },
};

/**
 * Constrói um prompt cinematográfico otimizado
 */
export function buildCinematicPrompt(context: PromptContext): GeneratedPrompt {
  const {
    userInput,
    platform,
    qualityLevel = 'ultra',
    faceDetected = true,
  } = context;

  // Base de qualidade
  const qualityBase = QUALITY_BASES[qualityLevel];
  
  // Modificador de plataforma
  const platformMod = PLATFORM_MODIFIERS[platform] || '';
  
  // Face preservation
  const faceBase = faceDetected
    ? 'perfect facial features, natural skin texture, expressive eyes, professional retouching, photorealistic face'
    : '';
  
  // Construir prompt positivo
  const positive = [
    userInput,
    qualityBase,
    faceBase,
    platformMod,
    'masterpiece',
    'best quality',
    'intricate details',
    'sharp focus',
    'professional retouching',
  ].filter(Boolean).join(', ');
  
  // Prompt negativo
  const negative = [
    UNIVERSAL_NEGATIVES,
    faceDetected ? 'extra limbs, deformed hands, bad fingers, missing fingers' : '',
  ].filter(Boolean).join(', ');
  
  return {
    positive,
    negative,
    parameters: {
      guidance_scale:       7.5,
      num_inference_steps:  qualityLevel === 'ultra' ? 50 : 30,
      scheduler:            'DPMSolverMultistepScheduler',
      strength:             0.75,
    },
  };
}

/**
 * Otimiza prompt para preservação facial
 */
export function buildFacePreservationPrompt(basePrompt: string): string {
  return `${basePrompt}, same person, identical facial features, same face structure, same eyes, same nose, same lips, consistent identity, face preservation`;
}

/**
 * Gera prompt para upscaling
 */
export function buildUpscalePrompt(): GeneratedPrompt {
  return {
    positive: 'ultra high resolution, 8K, sharp details, enhanced clarity, professional quality, noise reduction',
    negative: 'blurry, pixelated, artifacts, noise, low quality',
    parameters: {
      scale: 4,
      denoise: 0.2,
    },
  };
}

export default {
  buildCinematicPrompt,
  buildFacePreservationPrompt,
  buildUpscalePrompt,
  ASPECT_RATIOS,
  QUALITY_BASES,
  PLATFORM_MODIFIERS,
};
