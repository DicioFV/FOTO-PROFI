// src/pages/StylesPage.tsx
// CINEVISION AI — STYLES CATALOG PAGE

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Grid, List } from 'lucide-react';
import { Input, Button, Badge, Card } from '../components/ui';
import { StyleCard } from '../components/editor';
import { cn } from '../lib/utils';

const categories = [
  { value: 'all', label: 'Todos', count: 500 },
  { value: 'cinematic', label: 'Cinematográfico', count: 120 },
  { value: 'social', label: 'Redes Sociais', count: 85 },
  { value: 'portrait', label: 'Retratos', count: 95 },
  { value: 'artistic', label: 'Artístico', count: 75 },
  { value: 'commercial', label: 'Comercial', count: 60 },
  { value: 'vintage', label: 'Vintage', count: 45 },
  { value: 'fantasy', label: 'Fantasia', count: 20 },
];

const allStyles = [
  { id: '1', name: 'Hollywood Portrait', category: 'Cinematográfico', creditsCost: 1, isFeatured: true },
  { id: '2', name: 'Film Noir', category: 'Vintage', creditsCost: 1 },
  { id: '3', name: 'Cyberpunk Neon', category: 'Artístico', creditsCost: 2, isNew: true },
  { id: '4', name: 'LinkedIn Pro', category: 'Profissional', creditsCost: 1 },
  { id: '5', name: 'YouTube Thumbnail', category: 'Redes Sociais', creditsCost: 1, isFeatured: true },
  { id: '6', name: 'Pop Art', category: 'Artístico', creditsCost: 2 },
  { id: '7', name: 'Instagram Glow', category: 'Redes Sociais', creditsCost: 1, isNew: true },
  { id: '8', name: 'Movie Poster', category: 'Cinematográfico', creditsCost: 2 },
  { id: '9', name: 'Vintage Film', category: 'Vintage', creditsCost: 1 },
  { id: '10', name: 'Corporate Headshot', category: 'Profissional', creditsCost: 1 },
  { id: '11', name: 'Anime Style', category: 'Artístico', creditsCost: 2 },
  { id: '12', name: 'Renaissance', category: 'Artístico', creditsCost: 2 },
];

export function StylesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredStyles = allStyles.filter((style) => {
    const matchesSearch = style.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      style.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredStyles = allStyles.filter((s) => s.isFeatured);
  const newStyles = allStyles.filter((s) => s.isNew);

  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" className="mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            500+ Estilos Disponíveis
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            Catálogo de Estilos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore nossa coleção de estilos cinematográficos, artísticos e profissionais.
            Cada estilo foi cuidadosamente calibrado para resultados impressionantes.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar estilos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <div className="flex items-center border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === category.value
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              )}
            >
              {category.label}
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded-full',
                selectedCategory === category.value
                  ? 'bg-black/20 text-black'
                  : 'bg-white/10 text-gray-500'
              )}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {selectedCategory === 'all' && !search && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Estilos em Destaque
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredStyles.map((style) => (
                <StyleCard key={style.id} style={style} />
              ))}
            </div>
          </section>
        )}

        {/* New Styles */}
        {selectedCategory === 'all' && !search && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              🆕 Novidades
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {newStyles.map((style) => (
                <StyleCard key={style.id} style={style} />
              ))}
            </div>
          </section>
        )}

        {/* All Styles */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">
            {selectedCategory === 'all' ? 'Todos os Estilos' : `Estilos: ${categories.find(c => c.value === selectedCategory)?.label}`}
          </h2>
          {filteredStyles.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredStyles.map((style) => (
                <StyleCard key={style.id} style={style} />
              ))}
            </div>
          ) : (
            <Card variant="glass" padding="lg" className="text-center">
              <p className="text-gray-400">Nenhum estilo encontrado para "{search}"</p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

export default StylesPage;
