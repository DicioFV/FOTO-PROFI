// src/lib/constants.ts
// CINEVISION AI — CONSTANTES GLOBAIS

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP INFO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const APP_NAME = 'CineVision AI';
export const APP_TAGLINE = 'Transform. Elevate. Cinematic.';
export const APP_DESCRIPTION = 'Transforme qualquer selfie em uma foto cinematográfica profissional com IA.';
export const APP_URL = 'https://cinevision.ai';
export const APP_VERSION = '1.0.0';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// IMAGE LIMITS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_IMAGE_WIDTH = 4096;
export const MAX_IMAGE_HEIGHT = 4096;
export const MIN_IMAGE_WIDTH = 256;
export const MIN_IMAGE_HEIGHT = 256;

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESOLUTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const RESOLUTIONS = {
  '512':   { width: 512,  height: 512,  label: '512×512',   plan: 'free' },
  '768':   { width: 768,  height: 768,  label: '768×768',   plan: 'free' },
  '1024':  { width: 1024, height: 1024, label: '1K',        plan: 'starter' },
  '1440':  { width: 1440, height: 1440, label: '1.4K',      plan: 'pro' },
  '2048':  { width: 2048, height: 2048, label: '2K',        plan: 'pro' },
  '4096':  { width: 4096, height: 4096, label: '4K',        plan: 'agency' },
  '8192':  { width: 8192, height: 8192, label: '8K',        plan: 'agency' },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PLATFORMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const PLATFORMS = {
  instagram: {
    name: 'Instagram',
    icon: '📸',
    aspectRatios: ['1:1', '4:5', '9:16'],
    resolutions: ['1080x1080', '1080x1350', '1080x1920'],
  },
  youtube: {
    name: 'YouTube',
    icon: '🎬',
    aspectRatios: ['16:9'],
    resolutions: ['1280x720', '1920x1080', '2560x1440'],
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    aspectRatios: ['9:16'],
    resolutions: ['1080x1920'],
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    aspectRatios: ['1:1', '1.91:1'],
    resolutions: ['1080x1080', '1200x628'],
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    aspectRatios: ['1:1', '16:9', '9:16'],
    resolutions: ['1080x1080', '1200x630', '1080x1920'],
  },
  spotify: {
    name: 'Spotify',
    icon: '🎧',
    aspectRatios: ['1:1'],
    resolutions: ['3000x3000'],
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLE CATEGORIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const STYLE_CATEGORIES = [
  { id: 'cinematic',    name: 'Cinematográfico', icon: '🎬' },
  { id: 'social',       name: 'Redes Sociais',   icon: '📱' },
  { id: 'portrait',     name: 'Retratos',        icon: '👤' },
  { id: 'artistic',     name: 'Artístico',       icon: '🎨' },
  { id: 'commercial',   name: 'Comercial',       icon: '💼' },
  { id: 'fantasy',      name: 'Fantasia',        icon: '✨' },
  { id: 'vintage',      name: 'Vintage',         icon: '📷' },
  { id: 'futuristic',   name: 'Futurista',       icon: '🚀' },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GENERATION STATUS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const GENERATION_STATUS = {
  PENDING:    'pending',
  PROCESSING: 'processing',
  COMPLETED:  'completed',
  FAILED:     'failed',
  CANCELLED:  'cancelled',
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREDIT COSTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const CREDIT_COSTS = {
  generation: {
    basic:    1,
    premium:  2,
    ultra:    3,
  },
  upscale: {
    '2x':     1,
    '4x':     2,
    '8x':     3,
  },
  features: {
    faceSwap:       2,
    styleTransfer:  2,
    batchExport:    1,
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ENDPOINTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const API_ENDPOINTS = {
  auth: {
    login:    '/api/auth/login',
    register: '/api/auth/register',
    logout:   '/api/auth/logout',
    refresh:  '/api/auth/refresh',
  },
  images: {
    upload:    '/api/images/upload',
    generate:  '/api/images/generate',
    transform: '/api/images/transform',
    enhance:   '/api/images/enhance',
    export:    '/api/images/export',
  },
  ai: {
    prompt:        '/api/ai/prompt',
    detectFace:    '/api/ai/detect-face',
    styleTransfer: '/api/ai/style-transfer',
    upscale:       '/api/ai/upscale',
  },
  user: {
    profile:  '/api/user/profile',
    credits:  '/api/user/credits',
    history:  '/api/user/history',
  },
  payments: {
    checkout: '/api/payments/checkout',
    webhook:  '/api/payments/webhook',
    plans:    '/api/payments/plans',
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ERROR MESSAGES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: 'Email ou senha inválidos',
    emailInUse:         'Este email já está em uso',
    sessionExpired:     'Sessão expirada, faça login novamente',
  },
  upload: {
    fileTooLarge:       `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE_MB}MB`,
    invalidFormat:      'Formato não suportado. Use JPG, PNG ou WebP',
    imageTooSmall:      `Imagem muito pequena. Mínimo: ${MIN_IMAGE_WIDTH}×${MIN_IMAGE_HEIGHT}`,
    imageTooLarge:      `Imagem muito grande. Máximo: ${MAX_IMAGE_WIDTH}×${MAX_IMAGE_HEIGHT}`,
  },
  generation: {
    insufficientCredits: 'Créditos insuficientes',
    processingFailed:    'Falha no processamento. Tente novamente.',
    timeout:             'Timeout na geração. Tente novamente.',
  },
  general: {
    networkError:  'Erro de conexão. Verifique sua internet.',
    serverError:   'Erro no servidor. Tente novamente mais tarde.',
    unknownError:  'Erro desconhecido. Tente novamente.',
  },
} as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ANIMATION VARIANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.9 },
  },
} as const;
