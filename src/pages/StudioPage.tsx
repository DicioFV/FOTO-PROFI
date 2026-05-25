// src/pages/StudioPage.tsx
// CINEVISION AI — PLATFORM STUDIO PAGE

import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ArrowRight, Check, Lightbulb, Image, Maximize2 } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, Tabs, TabContent } from '../components/ui';
import { getStudioById, getAllStudios } from '../data/studios';
import { getStyleById } from '../data/styles';
import { cn } from '../lib/utils';
import type { StudioPreset } from '../data/studios';

function StudioSelector() {
  const allStudios = getAllStudios();
  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="gold" className="mb-4"><Sparkles className="w-4 h-4 mr-1" />Estúdios Especializados</Badge>
            <h1 className="text-4xl font-bold text-white mb-4">Escolha Sua Plataforma</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Cada estúdio é otimizado com as dimensões, estilos e dicas perfeitas para sua plataforma favorita.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStudios.map((studio, i) => (
              <motion.div key={studio.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/studio/${studio.id}`}>
                  <Card hover className="group p-0 overflow-hidden cursor-pointer border-transparent hover:border-amber-500/30">
                    <div className={cn('h-36 bg-gradient-to-br flex items-center justify-center relative', studio.gradient)}>
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{studio.emoji}</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{studio.name}</h3>
                      <p className="text-sm text-amber-400 mb-2">{studio.tagline}</p>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{studio.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {studio.features.slice(0, 3).map(f => (
                          <Badge key={f} variant="default" size="sm">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudioPage() {
  const { platform } = useParams<{ platform: string }>();
  const studio = platform ? getStudioById(platform) : null;

  const [selectedPreset, setSelectedPreset] = useState<StudioPreset | null>(null);
  const [activeTab, setActiveTab] = useState('presets');

  // If no platform, show selector
  if (!studio) return <StudioSelector />;

  // Set default preset
  if (!selectedPreset && studio.presets.length > 0) {
    setSelectedPreset(studio.presets[0]);
  }

  const recommendedStyleItems = useMemo(() =>
    studio.recommendedStyles.map(id => getStyleById(id)).filter(Boolean),
    [studio]
  );

  const tabs = [
    { value: 'presets', label: '📐 Formatos' },
    { value: 'styles', label: '🎨 Estilos' },
    { value: 'tips', label: '💡 Dicas' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/studio">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Estúdios</Button>
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-3 flex-1">
              <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl', studio.gradient)}>
                {studio.emoji}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Estúdio {studio.name}</h1>
                <p className="text-sm text-gray-500">{studio.tagline}</p>
              </div>
            </div>
            <Link to="/upload">
              <Button variant="gold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Criar Agora
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Preview */}
            <div className="lg:col-span-2">
              {/* Banner */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className={cn('overflow-hidden p-0 mb-6')}>
                  <div className={cn('h-56 bg-gradient-to-br flex items-center justify-center relative', studio.gradient)}>
                    <div className="text-center relative z-10">
                      <span className="text-7xl block mb-4">{studio.emoji}</span>
                      <h2 className="text-3xl font-bold text-white mb-2">{studio.name} Studio</h2>
                      <p className="text-white/80">{studio.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                </Card>
              </motion.div>

              {/* Selected Preset Preview */}
              {selectedPreset && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card padding="lg" className="mb-6">
                    <CardHeader title="Preview do Formato" description={selectedPreset.description} />
                    <CardContent>
                      <div className="flex items-center justify-center p-8 bg-white/[0.02] rounded-xl border border-dashed border-white/10">
                        <div
                          className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg flex items-center justify-center relative"
                          style={{
                            width: Math.min(300, selectedPreset.width / (selectedPreset.width / 300)),
                            aspectRatio: `${selectedPreset.width} / ${selectedPreset.height}`,
                            maxHeight: 300,
                          }}
                        >
                          <div className="text-center">
                            <Image className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-white">{selectedPreset.name}</p>
                            <p className="text-xs text-gray-500">{selectedPreset.width}×{selectedPreset.height}</p>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="gold" size="sm">{selectedPreset.label}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <Maximize2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                          <p className="text-sm font-medium text-white">{selectedPreset.width}×{selectedPreset.height}</p>
                          <p className="text-xs text-gray-500">Resolução</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <p className="text-lg font-bold text-white">{selectedPreset.label}</p>
                          <p className="text-xs text-gray-500">Aspect Ratio</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-center">
                          <p className="text-lg font-bold text-amber-400">HD</p>
                          <p className="text-xs text-gray-500">Qualidade</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {studio.features.map((feature, i) => (
                  <motion.div key={feature} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                    <Card padding="md" className="text-center">
                      <Check className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-white">{feature}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Controls */}
            <div>
              <Card className="sticky top-24">
                <div className="p-4">
                  <Tabs tabs={tabs} value={activeTab} onValueChange={setActiveTab} variant="pills">
                    {/* Presets Tab */}
                    <TabContent value="presets">
                      <div className="space-y-2">
                        {studio.presets.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => setSelectedPreset(preset)}
                            className={cn(
                              'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                              selectedPreset?.id === preset.id
                                ? 'bg-amber-500/10 border border-amber-500/30'
                                : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
                            )}
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                              {preset.label}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white text-sm">{preset.name}</p>
                              <p className="text-xs text-gray-500">{preset.width}×{preset.height}</p>
                            </div>
                            {selectedPreset?.id === preset.id && (
                              <Check className="w-5 h-5 text-amber-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </TabContent>

                    {/* Styles Tab */}
                    <TabContent value="styles">
                      <p className="text-sm text-gray-400 mb-3">Estilos recomendados para {studio.name}</p>
                      <div className="space-y-2">
                        {recommendedStyleItems.map((style) => style && (
                          <Link key={style.id} to="/upload" className="block">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer">
                              <span className="text-2xl">{style.emoji}</span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{style.name}</p>
                                <p className="text-xs text-gray-500">{style.creditsCost} crédito{style.creditsCost > 1 ? 's' : ''}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-500" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </TabContent>

                    {/* Tips Tab */}
                    <TabContent value="tips">
                      <div className="space-y-3">
                        {studio.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-400">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </TabContent>
                  </Tabs>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link to="/upload">
                      <Button variant="gold" className="w-full" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                        Criar para {studio.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioPage;
