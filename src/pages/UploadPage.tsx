// src/pages/UploadPage.tsx
// CINEVISION AI — UPLOAD PAGE (Full Rebuild)

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb } from 'lucide-react';
import { Badge, Card } from '../components/ui';
import { DropZone, CameraCapture, ImageAnalysis, ImagePreview } from '../components/upload';
import { useEditorStore } from '../store';

const tips = [
  { emoji: '💡', title: 'Boa Iluminação', desc: 'Luz natural frontal produz os melhores resultados' },
  { emoji: '👤', title: 'Rosto Visível', desc: 'Sem óculos escuros, chapéu ou obstruções no rosto' },
  { emoji: '📐', title: 'Alta Resolução', desc: 'Imagens de 1024px+ geram resultados mais detalhados' },
  { emoji: '🎯', title: 'Enquadramento', desc: 'Centralize o rosto e mantenha um fundo simples' },
];

export function UploadPage() {
  const navigate = useNavigate();
  const { setInputImage } = useEditorStore();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);

  // Listen for camera open event from DropZone
  useEffect(() => {
    const handler = () => setCameraOpen(true);
    window.addEventListener('cinevision:open-camera', handler);
    return () => window.removeEventListener('cinevision:open-camera', handler);
  }, []);

  const handleFileAccepted = useCallback((acceptedFile: File, previewUrl: string) => {
    setFile(acceptedFile);
    setPreview(previewUrl);
    setInputImage(previewUrl, acceptedFile);
    setAnalysisReady(false);
  }, [setInputImage]);

  const handleCameraCapture = useCallback((capturedFile: File, previewUrl: string) => {
    setFile(capturedFile);
    setPreview(previewUrl);
    setInputImage(previewUrl, capturedFile);
    setCameraOpen(false);
    setAnalysisReady(false);
  }, [setInputImage]);

  const handleRemoveImage = useCallback(() => {
    setFile(null);
    setPreview(null);
    setInputImage(null, null);
    setAnalysisReady(false);
  }, [setInputImage]);

  const handleContinue = useCallback(() => {
    navigate('/editor');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      {/* Camera Modal */}
      <CameraCapture
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div className="pl-64">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="gold" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Passo 1 de 3
            </Badge>
            <h1 className="text-3xl font-bold text-white mb-2">
              Envie Sua Foto
            </h1>
            <p className="text-gray-400">
              Faça upload, tire uma selfie ou arraste uma imagem para começar
            </p>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DropZone onFileAccepted={handleFileAccepted} />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-5 gap-6"
              >
                {/* Image Preview - 3 cols */}
                <div className="lg:col-span-3">
                  <ImagePreview
                    imageUrl={preview}
                    fileName={file?.name}
                    fileSize={file?.size}
                    onRemove={handleRemoveImage}
                    onContinue={handleContinue}
                    isReady={analysisReady}
                  />
                </div>

                {/* Analysis - 2 cols */}
                <div className="lg:col-span-2">
                  {file && (
                    <ImageAnalysis
                      imageUrl={preview}
                      file={file}
                      onAnalysisComplete={() => setAnalysisReady(true)}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Dicas para Melhores Resultados
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tips.map((tip) => (
                <Card key={tip.title} variant="default" padding="md" hover>
                  <span className="text-3xl mb-3 block">{tip.emoji}</span>
                  <p className="font-medium text-white mb-1">{tip.title}</p>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
