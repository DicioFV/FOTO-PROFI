// src/data/styles.ts
// CINEVISION AI — MASSIVE STYLE CATALOG (100+ styles)

export interface StyleItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  creditsCost: number;
  minPlan: 'free' | 'starter' | 'pro' | 'agency';
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  usageCount: number;
  emoji: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  gradient: string;
}

export const categories: CategoryData[] = [
  { id: 'cinematic', name: 'Cinematográfico', description: 'Estilos de cinema hollywoodiano', emoji: '🎬', color: 'amber', gradient: 'from-amber-500 to-orange-600' },
  { id: 'social', name: 'Redes Sociais', description: 'Otimizado para cada plataforma', emoji: '📱', color: 'pink', gradient: 'from-pink-500 to-rose-600' },
  { id: 'portrait', name: 'Retratos', description: 'Retratos profissionais', emoji: '👤', color: 'blue', gradient: 'from-blue-500 to-indigo-600' },
  { id: 'artistic', name: 'Artístico', description: 'Estilos artísticos únicos', emoji: '🎨', color: 'violet', gradient: 'from-violet-500 to-purple-600' },
  { id: 'commercial', name: 'Comercial', description: 'Para negócios e marcas', emoji: '💼', color: 'emerald', gradient: 'from-emerald-500 to-teal-600' },
  { id: 'fantasy', name: 'Fantasia', description: 'Mundos imaginários', emoji: '✨', color: 'cyan', gradient: 'from-cyan-500 to-blue-600' },
  { id: 'vintage', name: 'Vintage', description: 'Estética retrô e clássica', emoji: '📷', color: 'yellow', gradient: 'from-yellow-600 to-amber-700' },
  { id: 'futuristic', name: 'Futurista', description: 'Sci-fi e tecnologia', emoji: '🚀', color: 'indigo', gradient: 'from-indigo-500 to-blue-700' },
];

