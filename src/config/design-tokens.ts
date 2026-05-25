// src/config/design-tokens.ts
// CINEVISION AI — DESIGN TOKENS COMPLETOS

export const designTokens = {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PALETA DE CORES — DARK LUXURY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  colors: {
    // Backgrounds
    bg: {
      primary:   '#050507',   // Preto cinematográfico
      secondary: '#0A0A0F',   // Quase preto azulado
      card:      '#0F0F18',   // Cards escuros
      elevated:  '#141420',   // Superfícies elevadas
      glass:     'rgba(255,255,255,0.03)', // Glass morphism
    },
    
    // Primária — Dourado cinematográfico
    gold: {
      50:  '#FFF8E7',
      100: '#FFE9A0',
      200: '#FFD966',
      300: '#FFCA28',
      400: '#FFB800',
      500: '#E5A000',  // Principal
      600: '#CC8800',
      700: '#A06A00',
      800: '#7A5000',
      900: '#3D2800',
    },
    
    // Acento — Violeta premium
    violet: {
      400: '#A78BFA',
      500: '#8B5CF6',
      600: '#7C3AED',
      700: '#6D28D9',
    },
    
    // Cyan elétrico (tech)
    cyan: {
      400: '#22D3EE',
      500: '#06B6D4',
    },
    
    // Texto
    text: {
      primary:   '#FFFFFF',
      secondary: '#A0A0B8',
      muted:     '#606080',
      inverse:   '#050507',
    },
    
    // Status
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error:   '#EF4444',
      info:    '#3B82F6',
    },
    
    // Bordas glass
    border: {
      subtle:  'rgba(255,255,255,0.04)',
      default: 'rgba(255,255,255,0.08)',
      strong:  'rgba(255,255,255,0.15)',
      gold:    'rgba(229,160,0,0.30)',
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TIPOGRAFIA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  typography: {
    fonts: {
      display: '"Clash Display", "SF Pro Display", sans-serif',
      body:    '"Inter", "SF Pro Text", sans-serif',
      mono:    '"JetBrains Mono", monospace',
    },
    sizes: {
      xs:   '0.75rem',   // 12px
      sm:   '0.875rem',  // 14px
      base: '1rem',      // 16px
      lg:   '1.125rem',  // 18px
      xl:   '1.25rem',   // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GRADIENTES CINEMATOGRÁFICOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gradients: {
    gold:       'linear-gradient(135deg, #E5A000 0%, #FFD966 50%, #E5A000 100%)',
    goldText:   'linear-gradient(135deg, #FFD966 0%, #E5A000 100%)',
    hero:       'radial-gradient(ellipse at 50% 0%, rgba(229,160,0,0.15) 0%, transparent 70%)',
    card:       'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
    violet:     'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    cinema:     'linear-gradient(180deg, #050507 0%, #0A0508 100%)',
    glow:       'radial-gradient(circle, rgba(229,160,0,0.4) 0%, transparent 70%)',
    button:     'linear-gradient(135deg, #E5A000 0%, #FFB800 100%)',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SOMBRAS & GLOWS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  shadows: {
    goldGlow:   '0 0 30px rgba(229,160,0,0.3), 0 0 60px rgba(229,160,0,0.1)',
    cardGlow:   '0 8px 32px rgba(0,0,0,0.5)',
    buttonHover:'0 0 20px rgba(229,160,0,0.5)',
    glass:      'inset 0 1px 0 rgba(255,255,255,0.1)',
    deep:       '0 25px 50px rgba(0,0,0,0.8)',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ANIMAÇÕES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  animations: {
    fast:     '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal:   '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow:     '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring:   '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    cinematic:'1000ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // BORDAS ARREDONDADAS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  radius: {
    sm:   '0.375rem',
    md:   '0.75rem',
    lg:   '1rem',
    xl:   '1.5rem',
    '2xl':'2rem',
    full: '9999px',
  }
};

export default designTokens;
