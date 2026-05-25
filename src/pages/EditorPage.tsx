// src/pages/EditorPage.tsx
// CINEVISION AI — FULL AI EDITOR PAGE

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { Button, Badge, Tabs, TabContent } from '../components/ui';
import {
  EditorCanvas,
  StyleCard,
  PromptInput,
  ParameterControls,
  ProcessingAnimation,
  ResultViewer,
  GenerationQueue,
} from '../components/editor';
import type { ViewMode, GenerationParams, QueueItem } from '../components/editor';
import { useEditorStore } from '../store';

// Sample data
const sampleStyles = [
  { id: '1', name: 'Hollywood Portrait', category: 'Cinematográfico', creditsCost: 1, isFeatured: true },
  { id: '2', name: 'Film Noir', category: 'Vintage', creditsCost: 1 },
  { id: '3', name: 'Cyberpunk Neon', category: 'Artístico', creditsCost: 2, isNew: true },
  { id: '4', name: 'LinkedIn Pro', category: 'Profissional', creditsCost: 1 },
  { id: '5', name: 'YouTube Thumbnail', category: 'Redes Sociais', creditsCost: 1, isFeatured: true },
  { id: '6', name: 'Pop Art', category: 'Artístico', creditsCost: 2 },
  { id: '7', name: 'Instagram Glow', category: 'Redes Sociais', creditsCost: 1 },
  { id: '8', name: 'Movie Poster', category: 'Cinematográfico', creditsCost: 2, isNew: true },
  { id: '9', name: 'Vintage Film', category: 'Vintage', creditsCost: 1 },
];

const sampleImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
];

const tabs = [
  { value: 'styles', label: '🎨 Estilos' },
  { value: 'prompt', label: '✍️ Prompt' },
  { value: 'settings', label: '⚙️ Ajustes' },
  { value: 'queue', label: '📋 Fila' },
];

