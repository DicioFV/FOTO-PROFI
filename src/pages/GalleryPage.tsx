// src/pages/GalleryPage.tsx
// CINEVISION AI — PUBLIC GALLERY PAGE

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Sparkles } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { cn } from '../lib/utils';

interface GalleryItem {
  id: string;
  imageUrl: string;
  styleName: string;
  author: string;
  likes: number;
  views: number;
  createdAt: string;
}

const galleryItems: GalleryItem[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', styleName: 'Hollywood Portrait', author: 'Ana S.', likes: 342, views: 1200, createdAt: '2h' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', styleName: 'Instagram Glow', author: 'Rafael M.', likes: 528, views: 2100, createdAt: '4h' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500', styleName: 'Cyberpunk Neon', author: 'Julia C.', likes: 891, views: 3400, createdAt: '6h' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', styleName: 'Pop Art', author: 'Pedro O.', likes: 267, views: 980, createdAt: '12h' },
  { id: '5', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500', styleName: 'Film Noir', author: 'Mari S.', likes: 456, views: 1500, createdAt: '1d' },
  { id: '6', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500', styleName: 'LinkedIn Pro', author: 'Carlos A.', likes: 189, views: 750, createdAt: '1d' },
  { id: '7', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', styleName: 'Anime Style', author: 'Luana F.', likes: 1204, views: 5600, createdAt: '2d' },
  { id: '8', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', styleName: 'Golden Hour', author: 'Thiago R.', likes: 673, views: 2800, createdAt: '3d' },
];

const filters = ['Todos', 'Trending', 'Recentes', 'Mais Curtidos'];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge variant="gold" className="mb-4"><Sparkles className="w-4 h-4 mr-1" />Galeria da Comunidade</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Galeria Pública</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explore as criações da comunidade CineVision. Inspire-se e crie a sua!</p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeFilter === f ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            )}>{f}</button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all"
            >
              <img src={item.imageUrl} alt={item.styleName} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/5' }} />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="font-medium text-white text-sm">{item.styleName}</p>
                <p className="text-xs text-gray-400">por {item.author} • {item.createdAt}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button onClick={() => toggleLike(item.id)} className="flex items-center gap-1 text-sm">
                    <Heart className={cn('w-4 h-4', likedItems.has(item.id) ? 'fill-red-400 text-red-400' : 'text-white')} />
                    <span className="text-white">{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                  </button>
                  <span className="flex items-center gap-1 text-sm text-gray-400"><Eye className="w-4 h-4" />{item.views}</span>
                </div>
              </div>

              {/* Style Badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="default" size="sm">{item.styleName}</Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">Carregar Mais</Button>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
