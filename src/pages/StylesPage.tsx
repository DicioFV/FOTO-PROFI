// src/pages/StylesPage.tsx
// CINEVISION AI — STYLES CATALOG PAGE (Complete Rebuild)

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Star, Grid, LayoutList } from 'lucide-react';
import { Input, Button, Badge, Card, Select } from '../components/ui';
import { StyleDetailModal } from '../components/gallery';
import { cn } from '../lib/utils';
import { allStyles, categories, getFeaturedStyles, getNewStyles, getPopularStyles, getCategoryById } from '../data/styles';
import type { StyleItem } from '../data/styles';

type SortOption = 'popular' | 'newest' | 'name' | 'price';

const sortOptions = [
  { value: 'popular', label: 'Mais Populares' },
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'name', label: 'A-Z' },
  { value: 'price', label: 'Preço' },
];

// Style Card for catalog
function CatalogStyleCard({ style, onClick }: { style: StyleItem; onClick: () => void }) {
  const category = getCategoryById(style.category);
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all"
    >
      {/* Preview Area */}
      <div className={cn('aspect-square flex items-center justify-center relative bg-gradient-to-br', category?.gradient || 'from-gray-700 to-gray-800')}>
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{style.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {style.isNew && <Badge variant="gold" size="sm">Novo</Badge>}
          {style.isFeatured && <Badge variant="default" size="sm">⭐</Badge>}
        </div>
        {style.minPlan !== 'free' && (
          <div className="absolute top-2 right-2">
            <Badge variant="gold" size="sm">{style.minPlan.toUpperCase()}</Badge>
          </div>
        )}

        {/* Usage */}
        <div className="absolute bottom-2 right-2">
          <span className="text-xs text-white/60 bg-black/40 px-2 py-0.5 rounded-full">
            {(style.usageCount / 1000).toFixed(1)}K usos
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-medium text-white text-sm group-hover:text-amber-400 transition-colors truncate">{style.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500 truncate">{category?.name}</p>
          <span className="text-xs text-amber-400 font-medium">{style.creditsCost} cr</span>
        </div>
      </div>
    </motion.div>
  );
}

export function StylesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStyle, setSelectedStyle] = useState<StyleItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter and sort
  const filteredStyles = useMemo(() => {
    let result = [...allStyles];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular': result.sort((a, b) => b.usageCount - a.usageCount); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price': result.sort((a, b) => a.creditsCost - b.creditsCost); break;
    }

    return result;
  }, [selectedCategory, search, sortBy]);

  const featuredStyles = useMemo(() => getFeaturedStyles(), []);
  const newStyles = useMemo(() => getNewStyles(), []);
  const popularStyles = useMemo(() => getPopularStyles().slice(0, 6), []);

  const handleStyleClick = (style: StyleItem) => {
    setSelectedStyle(style);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-20">
      {/* Style Detail Modal */}
      <AnimatePresence>
        {modalOpen && selectedStyle && (
          <StyleDetailModal
            style={selectedStyle}
            category={getCategoryById(selectedStyle.category)}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge variant="gold" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            {allStyles.length} Estilos Disponíveis
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Catálogo de Estilos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore {allStyles.length} estilos cinematográficos, artísticos e profissionais.
            De Hollywood a anime, encontre o perfeito para você.
          </p>
        </motion.div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome, categoria ou tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-44">
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortOption)}
                options={sortOptions}
              />
            </div>
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

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              selectedCategory === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            )}
          >
            🌟 Todos
            <span className={cn('text-xs px-1.5 py-0.5 rounded-full', selectedCategory === 'all' ? 'bg-black/20' : 'bg-white/10')}>
              {allStyles.length}
            </span>
          </button>
          {categories.map((cat) => {
            const count = allStyles.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                )}
              >
                {cat.emoji} {cat.name}
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', selectedCategory === cat.id ? 'bg-white/20' : 'bg-white/10')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Section (only on "All") */}
        {selectedCategory === 'all' && !search && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Em Destaque
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredStyles.map((style) => (
                <CatalogStyleCard key={style.id} style={style} onClick={() => handleStyleClick(style)} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Section */}
        {selectedCategory === 'all' && !search && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Mais Populares
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {popularStyles.map((style) => (
                <CatalogStyleCard key={style.id} style={style} onClick={() => handleStyleClick(style)} />
              ))}
            </div>
          </section>
        )}

        {/* New Section */}
        {selectedCategory === 'all' && !search && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Novidades
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {newStyles.map((style) => (
                <CatalogStyleCard key={style.id} style={style} onClick={() => handleStyleClick(style)} />
              ))}
            </div>
          </section>
        )}

        {/* All/Filtered Styles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {search ? `Resultados para "${search}"` : selectedCategory === 'all' ? 'Todos os Estilos' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500">{filteredStyles.length} estilos</span>
          </div>

          {filteredStyles.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredStyles.map((style, i) => (
                  <motion.div
                    key={style.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.5) }}
                  >
                    <CatalogStyleCard style={style} onClick={() => handleStyleClick(style)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStyles.map((style, i) => {
                  const category = getCategoryById(style.category);
                  return (
                    <motion.div
                      key={style.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.5) }}
                      onClick={() => handleStyleClick(style)}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.04] cursor-pointer transition-all group"
                    >
                      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-2xl flex-shrink-0', category?.gradient)}>
                        {style.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white group-hover:text-amber-400 transition-colors">{style.name}</p>
                        <p className="text-sm text-gray-500 truncate">{style.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex gap-1">
                          {style.isNew && <Badge variant="gold" size="sm">Novo</Badge>}
                          {style.isPopular && <Badge variant="default" size="sm">Popular</Badge>}
                        </div>
                        <span className="text-sm text-gray-500">{(style.usageCount / 1000).toFixed(1)}K</span>
                        <span className="text-sm text-amber-400 font-medium">{style.creditsCost} cr</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )
          ) : (
            <Card variant="glass" padding="lg" className="text-center py-16">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Nenhum estilo encontrado</h3>
              <p className="text-gray-500 mb-4">Tente buscar com outros termos</p>
              <Button variant="outline" onClick={() => { setSearch(''); setSelectedCategory('all'); }}>
                Limpar Filtros
              </Button>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

export default StylesPage;
