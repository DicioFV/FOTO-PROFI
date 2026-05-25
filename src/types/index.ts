// src/types/index.ts
// CINEVISION AI — TIPOS TYPESCRIPT COMPLETOS

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  plan: PlanType;
  credits: number;
  totalCreditsUsed: number;
  role: 'user' | 'admin' | 'agency';
  locale: string;
  onboarded: boolean;
  emailVerified: boolean;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type PlanType = 'free' | 'starter' | 'pro' | 'agency' | 'white_label';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GENERATION TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface Generation {
  id: string;
  userId: string;
  inputImageUrl: string;
  inputPrompt?: string;
  styleId?: string;
  styleCategory?: string;
  aiModel: string;
  parameters: GenerationParameters;
  finalPrompt?: string;
  negativePrompt?: string;
  outputImageUrl?: string;
  outputImages: string[];
  resolution: string;
  format: 'png' | 'jpg' | 'webp';
  platformTarget?: PlatformTarget;
  status: GenerationStatus;
  processingTime?: number;
  creditsUsed: number;
  aiProvider: AIProvider;
  aiJobId?: string;
  qualityScore?: number;
  isPublic: boolean;
  likesCount: number;
  deletedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type AIProvider = 'fal' | 'replicate' | 'openai' | 'stability';
export type PlatformTarget = 'instagram' | 'youtube' | 'facebook' | 'tiktok' | 'spotify' | 'linkedin' | 'poster' | 'thumbnail';

export interface GenerationParameters {
  guidanceScale?: number;
  numInferenceSteps?: number;
  scheduler?: string;
  strength?: number;
  seed?: number;
  [key: string]: unknown;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLE TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface Style {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  basePrompt: string;
  negativePrompt?: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  beforeUrl?: string;
  afterUrl?: string;
  recommendedModel?: string;
  parameters: Record<string, unknown>;
  tags: string[];
  minPlan: PlanType;
  creditsCost: number;
  usesCount: number;
  likesCount: number;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUBSCRIPTION & CREDITS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'yearly';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAt?: Date;
  createdAt: Date;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'generation' | 'refund' | 'bonus' | 'monthly_reset';
  description?: string;
  generationId?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface GenerateRequest {
  imageUrl: string;
  styleId?: string;
  prompt?: string;
  platform?: PlatformTarget;
  resolution?: string;
  model?: string;
}

export interface GenerateResponse {
  generationId: string;
  status: GenerationStatus;
  estimatedTime?: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface UploadedImage {
  file: File;
  preview: string;
  width: number;
  height: number;
}

export interface EditorState {
  inputImage: UploadedImage | null;
  selectedStyle: Style | null;
  customPrompt: string;
  platform: PlatformTarget | null;
  resolution: string;
  isProcessing: boolean;
  generatedImages: string[];
  currentGeneration: Generation | null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROADMAP TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface Phase {
  number: number;
  name: string;
  description: string;
  deliverable: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

export interface ArchitectureComponent {
  name: string;
  technologies: string[];
  description: string;
}
