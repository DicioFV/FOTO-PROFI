// src/pages/EditorPage.tsx
// CINEVISION AI — EDITOR PAGE

import { useState } from 'react';
// framer-motion available if needed
import { ArrowLeft, Download, Share2, Sparkles, RotateCcw, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Tabs, TabContent, Slider, Select } from '../components/ui';
import { StyleCard, PromptInput, BeforeAfterSlider, ProcessingAnimation } from '../components/editor';
import { useEditorStore } from '../store';

const sampleStyles = [
  { id: '1', name: 'Hollywood Portrait', category: 'Cinematográfico', creditsCost: 1, isFeatured: true },
  { id: '2', name: 'Film Noir', category: 'Vintage', creditsCost: 1 },
  { id: '3', name: 'Cyberpunk Neon', category: 'Artístico', creditsCost: 2, isNew: true },
  { id: '4', name: 'LinkedIn Pro', category: 'Profissional', creditsCost: 1 },
  { id: '5', name: 'YouTube Thumbnail', category: 'Redes Sociais', creditsCost: 1, isFeatured: true },
  { id: '6', name: 'Pop Art', category: 'Artístico', creditsCost: 2 },
];

const resolutionOptions = [
  { value: '512', label: '512×512 (Rápido)' },
  { value: '1024', label: '1024×1024 (HD)' },
  { value: '2048', label: '2048×2048 (2K)' },
  { value: '4096', label: '4096×4096 (4K)', disabled: true },
];

const tabs = [
  { value: 'styles', label: 'Estilos' },
  { value: 'prompt', label: 'Prompt' },
  { value: 'settings', label: 'Ajustes' },
];

export function EditorPage() {
  const { inputImage, customPrompt, setCustomPrompt } = useEditorStore();
  const [selectedStyle, setSelectedStyle] = useState<string | null>('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [resolution, setResolution] = useState('1024');
  const [creativity, setCreativity] = useState([50]);
  const [faceStrength, setFaceStrength] = useState([75]);

  // Sample images for demo
  const beforeImage = inputImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500';
  const afterImage = generatedImage || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500';

  const handleGenerate = async () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // Simulate completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setGeneratedImage(afterImage);
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050507] pt-16">
      <ProcessingAnimation
        isProcessing={isProcessing}
        progress={progress}
        stage={progress < 30 ? 'analyzing' : progress < 70 ? 'generating' : 'enhancing'}
        estimatedTime={8}
      />

      <div className="pl-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/upload">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Editor de Imagem</h1>
                <p className="text-sm text-gray-500">Transforme sua foto com IA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="gold">
                <Sparkles className="w-3 h-3 mr-1" />
                1 crédito
              </Badge>
              {generatedImage && (
                <>
                  <Button variant="secondary" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button variant="primary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Preview */}
            <div className="space-y-4">
              <Card variant="glass" padding="lg">
                <BeforeAfterSlider
                  beforeImage={beforeImage}
                  afterImage={afterImage}
                  beforeLabel="Original"
                  afterLabel="Transformado"
                />
              </Card>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ZoomIn className="w-4 h-4 mr-1" />
                  Ampliar
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Resetar
                </Button>
              </div>
            </div>

            {/* Right: Controls */}
            <div>
              <Card variant="default" padding="lg">
                <Tabs tabs={tabs} value="styles" variant="pills">
                  {/* Styles Tab */}
                  <TabContent value="styles">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">Escolha um estilo para sua transformação</p>
                      <div className="grid grid-cols-3 gap-3">
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
                    <div className="space-y-6">
                      <Select
                        label="Resolução"
                        value={resolution}
                        onValueChange={setResolution}
                        options={resolutionOptions}
                      />

                      <Slider
                        label="Criatividade"
                        value={creativity}
                        onValueChange={setCreativity}
                        min={0}
                        max={100}
                        formatValue={(v) => `${v}%`}
                      />

                      <Slider
                        label="Preservação Facial"
                        value={faceStrength}
                        onValueChange={setFaceStrength}
                        min={0}
                        max={100}
                        formatValue={(v) => `${v}%`}
                      />
                    </div>
                  </TabContent>
                </Tabs>

                {/* Generate Button */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={handleGenerate}
                    isLoading={isProcessing}
                    leftIcon={<Sparkles className="w-5 h-5" />}
                  >
                    Gerar Transformação
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
