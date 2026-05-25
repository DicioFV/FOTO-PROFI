// src/data/studios.ts
// CINEVISION AI — STUDIO PRESETS PER PLATFORM

export interface StudioPreset {
  id: string;
  name: string;
  description: string;
  aspectRatio: string;
  width: number;
  height: number;
  label: string;
}

export interface StudioConfig {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  tagline: string;
  description: string;
  presets: StudioPreset[];
  recommendedStyles: string[]; // style IDs from styles catalog
  tips: string[];
  features: string[];
}

export const studios: StudioConfig[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    emoji: '📸',
    color: 'pink',
    gradient: 'from-pink-500 via-purple-500 to-orange-400',
    tagline: 'Feed perfeito, engajamento máximo',
    description: 'Crie fotos otimizadas para Feed, Stories e Reels do Instagram com os estilos e dimensões ideais.',
    presets: [
      { id: 'ig-square', name: 'Post Quadrado', description: 'Post clássico do feed', aspectRatio: '1:1', width: 1080, height: 1080, label: '1:1' },
      { id: 'ig-portrait', name: 'Post Retrato', description: 'Ocupa mais espaço no feed', aspectRatio: '4:5', width: 1080, height: 1350, label: '4:5' },
      { id: 'ig-story', name: 'Story / Reels', description: 'Tela cheia no celular', aspectRatio: '9:16', width: 1080, height: 1920, label: '9:16' },
      { id: 'ig-landscape', name: 'Post Paisagem', description: 'Formato horizontal', aspectRatio: '1.91:1', width: 1080, height: 566, label: '1.91:1' },
    ],
    recommendedStyles: ['social-01', 'cine-03', 'cine-13', 'port-03', 'art-03'],
    tips: [
      'Posts 4:5 ocupam mais espaço no feed e geram mais engajamento',
      'Use cores vibrantes e alto contraste para chamar atenção',
      'Rostos frontais performam melhor em posts do feed',
      'Carousels com transformações antes/depois viralizam facilmente',
    ],
    features: ['Dimensões otimizadas', 'Estilos trend', 'Preview mobile', 'Export direto'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    emoji: '📺',
    color: 'red',
    gradient: 'from-red-500 to-red-700',
    tagline: 'Thumbnails que convertem cliques',
    description: 'Crie thumbnails de alto impacto, banners de canal e fotos de perfil profissionais para YouTube.',
    presets: [
      { id: 'yt-thumb', name: 'Thumbnail', description: 'Miniatura do vídeo', aspectRatio: '16:9', width: 1280, height: 720, label: '16:9' },
      { id: 'yt-banner', name: 'Banner do Canal', description: 'Capa do canal', aspectRatio: '16:9', width: 2560, height: 1440, label: '16:9 HD' },
      { id: 'yt-profile', name: 'Foto de Perfil', description: 'Avatar do canal', aspectRatio: '1:1', width: 800, height: 800, label: '1:1' },
      { id: 'yt-shorts', name: 'Shorts Cover', description: 'Capa de Shorts', aspectRatio: '9:16', width: 1080, height: 1920, label: '9:16' },
    ],
    recommendedStyles: ['social-02', 'cine-06', 'cine-01', 'cine-13', 'port-08'],
    tips: [
      'Rostos expressivos com emoção clara aumentam CTR em 30%+',
      'Use alto contraste e cores saturadas — thumbnails são pequenos',
      'Texto grande e legível (máx. 5 palavras) funciona melhor',
      'O terço esquerdo deve conter o elemento principal',
    ],
    features: ['Otimizado para CTR', 'Alto contraste', 'Expressões impactantes', 'Preview em miniatura'],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    emoji: '🎵',
    color: 'cyan',
    gradient: 'from-cyan-400 via-pink-500 to-red-500',
    tagline: 'Viralizar é a meta',
    description: 'Fotos trendy e dinâmicas otimizadas para o formato vertical do TikTok.',
    presets: [
      { id: 'tt-cover', name: 'Capa do Vídeo', description: 'Cover do TikTok', aspectRatio: '9:16', width: 1080, height: 1920, label: '9:16' },
      { id: 'tt-profile', name: 'Foto de Perfil', description: 'Avatar do perfil', aspectRatio: '1:1', width: 400, height: 400, label: '1:1' },
    ],
    recommendedStyles: ['social-03', 'fut-07', 'fut-01', 'art-03', 'fan-04'],
    tips: [
      'Cores vibrantes e neon performam muito bem no TikTok',
      'Estilo trendy e jovem gera mais identificação',
      'Transformações antes/depois são conteúdo viral garantido',
      'Use estilos fantasia e futuristas para efeito "wow"',
    ],
    features: ['Formato vertical', 'Estilo trendy', 'Cores vibrantes', 'Efeito viral'],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    emoji: '💼',
    color: 'blue',
    gradient: 'from-blue-600 to-blue-800',
    tagline: 'Presença profissional impecável',
    description: 'Headshots corporativos, fotos de perfil e banners profissionais que transmitem credibilidade.',
    presets: [
      { id: 'li-profile', name: 'Foto de Perfil', description: 'Avatar profissional', aspectRatio: '1:1', width: 800, height: 800, label: '1:1' },
      { id: 'li-banner', name: 'Banner', description: 'Capa do perfil', aspectRatio: '4:1', width: 1584, height: 396, label: '4:1' },
      { id: 'li-post', name: 'Post', description: 'Imagem de post', aspectRatio: '1.91:1', width: 1200, height: 628, label: '1.91:1' },
    ],
    recommendedStyles: ['social-04', 'port-08', 'port-01', 'com-06', 'port-05'],
    tips: [
      'Fundo neutro ou levemente desfocado passa mais profissionalismo',
      'Sorriso confiante e olhar direto transmitem autoridade',
      'Evite filtros excessivos — autenticidade é valorizada',
      'Roupas formais ou business casual são ideais',
    ],
    features: ['Headshot profissional', 'Fundo clean', 'Iluminação studio', 'Retoque natural'],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    emoji: '🎧',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    tagline: 'Capas de álbum que marcam',
    description: 'Crie capas de álbum, playlist e perfil de artista com estética musical profissional.',
    presets: [
      { id: 'sp-cover', name: 'Capa de Álbum', description: 'Cover art quadrado', aspectRatio: '1:1', width: 3000, height: 3000, label: '1:1 HD' },
      { id: 'sp-profile', name: 'Foto de Artista', description: 'Header do artista', aspectRatio: '16:9', width: 2660, height: 1140, label: '16:9' },
      { id: 'sp-playlist', name: 'Capa de Playlist', description: 'Cover de playlist', aspectRatio: '1:1', width: 640, height: 640, label: '1:1' },
    ],
    recommendedStyles: ['social-05', 'cine-09', 'art-01', 'vin-04', 'fut-07'],
    tips: [
      'Estética moody e artística funciona melhor para capas',
      'Tipografia é crucial — deixe espaço para texto sobreposto',
      'Contraste alto para ser legível em tamanhos pequenos',
      'Cores escuras com acento vibrante é tendência atual',
    ],
    features: ['Alta resolução', 'Estética musical', 'Espaço para texto', 'Múltiplos tamanhos'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    emoji: '📘',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    tagline: 'Engajamento nas redes',
    description: 'Fotos de perfil, capas e posts otimizados para máximo engajamento no Facebook.',
    presets: [
      { id: 'fb-profile', name: 'Foto de Perfil', description: 'Avatar circular', aspectRatio: '1:1', width: 720, height: 720, label: '1:1' },
      { id: 'fb-cover', name: 'Foto de Capa', description: 'Banner do perfil', aspectRatio: '2.63:1', width: 820, height: 312, label: '2.6:1' },
      { id: 'fb-post', name: 'Post', description: 'Imagem de post', aspectRatio: '1.91:1', width: 1200, height: 630, label: '1.91:1' },
      { id: 'fb-story', name: 'Story', description: 'Story vertical', aspectRatio: '9:16', width: 1080, height: 1920, label: '9:16' },
    ],
    recommendedStyles: ['social-07', 'cine-03', 'port-09', 'port-04', 'vin-01'],
    tips: [
      'Fotos com rostos geram 38% mais curtidas',
      'Cores quentes e acolhedoras performam melhor',
      'A foto de perfil deve ser reconhecível em tamanho pequeno',
      'Posts com pessoas reais geram mais engajamento que gráficos',
    ],
    features: ['Múltiplos formatos', 'Cores acolhedoras', 'Preview circular', 'Otimizado para feed'],
  },
];

export function getStudioById(id: string): StudioConfig | undefined {
  return studios.find(s => s.id === id);
}

export function getAllStudios(): StudioConfig[] {
  return studios;
}
