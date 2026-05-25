// src/pages/HistoryPage.tsx
// CINEVISION AI — HISTORY & GALLERY PAGE

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Download, Trash2, Eye, Grid, LayoutList, Image, Sparkles } from 'lucide-react';
import { Input, Button, Card, Badge, Checkbox } from '../components/ui';
import { cn } from '../lib/utils';

interface HistoryItem {
  id: string;
  imageUrl: string;
  styleName: string;
  category: string;
  createdAt: Date;
  status: 'completed' | 'failed';
  creditsUsed: number;
  resolution: string;
  isFavorite: boolean;
}

// Mock data
const mockHistory: HistoryItem[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', styleName: 'Hollywood Portrait', category: 'Cinematográfico', createdAt: new Date(Date.now() - 5 * 60000), status: 'completed', creditsUsed: 1, resolution: '1024×1024', isFavorite: true },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', styleName: 'Instagram Glow', category: 'Redes Sociais', createdAt: new Date(Date.now() - 3600000), status: 'completed', creditsUsed: 1, resolution: '1080×1350', isFavorite: false },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', styleName: 'YouTube Thumbnail', category: 'Redes Sociais', createdAt: new Date(Date.now() - 7200000), status: 'completed', creditsUsed: 1, resolution: '1280×720', isFavorite: true },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', styleName: 'Pop Art Warhol', category: 'Artístico', createdAt: new Date(Date.now() - 86400000), status: 'completed', creditsUsed: 2, resolution: '1024×1024', isFavorite: false },
  { id: '5', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', styleName: 'Cyberpunk Neon', category: 'Artístico', createdAt: new Date(Date.now() - 172800000), status: 'completed', creditsUsed: 2, resolution: '1024×1024', isFavorite: false },
  { id: '6', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', styleName: 'LinkedIn Pro', category: 'Profissional', createdAt: new Date(Date.now() - 259200000), status: 'completed', creditsUsed: 1, resolution: '800×800', isFavorite: true },
  { id: '7', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', styleName: 'Film Noir', category: 'Vintage', createdAt: new Date(Date.now() - 345600000), status: 'completed', creditsUsed: 1, resolution: '1024×1024', isFavorite: false },
  { id: '8', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', styleName: 'Anime Style', category: 'Artístico', createdAt: new Date(Date.now() - 432000000), status: 'completed', creditsUsed: 2, resolution: '1024×1024', isFavorite: false },
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 60) return `${min}min atrás`;
  if (hr < 24) return `${hr}h atrás`;
  return `${d}d atrás`;
}

export function HistoryPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let items = [...mockHistory];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => i.styleName.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    if (filterFavorites) items = items.filter(i => i.isFavorite);
    return items;
  }, [search, filterFavorites]);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedItems.size === filtered.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filtered.map(i => i.id)));
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Histórico</h1>
              <p className="text-gray-400">{mockHistory.length} gerações • {mockHistory.reduce((a, i) => a + i.creditsUsed, 0)} créditos usados</p>
            </div>
            {selectedItems.size > 0 && (
              <div className="flex items-center gap-3">
                <Badge variant="default">{selectedItems.size} selecionado{selectedItems.size > 1 ? 's' : ''}</Badge>
                <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>Baixar</Button>
                <Button variant="danger" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>Excluir</Button>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="flex-1">
              <Input placeholder="Buscar por estilo ou categoria..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
            </div>
            <div className="flex items-center gap-2">
              <Button variant={filterFavorites ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterFavorites(!filterFavorites)}>
                ❤️ Favoritos
              </Button>
              <Button variant="ghost" size="sm" onClick={selectAll}>
                {selectedItems.size === filtered.length ? 'Desmarcar' : 'Selecionar'} todos
              </Button>
              <div className="flex items-center border border-white/10 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500')}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500')}>
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {filtered.length === 0 ? (
            <Card variant="glass" padding="lg" className="text-center py-20">
              <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Nenhuma geração encontrada</h3>
              <p className="text-gray-500 mb-4">{search ? 'Tente buscar com outros termos' : 'Crie sua primeira foto cinematográfica'}</p>
              <Button variant="gold" leftIcon={<Sparkles className="w-4 h-4" />}>Criar Primeira Foto</Button>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className={cn(
                    'group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all',
                    selectedItems.has(item.id) ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-transparent'
                  )}
                  onClick={() => toggleSelect(item.id)}
                >
                  <img src={item.imageUrl} alt={item.styleName} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm font-medium text-white truncate">{item.styleName}</p>
                    <p className="text-xs text-gray-400">{timeAgo(item.createdAt)}</p>
                  </div>
                  {item.isFavorite && <span className="absolute top-2 right-2 text-red-400">❤️</span>}
                  {selectedItems.has(item.id) && (
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-white/[0.03]',
                    selectedItems.has(item.id) ? 'bg-amber-500/5 border-amber-500/30' : 'bg-white/[0.02] border-white/10'
                  )}
                >
                  <Checkbox checked={selectedItems.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{item.styleName}</p>
                    <p className="text-sm text-gray-500">{item.category} • {item.resolution}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {timeAgo(item.createdAt)}
                  </div>
                  <Badge variant="default" size="sm">{item.creditsUsed} cr</Badge>
                  {item.isFavorite && <span className="text-red-400">❤️</span>}
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><Download className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