export function EditorPage() {
  const { inputImage, customPrompt, setCustomPrompt } = useEditorStore();

  // State
  const [selectedStyle, setSelectedStyle] = useState<string>('1');
  const [activeTab, setActiveTab] = useState('styles');
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState(0);

  const [params, setParams] = useState<GenerationParams>({
    resolution: '1024',
    creativity: 50,
    faceStrength: 75,
    enhanceDetails: true,
    model: 'flux-pro',
    aspectRatio: '1:1',
  });

  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // Images
  const originalImage = inputImage || sampleImages[0];

  // Handle generation
  const handleGenerate = useCallback(async () => {
    const startTime = Date.now();
    setIsProcessing(true);
    setProgress(0);
    setResultImage(null);

    const styleName = sampleStyles.find(s => s.id === selectedStyle)?.name || 'Custom';

    // Add to queue
    const queueId = `q-${Date.now()}`;
    setQueueItems(prev => [
      { id: queueId, styleName, status: 'processing', progress: 0, createdAt: new Date() },
      ...prev,
    ]);

    // Simulate progressive generation
    const stages = [
      { pct: 15, delay: 400 },
      { pct: 35, delay: 1000 },
      { pct: 55, delay: 2000 },
      { pct: 75, delay: 3000 },
      { pct: 90, delay: 3800 },
      { pct: 100, delay: 4500 },
    ];

    for (const stage of stages) {
      await new Promise(r => setTimeout(r, stage.delay - (stages.indexOf(stage) > 0 ? stages[stages.indexOf(stage) - 1].delay : 0)));
      setProgress(stage.pct);
      setQueueItems(prev => prev.map(item =>
        item.id === queueId ? { ...item, progress: stage.pct } : item
      ));
    }

    // Pick a random result image
    const resultIdx = Math.floor(Math.random() * sampleImages.length);
    const result = sampleImages[resultIdx === 0 ? 1 : resultIdx];

    setResultImage(result);
    setProcessingTime(Date.now() - startTime);
    setViewMode('compare');

    // Update queue
    setQueueItems(prev => prev.map(item =>
      item.id === queueId ? { ...item, status: 'completed', progress: 100, imageUrl: result } : item
    ));

    setIsProcessing(false);
  }, [selectedStyle, inputImage]);

  // Handle regenerate
  const handleRegenerate = useCallback(() => {
    setResultImage(null);
    setViewMode('original');
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="min-h-screen bg-[#050507] pt-16">
      {/* Processing Overlay */}
      <ProcessingAnimation
        isProcessing={isProcessing}
        progress={progress}
        stage={progress < 20 ? 'uploading' : progress < 50 ? 'analyzing' : progress < 85 ? 'generating' : 'enhancing'}
        estimatedTime={5}
      />

      <div className="pl-64">
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Link to="/upload">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="text-lg font-semibold text-white">Editor de Imagem</h1>
              {selectedStyle && (
                <Badge variant="gold" size="sm">
                  {sampleStyles.find(s => s.id === selectedStyle)?.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="default" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                {sampleStyles.find(s => s.id === selectedStyle)?.creditsCost ?? 1} crédito
              </Badge>
              <Button
                variant="gold"
                size="sm"
                onClick={handleGenerate}
                disabled={isProcessing}
                isLoading={isProcessing}
                leftIcon={<Wand2 className="w-4 h-4" />}
              >
                {isProcessing ? 'Gerando...' : 'Gerar'}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left — Canvas Area */}
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              <EditorCanvas
                originalImage={originalImage}
                resultImage={resultImage}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                className="flex-1"
              />

              {/* Result Viewer — appears after generation */}
              <AnimatePresence>
                {resultImage && !isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <ResultViewer
                      imageUrl={resultImage}
                      styleName={sampleStyles.find(s => s.id === selectedStyle)?.name || 'Custom'}
                      processingTime={processingTime}
                      creditsUsed={sampleStyles.find(s => s.id === selectedStyle)?.creditsCost}
                      onRegenerate={handleRegenerate}
                      onDownload={(fmt) => console.log('Download', fmt)}
                      onShare={() => console.log('Share')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — Controls Panel */}
            <div className="w-[380px] border-l border-white/10 bg-[#0a0a0f] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4">
                <Tabs
                  tabs={tabs}
                  value={activeTab}
                  onValueChange={setActiveTab}
                  variant="pills"
                >
                  {/* Styles Tab */}
                  <TabContent value="styles">
                    <p className="text-sm text-gray-400 mb-4">Escolha um estilo para a transformação</p>
                    <div className="grid grid-cols-3 gap-2">
                      {sampleStyles.map((style) => (
                        <StyleCard
                          key={style.id}
                          style={style}
                          selected={selectedStyle === style.id}
                          onSelect={() => setSelectedStyle(style.id)}
                          size="sm"
                        />
                      ))}
                    </div>
                  </TabContent>

                  {/* Prompt Tab */}
                  <TabContent value="prompt">
                    <PromptInput
                      value={customPrompt}
                      onChange={setCustomPrompt}
                    />
                  </TabContent>

                  {/* Settings Tab */}
                  <TabContent value="settings">
                    <ParameterControls
                      params={params}
                      onChange={(updates) => setParams(prev => ({ ...prev, ...updates }))}
                    />
                  </TabContent>

                  {/* Queue Tab */}
                  <TabContent value="queue">
                    <GenerationQueue
                      items={queueItems}
                      onView={(id) => {
                        const item = queueItems.find(q => q.id === id);
                        if (item?.imageUrl) {
                          setResultImage(item.imageUrl);
                          setViewMode('result');
                        }
                      }}
                      onRetry={(id) => console.log('Retry', id)}
                    />
                    {queueItems.length === 0 && (
                      <div className="text-center py-12">
                        <Sparkles className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500">Nenhuma geração na fila</p>
                        <p className="text-sm text-gray-600 mt-1">Clique em "Gerar" para começar</p>
                      </div>
                    )}
                  </TabContent>
                </Tabs>
              </div>

              {/* Bottom Generate Button */}
              <div className="p-4 border-t border-white/10">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                  isLoading={isProcessing}
                  leftIcon={<Wand2 className="w-5 h-5" />}
                >
                  {isProcessing ? 'Gerando...' : 'Gerar Transformação'}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  ⚡ {params.model === 'flux-schnell' ? '~3s' : '~8s'} • {sampleStyles.find(s => s.id === selectedStyle)?.creditsCost ?? 1} crédito
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
