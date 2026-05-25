// src/lib/validations.ts
// CINEVISION AI — VALIDATION SCHEMAS

import { MAX_FILE_SIZE_BYTES, SUPPORTED_IMAGE_TYPES, MIN_IMAGE_WIDTH, MIN_IMAGE_HEIGHT } from './constants';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// IMAGE VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ImageValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

export function validateImageFile(file: File): ImageValidationResult {
  const warnings: string[] = [];

  // Check file type
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type as typeof SUPPORTED_IMAGE_TYPES[number])) {
    return {
      valid: false,
      error: 'Formato não suportado. Use JPG, PNG ou WebP.',
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo: 10MB.',
    };
  }

  // Check if file is too small (might be low quality)
  if (file.size < 10000) {
    warnings.push('Arquivo muito pequeno, pode resultar em baixa qualidade.');
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
}

export async function validateImageDimensions(file: File): Promise<ImageValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      if (img.width < MIN_IMAGE_WIDTH || img.height < MIN_IMAGE_HEIGHT) {
        resolve({
          valid: false,
          error: `Imagem muito pequena. Mínimo: ${MIN_IMAGE_WIDTH}×${MIN_IMAGE_HEIGHT}px`,
        });
        return;
      }

      const warnings: string[] = [];

      // Check if image is too large (might slow processing)
      if (img.width > 4096 || img.height > 4096) {
        warnings.push('Imagem muito grande, será redimensionada automaticamente.');
      }

      // Check aspect ratio
      const ratio = img.width / img.height;
      if (ratio > 3 || ratio < 0.33) {
        warnings.push('Proporção incomum, resultado pode variar.');
      }

      resolve({ valid: true, warnings: warnings.length > 0 ? warnings : undefined });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valid: false,
        error: 'Não foi possível carregar a imagem.',
      });
    };

    img.src = url;
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMAIL VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: 'Email é obrigatório.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email inválido.' };
  }

  return { valid: true };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PASSWORD VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function validatePassword(password: string): { valid: boolean; error?: string; strength: 'weak' | 'medium' | 'strong' } {
  if (!password) {
    return { valid: false, error: 'Senha é obrigatória.', strength: 'weak' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Senha deve ter no mínimo 8 caracteres.', strength: 'weak' };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  if (score < 2) {
    return { valid: false, error: 'Senha muito fraca.', strength: 'weak' };
  }

  return {
    valid: true,
    strength: score >= 3 ? 'strong' : 'medium',
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USERNAME VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username) {
    return { valid: false, error: 'Nome de usuário é obrigatório.' };
  }

  if (username.length < 3) {
    return { valid: false, error: 'Mínimo de 3 caracteres.' };
  }

  if (username.length > 20) {
    return { valid: false, error: 'Máximo de 20 caracteres.' };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: 'Apenas letras, números e underline.' };
  }

  return { valid: true };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROMPT VALIDATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function validatePrompt(prompt: string): { valid: boolean; error?: string; warnings?: string[] } {
  if (prompt.length > 2000) {
    return { valid: false, error: 'Prompt muito longo. Máximo: 2000 caracteres.' };
  }

  const warnings: string[] = [];

  // Check for potentially problematic content
  const bannedWords = ['nude', 'naked', 'nsfw', 'violence', 'gore'];
  const lowerPrompt = prompt.toLowerCase();
  if (bannedWords.some(word => lowerPrompt.includes(word))) {
    return { valid: false, error: 'Conteúdo não permitido detectado.' };
  }

  // Quality warnings
  if (prompt.length < 10 && prompt.length > 0) {
    warnings.push('Prompt curto pode gerar resultados genéricos.');
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
}
