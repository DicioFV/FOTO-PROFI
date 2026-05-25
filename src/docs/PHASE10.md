# CINEVISION AI — FASE 10 COMPLETA

## Estúdios Especializados ✅

### 6 Estúdios por Plataforma

| Estúdio | Presets | Estilos Rec. | Dicas |
|---------|---------|-------------|-------|
| 📸 Instagram | 4 (Square, Portrait, Story, Landscape) | 5 | 4 |
| 📺 YouTube | 4 (Thumbnail, Banner, Profile, Shorts) | 5 | 4 |
| 🎵 TikTok | 2 (Cover, Profile) | 5 | 4 |
| 💼 LinkedIn | 3 (Profile, Banner, Post) | 5 | 4 |
| 🎧 Spotify | 3 (Album, Artist, Playlist) | 5 | 4 |
| 📘 Facebook | 4 (Profile, Cover, Post, Story) | 5 | 4 |

### Cada Estúdio Contém
- ID, nome, emoji, cor, gradiente
- Tagline e descrição
- Presets com dimensões exatas (width × height)
- Aspect ratios corretos por formato
- 5 estilos recomendados (IDs do catálogo)
- 4 dicas específicas da plataforma
- 4 features destacadas

### Páginas Criadas

#### StudioSelector (seletor)
- Grid de 6 cards de estúdio
- Gradientes por plataforma
- Emojis grandes com hover
- Badges de features
- Animação de entrada

#### StudioPage (detalhe)
- Banner hero com gradiente
- Preview do formato selecionado
- Dimensões reais proporcionais
- 3 tabs: Formatos, Estilos, Dicas
- Lista de presets com seleção
- Estilos recomendados linkcados
- Tips com ícones
- Features grid
- CTA "Criar para [plataforma]"
- Layout 2/3 + 1/3

### Presets com Dimensões Oficiais

#### Instagram
- Post Quadrado: 1080×1080 (1:1)
- Post Retrato: 1080×1350 (4:5)
- Story/Reels: 1080×1920 (9:16)
- Paisagem: 1080×566 (1.91:1)

#### YouTube
- Thumbnail: 1280×720 (16:9)
- Banner: 2560×1440 (16:9 HD)
- Perfil: 800×800 (1:1)
- Shorts: 1080×1920 (9:16)

#### TikTok
- Capa: 1080×1920 (9:16)
- Perfil: 400×400 (1:1)

#### LinkedIn
- Perfil: 800×800 (1:1)
- Banner: 1584×396 (4:1)
- Post: 1200×628 (1.91:1)

#### Spotify
- Álbum: 3000×3000 (1:1 HD)
- Artista: 2660×1140 (16:9)
- Playlist: 640×640 (1:1)

#### Facebook
- Perfil: 720×720 (1:1)
- Capa: 820×312 (2.63:1)
- Post: 1200×630 (1.91:1)
- Story: 1080×1920 (9:16)

### Estrutura

```
src/data/studios.ts          # 6 estúdios + helpers
src/pages/StudioPage.tsx     # Selector + Detail
```

### Roteamento
- `/studio` → Seletor de estúdios
- `/studio/:platform` → Estúdio específico