export const allStyles: StyleItem[] = [
  // ═══ CINEMATOGRÁFICO (16) ═══
  { id: 'cine-01', name: 'Hollywood Portrait', description: 'Retrato estilo grandes produções', category: 'cinematic', tags: ['portrait','dramatic','professional'], creditsCost: 1, minPlan: 'free', isFeatured: true, isPopular: true, usageCount: 45200, emoji: '🌟' },
  { id: 'cine-02', name: 'Film Noir', description: 'Estética clássica do cinema noir', category: 'cinematic', tags: ['noir','dramatic','bw'], creditsCost: 1, minPlan: 'free', usageCount: 23100, emoji: '🖤' },
  { id: 'cine-03', name: 'Golden Hour', description: 'Luz dourada do pôr do sol', category: 'cinematic', tags: ['warm','golden','sunset'], creditsCost: 1, minPlan: 'free', isFeatured: true, usageCount: 38900, emoji: '🌅' },
  { id: 'cine-04', name: 'Blade Runner', description: 'Cyberpunk neon futurista', category: 'cinematic', tags: ['cyberpunk','neon','futuristic'], creditsCost: 2, minPlan: 'starter', isNew: true, usageCount: 12400, emoji: '🌆' },
  { id: 'cine-05', name: 'Wes Anderson', description: 'Paleta simétrica e pastel', category: 'cinematic', tags: ['pastel','symmetry','whimsical'], creditsCost: 2, minPlan: 'starter', usageCount: 18700, emoji: '🎭' },
  { id: 'cine-06', name: 'Movie Poster', description: 'Pôster de cinema épico', category: 'cinematic', tags: ['poster','epic','dramatic'], creditsCost: 2, minPlan: 'starter', isPopular: true, usageCount: 31200, emoji: '🎬' },
  { id: 'cine-07', name: 'Tarantino Grunge', description: 'Estilo gritty e saturado', category: 'cinematic', tags: ['grunge','saturated','gritty'], creditsCost: 2, minPlan: 'pro', usageCount: 9800, emoji: '💥' },
  { id: 'cine-08', name: 'Spielberg Magic', description: 'Iluminação mágica e emocional', category: 'cinematic', tags: ['magic','emotional','warm'], creditsCost: 2, minPlan: 'pro', usageCount: 14600, emoji: '✨' },
  { id: 'cine-09', name: 'Nolan Dark', description: 'Tons escuros e dramáticos', category: 'cinematic', tags: ['dark','dramatic','moody'], creditsCost: 2, minPlan: 'starter', usageCount: 20100, emoji: '🌑' },
  { id: 'cine-10', name: 'Kubrick Symmetric', description: 'Composição simétrica perfeita', category: 'cinematic', tags: ['symmetry','clean','precise'], creditsCost: 2, minPlan: 'pro', usageCount: 8900, emoji: '📐' },
  { id: 'cine-11', name: 'Anamorphic Lens', description: 'Flares e bokeh anamórfico', category: 'cinematic', tags: ['lens','flare','bokeh'], creditsCost: 1, minPlan: 'free', usageCount: 27300, emoji: '🔅' },
  { id: 'cine-12', name: 'Oscar Winner', description: 'Qualidade premiada', category: 'cinematic', tags: ['premium','award','quality'], creditsCost: 3, minPlan: 'pro', isFeatured: true, usageCount: 15800, emoji: '🏆' },
  { id: 'cine-13', name: 'Cinematic Teal & Orange', description: 'Color grading clássico', category: 'cinematic', tags: ['teal','orange','grading'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 42100, emoji: '🎞️' },
  { id: 'cine-14', name: 'Dramatic Silhouette', description: 'Contra-luz dramático', category: 'cinematic', tags: ['silhouette','backlit','dramatic'], creditsCost: 1, minPlan: 'starter', usageCount: 16200, emoji: '🌗' },
  { id: 'cine-15', name: 'Epic Wide Shot', description: 'Composição épica widescreen', category: 'cinematic', tags: ['wide','epic','landscape'], creditsCost: 2, minPlan: 'pro', isNew: true, usageCount: 5400, emoji: '🏔️' },
  { id: 'cine-16', name: 'Noir Detective', description: 'Mistério e sombras', category: 'cinematic', tags: ['mystery','shadow','detective'], creditsCost: 1, minPlan: 'starter', usageCount: 11200, emoji: '🕵️' },

  // ═══ REDES SOCIAIS (14) ═══
  { id: 'social-01', name: 'Instagram Influencer', description: 'Estética perfeita para feed', category: 'social', tags: ['instagram','lifestyle','warm'], creditsCost: 1, minPlan: 'free', isFeatured: true, isPopular: true, usageCount: 56700, emoji: '📸' },
  { id: 'social-02', name: 'YouTube Thumbnail', description: 'Alto impacto para thumbnails', category: 'social', tags: ['youtube','thumbnail','bold'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 48300, emoji: '📺' },
  { id: 'social-03', name: 'TikTok Viral', description: 'Estilo trendy e vibrante', category: 'social', tags: ['tiktok','trendy','vibrant'], creditsCost: 1, minPlan: 'free', isNew: true, usageCount: 34500, emoji: '🎵' },
  { id: 'social-04', name: 'LinkedIn Professional', description: 'Headshot corporativo limpo', category: 'social', tags: ['linkedin','professional','clean'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 41200, emoji: '💼' },
  { id: 'social-05', name: 'Spotify Cover', description: 'Estilo album cover artístico', category: 'social', tags: ['spotify','album','moody'], creditsCost: 2, minPlan: 'starter', usageCount: 19800, emoji: '🎧' },
  { id: 'social-06', name: 'Twitter/X Header', description: 'Banner impactante', category: 'social', tags: ['twitter','header','bold'], creditsCost: 1, minPlan: 'free', usageCount: 15600, emoji: '💬' },
  { id: 'social-07', name: 'Facebook Cover', description: 'Capa otimizada para FB', category: 'social', tags: ['facebook','cover','warm'], creditsCost: 1, minPlan: 'free', usageCount: 12300, emoji: '📘' },
  { id: 'social-08', name: 'Pinterest Aesthetic', description: 'Estética editorial', category: 'social', tags: ['pinterest','editorial','aesthetic'], creditsCost: 1, minPlan: 'starter', usageCount: 21400, emoji: '📌' },
  { id: 'social-09', name: 'Twitch Streamer', description: 'Estilo gamer energético', category: 'social', tags: ['twitch','gaming','neon'], creditsCost: 1, minPlan: 'starter', usageCount: 16800, emoji: '🎮' },
  { id: 'social-10', name: 'Stories Vertical', description: 'Otimizado para stories 9:16', category: 'social', tags: ['stories','vertical','mobile'], creditsCost: 1, minPlan: 'free', usageCount: 29700, emoji: '📱' },
  { id: 'social-11', name: 'Reels Cinematic', description: 'Cinematográfico para reels', category: 'social', tags: ['reels','cinematic','short'], creditsCost: 1, minPlan: 'starter', isNew: true, usageCount: 8900, emoji: '🎥' },
  { id: 'social-12', name: 'BeReal Authentic', description: 'Estilo natural e autêntico', category: 'social', tags: ['authentic','natural','casual'], creditsCost: 1, minPlan: 'free', usageCount: 7200, emoji: '🤳' },
  { id: 'social-13', name: 'Discord Avatar', description: 'Avatar estilizado para perfil', category: 'social', tags: ['avatar','profile','small'], creditsCost: 1, minPlan: 'free', usageCount: 18900, emoji: '🟣' },
  { id: 'social-14', name: 'Podcast Cover', description: 'Capa profissional de podcast', category: 'social', tags: ['podcast','cover','professional'], creditsCost: 2, minPlan: 'starter', usageCount: 9100, emoji: '🎙️' },

  // ═══ RETRATOS (12) ═══
  { id: 'port-01', name: 'Studio Classic', description: 'Retrato de estúdio clássico', category: 'portrait', tags: ['studio','classic','clean'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 38400, emoji: '📷' },
  { id: 'port-02', name: 'Rembrandt Light', description: 'Iluminação Rembrandt dramática', category: 'portrait', tags: ['rembrandt','dramatic','shadow'], creditsCost: 2, minPlan: 'starter', usageCount: 22100, emoji: '💡' },
  { id: 'port-03', name: 'Beauty Retouch', description: 'Retoque de beleza profissional', category: 'portrait', tags: ['beauty','retouch','skin'], creditsCost: 2, minPlan: 'starter', isFeatured: true, usageCount: 31500, emoji: '✨' },
  { id: 'port-04', name: 'Environmental Portrait', description: 'Retrato com contexto ambiental', category: 'portrait', tags: ['environment','context','natural'], creditsCost: 1, minPlan: 'free', usageCount: 14200, emoji: '🌿' },
  { id: 'port-05', name: 'High Key', description: 'Iluminação alta e clean', category: 'portrait', tags: ['highkey','bright','clean'], creditsCost: 1, minPlan: 'free', usageCount: 19800, emoji: '☀️' },
  { id: 'port-06', name: 'Low Key Dramatic', description: 'Iluminação baixa intensa', category: 'portrait', tags: ['lowkey','dark','intense'], creditsCost: 1, minPlan: 'starter', usageCount: 17600, emoji: '🌙' },
  { id: 'port-07', name: 'Fashion Editorial', description: 'Estilo de revista de moda', category: 'portrait', tags: ['fashion','editorial','magazine'], creditsCost: 2, minPlan: 'pro', usageCount: 24300, emoji: '👗' },
  { id: 'port-08', name: 'Headshot Pro', description: 'Headshot corporativo premium', category: 'portrait', tags: ['headshot','corporate','premium'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 35700, emoji: '🤵' },
  { id: 'port-09', name: 'Natural Light', description: 'Luz natural suave', category: 'portrait', tags: ['natural','soft','outdoor'], creditsCost: 1, minPlan: 'free', usageCount: 28900, emoji: '🌤️' },
  { id: 'port-10', name: 'Glamour Shot', description: 'Glamour e sofisticação', category: 'portrait', tags: ['glamour','elegant','luxe'], creditsCost: 2, minPlan: 'pro', usageCount: 13400, emoji: '💎' },
  { id: 'port-11', name: 'Character Portrait', description: 'Retrato com personalidade forte', category: 'portrait', tags: ['character','personality','bold'], creditsCost: 1, minPlan: 'starter', usageCount: 11200, emoji: '🎭' },
  { id: 'port-12', name: 'Passport Photo Pro', description: 'Foto profissional para documentos', category: 'portrait', tags: ['passport','document','official'], creditsCost: 1, minPlan: 'free', isNew: true, usageCount: 6700, emoji: '🪪' },

  // ═══ ARTÍSTICO (14) ═══
  { id: 'art-01', name: 'Oil Painting', description: 'Pintura a óleo clássica', category: 'artistic', tags: ['painting','oil','classical'], creditsCost: 2, minPlan: 'starter', isFeatured: true, usageCount: 26800, emoji: '🖼️' },
  { id: 'art-02', name: 'Pop Art Warhol', description: 'Estilo Andy Warhol vibrante', category: 'artistic', tags: ['pop-art','warhol','colorful'], creditsCost: 2, minPlan: 'starter', isPopular: true, usageCount: 31400, emoji: '🎨' },
  { id: 'art-03', name: 'Anime Style', description: 'Ilustração estilo anime/mangá', category: 'artistic', tags: ['anime','manga','illustration'], creditsCost: 2, minPlan: 'starter', isPopular: true, usageCount: 45600, emoji: '🍥' },
  { id: 'art-04', name: 'Watercolor', description: 'Aquarela delicada e fluida', category: 'artistic', tags: ['watercolor','soft','delicate'], creditsCost: 2, minPlan: 'starter', usageCount: 18200, emoji: '🎨' },
  { id: 'art-05', name: 'Comic Book', description: 'Quadrinhos americanos clássicos', category: 'artistic', tags: ['comic','book','retro'], creditsCost: 2, minPlan: 'starter', usageCount: 22300, emoji: '💥' },
  { id: 'art-06', name: 'Pixel Art', description: 'Pixel art retro 8-bit', category: 'artistic', tags: ['pixel','retro','8bit'], creditsCost: 1, minPlan: 'free', usageCount: 14700, emoji: '👾' },
  { id: 'art-07', name: 'Stained Glass', description: 'Vitral colorido', category: 'artistic', tags: ['stained','glass','colorful'], creditsCost: 2, minPlan: 'pro', usageCount: 8900, emoji: '🏛️' },
  { id: 'art-08', name: 'Graffiti Street', description: 'Arte urbana grafite', category: 'artistic', tags: ['graffiti','street','urban'], creditsCost: 2, minPlan: 'starter', isNew: true, usageCount: 11200, emoji: '🧱' },
  { id: 'art-09', name: 'Renaissance', description: 'Renascimento italiano', category: 'artistic', tags: ['renaissance','classical','masterpiece'], creditsCost: 3, minPlan: 'pro', usageCount: 15800, emoji: '🏛️' },
  { id: 'art-10', name: 'Impressionist', description: 'Impressionismo francês', category: 'artistic', tags: ['impressionist','monet','soft'], creditsCost: 2, minPlan: 'pro', usageCount: 12100, emoji: '🌸' },
  { id: 'art-11', name: 'Digital Glitch', description: 'Glitch art digital', category: 'artistic', tags: ['glitch','digital','distorted'], creditsCost: 1, minPlan: 'starter', usageCount: 16400, emoji: '📺' },
  { id: 'art-12', name: 'Charcoal Sketch', description: 'Desenho a carvão', category: 'artistic', tags: ['charcoal','sketch','drawing'], creditsCost: 1, minPlan: 'free', usageCount: 13600, emoji: '✏️' },
  { id: 'art-13', name: 'Mosaic Tiles', description: 'Mosaico de azulejos', category: 'artistic', tags: ['mosaic','tiles','pattern'], creditsCost: 2, minPlan: 'pro', usageCount: 7200, emoji: '🟦' },
  { id: 'art-14', name: '3D Render', description: 'Renderização 3D realista', category: 'artistic', tags: ['3d','render','cgi'], creditsCost: 2, minPlan: 'starter', isNew: true, usageCount: 19300, emoji: '💠' },

  // ═══ COMERCIAL (10) ═══
  { id: 'com-01', name: 'Product Shot', description: 'Foto de produto profissional', category: 'commercial', tags: ['product','professional','clean'], creditsCost: 2, minPlan: 'starter', usageCount: 21300, emoji: '📦' },
  { id: 'com-02', name: 'Brand Ambassador', description: 'Embaixador de marca', category: 'commercial', tags: ['brand','ambassador','model'], creditsCost: 2, minPlan: 'pro', usageCount: 14500, emoji: '🏷️' },
  { id: 'com-03', name: 'Real Estate', description: 'Foto imobiliária premium', category: 'commercial', tags: ['realestate','property','luxury'], creditsCost: 2, minPlan: 'pro', usageCount: 11200, emoji: '🏠' },
  { id: 'com-04', name: 'Food Photography', description: 'Fotografia gastronômica', category: 'commercial', tags: ['food','gastronomy','delicious'], creditsCost: 1, minPlan: 'starter', usageCount: 17800, emoji: '🍔' },
  { id: 'com-05', name: 'E-Commerce Hero', description: 'Hero image para loja virtual', category: 'commercial', tags: ['ecommerce','hero','shop'], creditsCost: 2, minPlan: 'pro', usageCount: 9800, emoji: '🛒' },
  { id: 'com-06', name: 'Corporate Team', description: 'Foto de equipe corporativa', category: 'commercial', tags: ['team','corporate','group'], creditsCost: 1, minPlan: 'starter', usageCount: 13200, emoji: '👥' },
  { id: 'com-07', name: 'Magazine Ad', description: 'Anúncio de revista', category: 'commercial', tags: ['magazine','ad','editorial'], creditsCost: 2, minPlan: 'pro', usageCount: 8400, emoji: '📰' },
  { id: 'com-08', name: 'Event Speaker', description: 'Foto de palestrante', category: 'commercial', tags: ['speaker','event','stage'], creditsCost: 1, minPlan: 'free', usageCount: 16100, emoji: '🎤' },
  { id: 'com-09', name: 'Author Portrait', description: 'Retrato de autor literário', category: 'commercial', tags: ['author','book','literary'], creditsCost: 1, minPlan: 'starter', usageCount: 7600, emoji: '📚' },
  { id: 'com-10', name: 'Business Card Pro', description: 'Foto para cartão de visita', category: 'commercial', tags: ['businesscard','compact','professional'], creditsCost: 1, minPlan: 'free', usageCount: 22100, emoji: '💳' },

  // ═══ FANTASIA (10) ═══
  { id: 'fan-01', name: 'Ethereal Glow', description: 'Brilho etéreo e mágico', category: 'fantasy', tags: ['ethereal','glow','magical'], creditsCost: 2, minPlan: 'starter', isFeatured: true, usageCount: 28900, emoji: '🦋' },
  { id: 'fan-02', name: 'Dark Fantasy', description: 'Fantasia sombria e épica', category: 'fantasy', tags: ['dark','epic','gothic'], creditsCost: 2, minPlan: 'starter', usageCount: 19200, emoji: '🐉' },
  { id: 'fan-03', name: 'Fairy Tale', description: 'Conto de fadas encantado', category: 'fantasy', tags: ['fairy','tale','enchanted'], creditsCost: 2, minPlan: 'starter', usageCount: 21400, emoji: '🧚' },
  { id: 'fan-04', name: 'Superhero', description: 'Super-herói em ação', category: 'fantasy', tags: ['superhero','action','power'], creditsCost: 2, minPlan: 'starter', isPopular: true, usageCount: 35600, emoji: '🦸' },
  { id: 'fan-05', name: 'Wizard & Magic', description: 'Mago com poderes mágicos', category: 'fantasy', tags: ['wizard','magic','spell'], creditsCost: 2, minPlan: 'pro', usageCount: 16700, emoji: '🧙' },
  { id: 'fan-06', name: 'Underwater Kingdom', description: 'Reino submarino fantástico', category: 'fantasy', tags: ['underwater','ocean','fantasy'], creditsCost: 3, minPlan: 'pro', usageCount: 8900, emoji: '🧜' },
  { id: 'fan-07', name: 'Celestial Being', description: 'Ser celestial luminoso', category: 'fantasy', tags: ['celestial','divine','light'], creditsCost: 2, minPlan: 'pro', isNew: true, usageCount: 5400, emoji: '👼' },
  { id: 'fan-08', name: 'Steampunk', description: 'Steampunk vitoriano', category: 'fantasy', tags: ['steampunk','victorian','gears'], creditsCost: 2, minPlan: 'starter', usageCount: 18300, emoji: '⚙️' },
  { id: 'fan-09', name: 'Space Explorer', description: 'Explorador espacial', category: 'fantasy', tags: ['space','explorer','astronaut'], creditsCost: 2, minPlan: 'starter', usageCount: 22100, emoji: '🚀' },
  { id: 'fan-10', name: 'Mythical Warrior', description: 'Guerreiro mitológico', category: 'fantasy', tags: ['warrior','mythical','battle'], creditsCost: 2, minPlan: 'pro', usageCount: 14500, emoji: '⚔️' },

  // ═══ VINTAGE (10) ═══
  { id: 'vin-01', name: '70s Retro', description: 'Estética anos 70', category: 'vintage', tags: ['70s','retro','warm'], creditsCost: 1, minPlan: 'free', isPopular: true, usageCount: 29800, emoji: '🕺' },
  { id: 'vin-02', name: 'Polaroid', description: 'Foto estilo Polaroid', category: 'vintage', tags: ['polaroid','instant','nostalgic'], creditsCost: 1, minPlan: 'free', usageCount: 33400, emoji: '📸' },
  { id: 'vin-03', name: 'Sepia Classic', description: 'Sépia clássico atemporal', category: 'vintage', tags: ['sepia','classic','timeless'], creditsCost: 1, minPlan: 'free', usageCount: 18900, emoji: '📜' },
  { id: 'vin-04', name: 'Black & White Fine Art', description: 'P&B artístico refinado', category: 'vintage', tags: ['bw','fineart','dramatic'], creditsCost: 1, minPlan: 'free', usageCount: 25600, emoji: '🖤' },
  { id: 'vin-05', name: '35mm Film', description: 'Filme analógico 35mm', category: 'vintage', tags: ['35mm','film','analog'], creditsCost: 1, minPlan: 'starter', usageCount: 21200, emoji: '🎞️' },
  { id: 'vin-06', name: 'Daguerreotype', description: 'Estilo daguerreótipo antigo', category: 'vintage', tags: ['daguerreotype','ancient','historical'], creditsCost: 2, minPlan: 'pro', usageCount: 6800, emoji: '🏺' },
  { id: 'vin-07', name: '50s Americana', description: 'Americana anos 50', category: 'vintage', tags: ['50s','americana','classic'], creditsCost: 1, minPlan: 'starter', usageCount: 14300, emoji: '🍦' },
  { id: 'vin-08', name: 'VHS Glitch', description: 'Estética VHS com ruído', category: 'vintage', tags: ['vhs','glitch','noise'], creditsCost: 1, minPlan: 'free', isNew: true, usageCount: 11700, emoji: '📼' },
  { id: 'vin-09', name: 'Kodachrome', description: 'Cores vibrantes Kodachrome', category: 'vintage', tags: ['kodachrome','vibrant','film'], creditsCost: 1, minPlan: 'starter', usageCount: 16500, emoji: '🟡' },
  { id: 'vin-10', name: 'Old Hollywood Glam', description: 'Glamour de Hollywood clássica', category: 'vintage', tags: ['oldhollywood','glamour','elegant'], creditsCost: 2, minPlan: 'pro', usageCount: 12800, emoji: '🎬' },

  // ═══ FUTURISTA (10) ═══
  { id: 'fut-01', name: 'Cyberpunk City', description: 'Cidade cyberpunk neon', category: 'futuristic', tags: ['cyberpunk','city','neon'], creditsCost: 2, minPlan: 'starter', isPopular: true, usageCount: 32100, emoji: '🌃' },
  { id: 'fut-02', name: 'AI Neural', description: 'Estética neural network', category: 'futuristic', tags: ['ai','neural','digital'], creditsCost: 2, minPlan: 'starter', isNew: true, usageCount: 14800, emoji: '🧠' },
  { id: 'fut-03', name: 'Holographic', description: 'Efeito holográfico iridescente', category: 'futuristic', tags: ['holographic','iridescent','shiny'], creditsCost: 2, minPlan: 'pro', usageCount: 18200, emoji: '🌈' },
  { id: 'fut-04', name: 'Matrix Digital', description: 'Estilo Matrix digital', category: 'futuristic', tags: ['matrix','digital','green'], creditsCost: 2, minPlan: 'starter', usageCount: 21400, emoji: '🟢' },
  { id: 'fut-05', name: 'Tron Legacy', description: 'Linhas neon estilo Tron', category: 'futuristic', tags: ['tron','neon','lines'], creditsCost: 2, minPlan: 'pro', usageCount: 11200, emoji: '🔵' },
  { id: 'fut-06', name: 'Mecha Armor', description: 'Armadura robótica futurista', category: 'futuristic', tags: ['mecha','armor','robot'], creditsCost: 3, minPlan: 'pro', usageCount: 9800, emoji: '🤖' },
  { id: 'fut-07', name: 'Synthwave', description: 'Retro-futurismo synthwave', category: 'futuristic', tags: ['synthwave','retro','neon'], creditsCost: 1, minPlan: 'starter', isPopular: true, usageCount: 27600, emoji: '🌆' },
  { id: 'fut-08', name: 'Space Station', description: 'Interior de estação espacial', category: 'futuristic', tags: ['space','station','scifi'], creditsCost: 2, minPlan: 'pro', usageCount: 7400, emoji: '🛸' },
  { id: 'fut-09', name: 'Quantum Glow', description: 'Brilho quântico energético', category: 'futuristic', tags: ['quantum','energy','glow'], creditsCost: 2, minPlan: 'starter', isNew: true, usageCount: 6200, emoji: '⚡' },
  { id: 'fut-10', name: 'Android Portrait', description: 'Retrato androide realista', category: 'futuristic', tags: ['android','robot','realistic'], creditsCost: 3, minPlan: 'pro', usageCount: 8100, emoji: '🤖' },
];

// Helper functions
export function getStylesByCategory(categoryId: string): StyleItem[] {
  return allStyles.filter(s => s.category === categoryId);
}

export function getFeaturedStyles(): StyleItem[] {
  return allStyles.filter(s => s.isFeatured);
}

export function getNewStyles(): StyleItem[] {
  return allStyles.filter(s => s.isNew);
}

export function getPopularStyles(): StyleItem[] {
  return allStyles.filter(s => s.isPopular).sort((a, b) => b.usageCount - a.usageCount);
}

export function searchStyles(query: string): StyleItem[] {
  const q = query.toLowerCase();
  return allStyles.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.tags.some(t => t.includes(q)) ||
    s.category.includes(q)
  );
}

export function getStyleById(id: string): StyleItem | undefined {
  return allStyles.find(s => s.id === id);
}

export function getCategoryById(id: string): CategoryData | undefined {
  return categories.find(c => c.id === id);
}
