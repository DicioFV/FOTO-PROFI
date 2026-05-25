// src/config/env.example.ts
// CINEVISION AI — ENVIRONMENT VARIABLES TEMPLATE

/**
 * Este arquivo documenta todas as variáveis de ambiente necessárias.
 * Copie para .env.local e preencha com seus valores.
 */

export const envExample = `
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# APP
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CineVision AI
NODE_ENV=development

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SUPABASE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IA — FAL.AI (Principal)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
FAL_KEY=your_fal_api_key

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IA — REPLICATE (Fallback)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPLICATE_API_TOKEN=your_replicate_token

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IA — OPENAI (Prompts + Vision)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPENAI_API_KEY=your_openai_key

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IA — STABILITY AI
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
STABILITY_API_KEY=your_stability_key

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PAGAMENTOS — STRIPE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STORAGE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# AUTH
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXTAUTH_SECRET=your_random_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3000

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ANALYTICS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
`;

// Validação de variáveis obrigatórias
export const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'FAL_KEY',
] as const;

export const optionalEnvVars = [
  'REPLICATE_API_TOKEN',
  'OPENAI_API_KEY',
  'STABILITY_API_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_KEY',
] as const;

export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
}
